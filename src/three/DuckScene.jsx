import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

// Height of the water at (x, z) and time t. Shared by the surface and the duck so it rides the waves.
function waveHeight(x, z, t) {
  return (
    Math.sin(x * 0.55 + t * 0.9) * 0.08 +
    Math.sin(z * 0.8 - t * 1.2) * 0.06 +
    Math.sin((x + z) * 1.4 + t * 1.7) * 0.025
  )
}

function Water() {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(36, 22, 120, 80)
    g.rotateX(-Math.PI / 2)
    return g
  }, [])
  const base = useMemo(() => Float32Array.from(geo.attributes.position.array), [geo])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const pos = geo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = base[i * 3]
      const z = base[i * 3 + 2]
      pos.array[i * 3 + 1] = waveHeight(x, z, t)
    }
    pos.needsUpdate = true
    geo.computeVertexNormals()
  })

  return (
    <mesh geometry={geo} position={[0, -0.02, -4]} receiveShadow>
      <meshPhysicalMaterial color="#0b1748" roughness={0.42} metalness={0.2} clearcoat={0.6} clearcoatRoughness={0.4} />
    </mesh>
  )
}

function Ripples({ origin }) {
  const rings = useRef([])
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    rings.current.forEach((m, i) => {
      if (!m) return
      const p = ((t * 0.35 + i / 3) % 1)
      const s = 0.9 + p * 3.2
      m.scale.set(s, s, s)
      m.material.opacity = (1 - p) * 0.35
      m.position.x = origin.current.x
      m.position.z = origin.current.z
    })
  })
  return [0, 1, 2].map((i) => (
    <mesh key={i} ref={(el) => (rings.current[i] = el)} rotation-x={-Math.PI / 2} position-y={0.06}>
      <ringGeometry args={[0.98, 1, 96]} />
      <meshBasicMaterial color="#ffb715" transparent depthWrite={false} />
    </mesh>
  ))
}

function Duck({ pointer, anchor }) {
  const root = useRef()
  const head = useRef()
  const intro = useRef(0)

  const yellow = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: '#ffb715', roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.12, sheen: 0.4, sheenColor: '#fff2b8' }),
    [],
  )
  const orange = useMemo(() => new THREE.MeshPhysicalMaterial({ color: '#ff751f', roughness: 0.3, clearcoat: 1 }), [])
  const black = useMemo(() => new THREE.MeshPhysicalMaterial({ color: '#0b0a09', roughness: 0.05, clearcoat: 1 }), [])

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime
    intro.current = Math.min(1, intro.current + dt * 0.7)
    // ease-out-back drop for the entrance
    const k = intro.current
    const c = 1.7
    const e = 1 + (c + 1) * Math.pow(k - 1, 3) + c * Math.pow(k - 1, 2)

    const { x, z } = anchor.current
    // the water mesh sits at z = -4, so sample it in its local space
    const lz = z + 4
    const y = waveHeight(x, lz, t)
    root.current.position.set(x, y + (1 - e) * 3.2, z)
    root.current.scale.setScalar((0.4 + e * 0.6) * 0.82)

    const slopeX = waveHeight(x + 0.3, lz, t) - waveHeight(x - 0.3, lz, t)
    const slopeZ = waveHeight(x, lz + 0.3, t) - waveHeight(x, lz - 0.3, t)
    root.current.rotation.z = THREE.MathUtils.lerp(root.current.rotation.z, slopeX * 1.6, 0.1)
    root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, -slopeZ * 1.6, 0.1)
    const targetYaw = -0.75 + pointer.current.x * 0.5 + (1 - e) * 2.5
    root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, targetYaw, 0.06)

    head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, pointer.current.x * 0.45, 0.08)
    head.current.rotation.z = THREE.MathUtils.lerp(head.current.rotation.z, pointer.current.y * 0.3 + Math.sin(t * 1.3) * 0.04, 0.08)
  })

  return (
    <group ref={root}>
      {/* body */}
      <mesh material={yellow} scale={[1.25, 0.82, 0.98]} position={[0, 0.42, 0]} castShadow>
        <sphereGeometry args={[0.72, 64, 64]} />
      </mesh>
      {/* tail */}
      <mesh material={yellow} position={[-0.88, 0.72, 0]} rotation={[0, 0, 0.95]} scale={[0.6, 1, 0.75]}>
        <coneGeometry args={[0.3, 0.6, 48]} />
      </mesh>
      {/* wings */}
      {[1, -1].map((s) => (
        <mesh key={s} material={yellow} position={[-0.1, 0.52, s * 0.66]} rotation={[s * 0.25, 0, -0.25]} scale={[0.62, 0.32, 0.14]}>
          <sphereGeometry args={[0.7, 48, 48]} />
        </mesh>
      ))}
      <group ref={head} position={[0.52, 1.02, 0]}>
        <mesh material={yellow} castShadow>
          <sphereGeometry args={[0.46, 64, 64]} />
        </mesh>
        {/* tuft */}
        <mesh material={yellow} position={[-0.05, 0.46, 0]} rotation={[0, 0, -0.5]} scale={[0.5, 1, 0.5]}>
          <coneGeometry args={[0.09, 0.26, 24]} />
        </mesh>
        {/* beak */}
        <mesh material={orange} position={[0.42, -0.06, 0]} scale={[1.25, 0.32, 0.9]}>
          <sphereGeometry args={[0.24, 48, 48]} />
        </mesh>
        <mesh material={orange} position={[0.36, -0.14, 0]} scale={[1.05, 0.22, 0.75]}>
          <sphereGeometry args={[0.22, 48, 48]} />
        </mesh>
        {/* eyes */}
        {[1, -1].map((s) => (
          <group key={s} position={[0.27, 0.13, s * 0.3]}>
            <mesh material={black}>
              <sphereGeometry args={[0.075, 32, 32]} />
            </mesh>
            <mesh position={[0.045, 0.03, s * 0.03]}>
              <sphereGeometry args={[0.022, 16, 16]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  )
}

function Rig({ pointer, anchor }) {
  const { camera, size } = useThree()
  const narrow = size.width < 820

  useEffect(() => {
    anchor.current.x = narrow ? 0 : 2.75
    anchor.current.z = 0
  }, [narrow, anchor])

  useFrame(() => {
    const tx = pointer.current.x * 0.35
    const ty = 1.55 + pointer.current.y * 0.15
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, tx, 0.04)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, ty, 0.04)
    camera.lookAt(narrow ? 0 : 0.6, 0.55, 0)
  })
  return null
}

export default function DuckScene() {
  const pointer = useRef({ x: 0, y: 0 })
  const anchor = useRef({ x: 2.75, z: 0 })
  const wrap = useRef()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove)
    const io = new IntersectionObserver(([en]) => setVisible(en.isIntersecting))
    io.observe(wrap.current)
    return () => {
      window.removeEventListener('pointermove', onMove)
      io.disconnect()
    }
  }, [])

  return (
    <div ref={wrap} className="duck-canvas" aria-hidden="true">
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={[1, 1.75]}
        shadows
        camera={{ position: [0, 1.55, 7.2], fov: 32 }}
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={['#0a1440', 7, 17]} />
        <ambientLight intensity={0.25} />
        <directionalLight position={[3, 6, 4]} intensity={2.8} castShadow shadow-mapSize={[1024, 1024]} />
        <pointLight position={[-4, 2, 2]} intensity={14} color="#ff751f" />
        <Water />
        <Ripples origin={anchor} />
        <Duck pointer={pointer} anchor={anchor} />
        <ContactShadows position={[0, 0.01, 0]} opacity={0.5} scale={8} blur={2.5} far={2} />
        <Environment resolution={256}>
          <Lightformer intensity={1.6} position={[0, 5, -6]} scale={[12, 4, 1]} form="rect" />
          <Lightformer intensity={2} position={[-6, 2, 0]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} color="#ffd27a" />
          <Lightformer intensity={1.5} position={[6, 1, 2]} rotation-y={-Math.PI / 2} scale={[6, 2, 1]} color="#4d8fe0" />
          <Lightformer intensity={4} position={[0, 6, 2]} rotation-x={Math.PI / 2} scale={[3, 3, 1]} form="ring" />
        </Environment>
        <Rig pointer={pointer} anchor={anchor} />
      </Canvas>
    </div>
  )
}
