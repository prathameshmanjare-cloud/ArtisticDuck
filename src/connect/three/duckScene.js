// WebGL scene for the /connect intro. Loaded lazily (dynamic import) so three.js never blocks first paint.
//
// About the "3D" logo: there is no modelled GLB of the duck. Instead the ORIGINAL logo artwork is used
// as a texture on a stack of alpha-masked layers, which gives the flat mark real extruded thickness
// (visible as a lit edge when it turns). It is a dimensional treatment of the 2D logo, not a 3D model.

import {
  AdditiveBlending,
  AmbientLight,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  DirectionalLight,
  DoubleSide,
  Group,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Points,
  PointsMaterial,
  Scene,
  SRGBColorSpace,
  TextureLoader,
  TorusGeometry,
  WebGLRenderer,
} from 'three'

const LAYERS = 16
const DEPTH = 0.22
const ease = (t) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3)

export function supportsWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')))
  } catch {
    return false
  }
}

/**
 * @param {HTMLCanvasElement} canvas
 * @param {{logoSrc:string, aspect:number, reduced:boolean, onReady?:()=>void}} opts
 */
export function createDuckScene(canvas, { logoSrc, aspect, reduced, onReady }) {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
  renderer.outputColorSpace = SRGBColorSpace

  const scene = new Scene()
  const camera = new PerspectiveCamera(35, 1, 0.1, 100)
  camera.position.set(0, 0, 9)

  // cinematic lighting: cool key, orange and teal rims
  scene.add(new AmbientLight(0xffffff, 1.15))
  const key = new DirectionalLight(0xffffff, 1.1)
  key.position.set(-2, 3, 6)
  scene.add(key)
  const orange = new PointLight(0xff741e, 18, 14)
  orange.position.set(3.5, 1.5, 2)
  scene.add(orange)
  const teal = new PointLight(0x16b6a3, 18, 14)
  teal.position.set(-3.5, -1.5, 2)
  scene.add(teal)

  // logo: stack of alpha-tested layers, darker toward the back to read as a solid edge
  const logo = new Group()
  const w = 3.4
  const h = w / aspect
  const geo = new PlaneGeometry(w, h)
  const tex = new TextureLoader().load(logoSrc, () => {
    ready = true
    onReady?.()
  })
  tex.colorSpace = SRGBColorSpace
  tex.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy())
  const materials = []
  for (let i = 0; i < LAYERS; i++) {
    const front = i === 0
    const shade = front ? 1 : MathUtils.lerp(0.55, 0.18, i / (LAYERS - 1))
    const m = new MeshStandardMaterial({
      map: tex,
      alphaTest: 0.5,
      transparent: true,
      side: DoubleSide,
      roughness: front ? 0.42 : 0.7,
      metalness: front ? 0.08 : 0.25,
      color: new Color(shade, shade, shade * 1.08),
    })
    materials.push(m)
    const mesh = new Mesh(geo, m)
    mesh.position.z = -(i / (LAYERS - 1)) * DEPTH
    logo.add(mesh)
  }
  const pivot = new Group()
  pivot.add(logo)
  logo.position.z = DEPTH / 2
  scene.add(pivot)

  // soft glow behind the mark (radial gradient texture)
  const gc = document.createElement('canvas')
  gc.width = gc.height = 128
  const g2 = gc.getContext('2d')
  const grad = g2.createRadialGradient(64, 64, 0, 64, 64, 64)
  grad.addColorStop(0, 'rgba(70,140,230,1)')
  grad.addColorStop(0.45, 'rgba(20,87,166,0.45)')
  grad.addColorStop(1, 'rgba(20,87,166,0)')
  g2.fillStyle = grad
  g2.fillRect(0, 0, 128, 128)
  const glowTex = new CanvasTexture(gc)
  const glowMat = new MeshBasicMaterial({ map: glowTex, transparent: true, opacity: 0, blending: AdditiveBlending, depthWrite: false })
  const glow = new Mesh(new PlaneGeometry(7, 7), glowMat)
  glow.position.z = -1.2
  scene.add(glow)

  // light trails: thin orbit rings
  const trails = new Group()
  const ringMats = []
  ;[
    [2.6, 0xff741e, 1.15, 0.25],
    [2.95, 0x16b6a3, 1.35, -0.45],
    [3.3, 0x1457a6, 1.05, 0.9],
  ].forEach(([r, color, tilt, spin]) => {
    const m = new MeshBasicMaterial({ color, transparent: true, opacity: 0, blending: AdditiveBlending, depthWrite: false })
    ringMats.push(m)
    const ring = new Mesh(new TorusGeometry(r, 0.008, 6, 160), m)
    ring.rotation.x = tilt
    ring.rotation.y = spin
    trails.add(ring)
  })
  scene.add(trails)

  // particles
  const COUNT = window.innerWidth < 640 ? 160 : 280
  const pos = new Float32Array(COUNT * 3)
  const col = new Float32Array(COUNT * 3)
  const palette = [new Color(0xff741e), new Color(0x16b6a3), new Color(0x4f9bff), new Color(0xf7f5f0)]
  for (let i = 0; i < COUNT; i++) {
    const r = 3 + Math.random() * 6
    const th = Math.random() * Math.PI * 2
    const ph = Math.acos(2 * Math.random() - 1)
    pos[i * 3] = r * Math.sin(ph) * Math.cos(th)
    pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.7
    pos[i * 3 + 2] = r * Math.cos(ph) - 2
    const c = palette[i % palette.length]
    col.set([c.r, c.g, c.b], i * 3)
  }
  const pGeo = new BufferGeometry()
  pGeo.setAttribute('position', new BufferAttribute(pos, 3))
  pGeo.setAttribute('color', new BufferAttribute(col, 3))
  const pMat = new PointsMaterial({ size: 0.045, vertexColors: true, transparent: true, opacity: 0, blending: AdditiveBlending, depthWrite: false })
  const particles = new Points(pGeo, pMat)
  scene.add(particles)

  // state
  let ready = false
  let running = false
  let raf = 0
  let t0 = null
  let skipped = reduced
  let layout = { x: 0, y: 0, s: 1 } // target placement set by the page (intro centre vs. hero side)
  const cur = { x: 0, y: 0, s: 1 }
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 }

  function resize() {
    const { clientWidth: cw, clientHeight: ch } = canvas
    if (!cw || !ch) return
    renderer.setSize(cw, ch, false)
    camera.aspect = cw / ch
    // keep the logo a sensible size on tall phone screens
    camera.position.z = camera.aspect < 0.8 ? (9 / Math.max(camera.aspect, 0.48)) * 0.62 : 9
    camera.updateProjectionMatrix()
    if (!running) frame(performance.now())
  }

  function frame(now) {
    const t = t0 === null ? 0 : (now - t0) / 1000

    // emerge: from deep behind toward camera, turning to face it
    const p = skipped ? 1 : ease((t - 0.35) / 1.9)
    const fade = skipped ? 1 : ease(t / 0.9)
    const idle = reduced ? 0 : t

    cur.x += (layout.x - cur.x) * 0.06
    cur.y += (layout.y - cur.y) * 0.06
    cur.s += (layout.s - cur.s) * 0.06
    pointer.x += (pointer.tx - pointer.x) * 0.05
    pointer.y += (pointer.ty - pointer.y) * 0.05

    pivot.position.set(cur.x, cur.y + Math.sin(idle * 0.9) * 0.06, MathUtils.lerp(-9, 0, p))
    pivot.scale.setScalar(cur.s * MathUtils.lerp(0.6, 1, p))
    pivot.rotation.y = MathUtils.lerp(-1.25, 0, p) + Math.sin(idle * 0.45) * 0.22 + pointer.x * 0.35
    pivot.rotation.x = MathUtils.lerp(0.35, 0, p) + pointer.y * -0.2
    materials.forEach((m) => (m.opacity = p > 0 ? Math.min(1, p * 2.2) : 0))

    glow.position.x = cur.x
    glow.position.y = cur.y
    glowMat.opacity = 0.55 * p
    trails.position.set(cur.x, cur.y, 0)
    trails.scale.setScalar(cur.s)
    trails.rotation.z = idle * 0.08
    ringMats.forEach((m, i) => (m.opacity = 0.55 * (skipped ? 1 : ease((t - 0.9 - i * 0.2) / 1.2))))

    particles.rotation.y = idle * 0.025
    pMat.opacity = 0.85 * fade

    orange.position.x = 3.5 * Math.cos(idle * 0.3)
    teal.position.x = -3.5 * Math.cos(idle * 0.3)

    // subtle camera drift
    camera.position.x = Math.sin(idle * 0.15) * 0.25 + pointer.x * 0.3
    camera.position.y = Math.cos(idle * 0.12) * 0.15 + pointer.y * 0.2
    camera.lookAt(0, 0, 0)

    renderer.render(scene, camera)
  }

  function loop(now) {
    if (t0 === null) t0 = now
    frame(now)
    raf = requestAnimationFrame(loop)
  }

  function play() {
    if (running || reduced) return
    running = true
    raf = requestAnimationFrame(loop)
  }
  function pause() {
    running = false
    cancelAnimationFrame(raf)
  }

  const onPointer = (e) => {
    pointer.tx = (e.clientX / window.innerWidth) * 2 - 1
    pointer.ty = (e.clientY / window.innerHeight) * 2 - 1
  }
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  if (fine && !reduced) window.addEventListener('pointermove', onPointer, { passive: true })

  const ro = new ResizeObserver(resize)
  ro.observe(canvas)
  resize()

  return {
    get ready() {
      return ready
    },
    play,
    pause,
    /** jump straight to the settled pose (skip intro / reduced motion) */
    skip() {
      skipped = true
      if (!running) frame(performance.now())
    },
    setLayout(next) {
      layout = { ...layout, ...next }
      if (reduced || !running) {
        Object.assign(cur, layout)
        frame(performance.now())
      }
    },
    dispose() {
      pause()
      ro.disconnect()
      window.removeEventListener('pointermove', onPointer)
      scene.traverse((o) => {
        o.geometry?.dispose?.()
        const mats = Array.isArray(o.material) ? o.material : o.material ? [o.material] : []
        mats.forEach((m) => m.dispose())
      })
      tex.dispose()
      glowTex.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
    },
  }
}
