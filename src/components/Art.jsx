import { useId } from 'react'

// Illustrative scenes used in place of stock photography. Each scene has three layers
// (.art-a back, .art-b middle, .art-c front) that move at different speeds on hover.

const C = { navy: '#0B1D4D', panel: '#13306f', blue: '#145BDB', cyan: '#36C8E8', yellow: '#FFC107', cream: '#FFF8E6', white: '#FFFFFF' }

function Window({ x, y, w, h, g, children }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="12" fill={`url(#${g}-glass)`} stroke="rgba(255,255,255,.22)" />
      <circle cx={x + 14} cy={y + 13} r="3" fill={C.yellow} />
      <circle cx={x + 25} cy={y + 13} r="3" fill={C.cyan} opacity=".8" />
      <circle cx={x + 36} cy={y + 13} r="3" fill="#fff" opacity=".5" />
      {children}
    </g>
  )
}

const scenes = {
  brand: (g) => (
    <>
      <g className="art-a">
        <rect x="70" y="60" width="170" height="200" rx="16" fill={`url(#${g}-glass)`} stroke="rgba(255,255,255,.2)" transform="rotate(-8 155 160)" />
      </g>
      <g className="art-b">
        <rect x="140" y="50" width="180" height="210" rx="16" fill={C.cream} />
        <text x="160" y="140" fontFamily="Montserrat, sans-serif" fontWeight="800" fontSize="64" fill={C.navy}>Aa</text>
        <rect x="160" y="160" width="110" height="6" rx="3" fill={C.navy} opacity=".2" />
        <rect x="160" y="174" width="80" height="6" rx="3" fill={C.navy} opacity=".2" />
        <circle cx="172" cy="224" r="14" fill={C.navy} />
        <circle cx="206" cy="224" r="14" fill={C.blue} />
        <circle cx="240" cy="224" r="14" fill={C.cyan} />
        <circle cx="274" cy="224" r="14" fill={C.yellow} />
      </g>
      <g className="art-c">
        <path d="M300 70 l40 -30 l14 14 l-30 40 z" fill={C.yellow} />
        <path d="M300 70 l24 24 l-34 12 z" fill={C.white} />
        <circle cx="96" cy="230" r="22" fill={`url(#${g}-sphere)`} />
      </g>
    </>
  ),
  ads: (g) => (
    <>
      <g className="art-a">
        <rect x="200" y="40" width="160" height="110" rx="12" fill={`url(#${g}-glass)`} stroke="rgba(255,255,255,.2)" />
        <rect x="216" y="58" width="90" height="10" rx="5" fill={C.yellow} />
        <rect x="216" y="78" width="120" height="6" rx="3" fill="#fff" opacity=".4" />
        <rect x="216" y="92" width="100" height="6" rx="3" fill="#fff" opacity=".4" />
        <rect x="276" y="150" width="8" height="70" fill="#fff" opacity=".25" />
      </g>
      <g className="art-b">
        <path d="M70 170 L180 120 L180 250 L70 200 Z" fill={C.yellow} />
        <rect x="46" y="165" width="34" height="40" rx="8" fill="#e8a600" />
        <path d="M180 120 q40 65 0 130" fill="#ffd451" />
        <rect x="90" y="200" width="18" height="50" rx="6" fill={C.navy} stroke="rgba(255,255,255,.3)" />
      </g>
      <g className="art-c" stroke={C.cyan} strokeWidth="5" fill="none" strokeLinecap="round">
        <path d="M215 150 q18 35 0 70" />
        <path d="M240 135 q30 50 0 100" opacity=".7" />
        <path d="M265 120 q42 65 0 130" opacity=".4" />
      </g>
    </>
  ),
  growth: (g) => (
    <>
      <g className="art-a">
        <Window x={50} y={50} w={300} h={200} g={g}>
          <path d="M70 230 H330 M70 70 V230" stroke="rgba(255,255,255,.18)" />
        </Window>
      </g>
      <g className="art-b">
        {[50, 80, 70, 115, 140, 170].map((h, i) => (
          <rect key={i} x={90 + i * 38} y={230 - h} width="24" height={h} rx="5" fill={i === 5 ? C.yellow : i % 2 ? C.cyan : C.blue} opacity={i === 5 ? 1 : 0.85} />
        ))}
      </g>
      <g className="art-c">
        <path d="M80 200 L150 160 L200 175 L260 110 L320 70" stroke={C.yellow} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M300 64 L328 62 L322 90" stroke={C.yellow} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="236" y="190" width="120" height="44" rx="22" fill={C.cream} />
        <text x="256" y="218" fontFamily="Montserrat, sans-serif" fontWeight="700" fontSize="15" fill={C.navy}>Leads ↑</text>
      </g>
    </>
  ),
  tech: (g) => (
    <>
      <g className="art-a">
        <Window x={40} y={44} w={260} h={180} g={g}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={60 + (i % 3) * 14} y={78 + i * 22} width={[120, 90, 150, 70, 110, 60][i]} height="8" rx="4" fill={[C.cyan, '#fff', C.yellow, '#fff', C.cyan, '#fff'][i]} opacity={i % 2 ? 0.35 : 0.9} />
          ))}
        </Window>
      </g>
      <g className="art-b">
        <rect x="250" y="110" width="96" height="160" rx="18" fill={C.navy} stroke="rgba(255,255,255,.35)" strokeWidth="2" />
        <rect x="260" y="124" width="76" height="80" rx="8" fill={C.blue} />
        <rect x="260" y="212" width="76" height="12" rx="6" fill={C.yellow} />
        <rect x="260" y="232" width="50" height="8" rx="4" fill="#fff" opacity=".4" />
      </g>
      <g className="art-c">
        <text x="112" y="268" fontFamily="Montserrat, sans-serif" fontWeight="800" fontSize="44" fill={C.yellow}>&lt;/&gt;</text>
        <circle cx="340" cy="70" r="18" fill={`url(#${g}-sphere)`} />
      </g>
    </>
  ),
  saas: (g) => (
    <>
      <g className="art-a">
        <Window x={36} y={40} w={300} h={210} g={g}>
          <rect x="48" y="34" width="56" height="200" rx="6" fill="rgba(255,255,255,.08)" transform="translate(0 0)" />
          {[0, 1, 2, 3].map((i) => <rect key={i} x="56" y={52 + i * 24} width="40" height="8" rx="4" fill="#fff" opacity={i === 0 ? 0.9 : 0.3} />)}
        </Window>
      </g>
      <g className="art-b">
        <rect x="118" y="66" width="98" height="64" rx="10" fill={C.cream} />
        <rect x="128" y="78" width="40" height="8" rx="4" fill={C.navy} opacity=".4" />
        <text x="128" y="114" fontFamily="Montserrat, sans-serif" fontWeight="800" fontSize="22" fill={C.navy}>98%</text>
        <rect x="224" y="66" width="98" height="64" rx="10" fill={C.blue} />
        <path d="M234 116 l18 -14 l14 8 l20 -22 l20 8" stroke={C.cyan} strokeWidth="3" fill="none" />
        <rect x="118" y="140" width="204" height="96" rx="10" fill="rgba(255,255,255,.08)" />
        <path d="M130 220 C 170 160, 200 210, 240 170 S 300 150, 312 160" stroke={C.yellow} strokeWidth="4" fill="none" />
      </g>
      <g className="art-c">
        <rect x="270" y="196" width="104" height="68" rx="12" fill={C.yellow} />
        <circle cx="292" cy="230" r="10" fill={C.navy} />
        <rect x="310" y="218" width="50" height="8" rx="4" fill={C.navy} />
        <rect x="310" y="234" width="34" height="6" rx="3" fill={C.navy} opacity=".5" />
      </g>
    </>
  ),
  ai: (g) => {
    const nodes = [[80, 80], [80, 150], [80, 220], [320, 90], [320, 160], [320, 230], [150, 50], [250, 260]]
    return (
      <>
        <g className="art-a" stroke="rgba(54,200,232,.45)" strokeWidth="1.5">
          {nodes.map(([x, y], i) => <line key={i} x1={x} y1={y} x2="200" y2="155" />)}
          <circle cx="200" cy="155" r="110" fill="none" strokeDasharray="4 8" />
        </g>
        <g className="art-b">
          {nodes.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i % 3 ? 8 : 11} fill={i % 2 ? C.cyan : C.white} />)}
        </g>
        <g className="art-c">
          <rect x="150" y="105" width="100" height="100" rx="20" fill={`url(#${g}-chip)`} stroke={C.cyan} strokeWidth="2" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i} stroke={C.cyan} strokeWidth="3">
              <line x1={170 + i * 20} y1="93" x2={170 + i * 20} y2="105" />
              <line x1={170 + i * 20} y1="205" x2={170 + i * 20} y2="217" />
            </g>
          ))}
          <text x="200" y="166" textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight="800" fontSize="30" fill={C.white}>AI</text>
        </g>
      </>
    )
  },
  fintech: (g) => (
    <>
      <g className="art-a">
        <rect x="150" y="50" width="200" height="126" rx="16" fill={C.blue} transform="rotate(8 250 113)" />
      </g>
      <g className="art-b">
        <rect x="60" y="100" width="210" height="132" rx="16" fill={`url(#${g}-card)`} />
        <rect x="82" y="128" width="36" height="28" rx="6" fill={C.yellow} />
        <rect x="82" y="182" width="140" height="10" rx="5" fill="#fff" opacity=".7" />
        <rect x="82" y="202" width="70" height="8" rx="4" fill="#fff" opacity=".4" />
      </g>
      <g className="art-c">
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <ellipse cx="320" cy={250 - i * 14} rx="38" ry="12" fill="#d79e00" />
            <ellipse cx="320" cy={244 - i * 14} rx="38" ry="12" fill={C.yellow} />
          </g>
        ))}
        <path d="M300 160 L320 130 L340 160 M320 130 V196" stroke={C.cyan} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </>
  ),
  health: (g) => (
    <>
      <g className="art-a">
        <circle cx="200" cy="150" r="115" fill={`url(#${g}-glass)`} stroke="rgba(255,255,255,.18)" />
      </g>
      <g className="art-b">
        <path d="M200 236 C 110 180, 90 130, 120 100 C 145 76, 180 84, 200 112 C 220 84, 255 76, 280 100 C 310 130, 290 180, 200 236 Z" fill={C.cyan} />
      </g>
      <g className="art-c">
        <path d="M40 160 H140 L158 128 L180 196 L204 110 L224 172 L240 160 H360" stroke={C.white} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="300" y="50" width="56" height="56" rx="14" fill={C.yellow} />
        <path d="M328 62 V94 M312 78 H344" stroke={C.navy} strokeWidth="7" strokeLinecap="round" />
      </g>
    </>
  ),
  ecom: (g) => (
    <>
      <g className="art-a">
        <rect x="40" y="70" width="110" height="140" rx="14" fill={`url(#${g}-glass)`} stroke="rgba(255,255,255,.2)" />
        <rect x="56" y="86" width="78" height="70" rx="10" fill={C.blue} />
        <rect x="56" y="168" width="60" height="8" rx="4" fill="#fff" opacity=".6" />
        <rect x="56" y="184" width="36" height="8" rx="4" fill={C.yellow} />
      </g>
      <g className="art-b">
        <path d="M150 110 H290 L276 260 H164 Z" fill={C.yellow} />
        <path d="M188 110 V92 a32 32 0 0 1 64 0 V110" stroke={C.navy} strokeWidth="8" fill="none" />
        <circle cx="220" cy="180" r="22" fill={C.navy} />
        <path d="M210 180 l7 7 l14 -14" stroke={C.yellow} strokeWidth="5" fill="none" strokeLinecap="round" />
      </g>
      <g className="art-c">
        <path d="M300 60 h56 l20 22 l-38 38 l-38 -38 z" fill={C.cyan} transform="rotate(10 330 90)" />
        <circle cx="336" cy="78" r="6" fill={C.navy} />
        <circle cx="330" cy="240" r="24" fill={`url(#${g}-sphere)`} />
      </g>
    </>
  ),
  enterprise: (g) => (
    <>
      <g className="art-a" stroke="rgba(54,200,232,.5)" strokeWidth="2" fill="none">
        <path d="M120 80 H280 M120 80 V230 M280 80 V230" strokeDasharray="5 6" />
      </g>
      <g className="art-b">
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x="130" y={90 + i * 50} width="140" height="40" rx="10" fill={i === 1 ? C.blue : `url(#${g}-glass)`} stroke="rgba(255,255,255,.25)" />
            <circle cx="150" cy={110 + i * 50} r="5" fill={i === 1 ? C.yellow : C.cyan} />
            <rect x="166" y={106 + i * 50} width="70" height="8" rx="4" fill="#fff" opacity=".45" />
          </g>
        ))}
      </g>
      <g className="art-c">
        {[[60, 90], [60, 210], [340, 90], [340, 210]].map(([x, y], i) => (
          <g key={i}>
            <line x1={x} y1={y} x2={x < 200 ? 130 : 270} y2={y < 150 ? 110 : 210} stroke={C.cyan} strokeWidth="2" />
            <rect x={x - 22} y={y - 22} width="44" height="44" rx="12" fill={i % 3 ? C.cream : C.yellow} />
          </g>
        ))}
      </g>
    </>
  ),
  edtech: (g) => (
    <>
      <g className="art-a">
        <rect x="250" y="60" width="110" height="80" rx="12" fill={`url(#${g}-glass)`} stroke="rgba(255,255,255,.2)" />
        <path d="M296 84 l22 16 l-22 16 z" fill={C.yellow} />
      </g>
      <g className="art-b">
        <path d="M60 140 Q 130 120 200 150 V260 Q 130 230 60 250 Z" fill={C.cream} />
        <path d="M340 140 Q 270 120 200 150 V260 Q 270 230 340 250 Z" fill="#f1e6c8" />
        {[0, 1, 2].map((i) => <rect key={i} x="84" y={168 + i * 20} width="90" height="6" rx="3" fill={C.navy} opacity=".25" />)}
        {[0, 1, 2].map((i) => <rect key={i} x="226" y={168 + i * 20} width="90" height="6" rx="3" fill={C.navy} opacity=".25" />)}
      </g>
      <g className="art-c">
        <path d="M70 80 L140 52 L210 80 L140 108 Z" fill={C.blue} />
        <path d="M100 92 V118 Q140 136 180 118 V92" fill={C.navy} stroke={C.cyan} strokeWidth="2" />
        <path d="M200 84 V120" stroke={C.yellow} strokeWidth="4" />
        <circle cx="200" cy="124" r="6" fill={C.yellow} />
      </g>
    </>
  ),
  security: (g) => (
    <>
      <g className="art-a">
        <path d="M80 210 a50 50 0 0 1 20 -96 a70 70 0 0 1 130 -10 a46 46 0 0 1 60 106 Z" fill={`url(#${g}-glass)`} stroke="rgba(255,255,255,.2)" />
      </g>
      <g className="art-b">
        <path d="M200 60 L280 92 V160 C280 210 245 244 200 262 C155 244 120 210 120 160 V92 Z" fill={C.blue} stroke={C.cyan} strokeWidth="3" />
      </g>
      <g className="art-c">
        <rect x="170" y="150" width="60" height="50" rx="10" fill={C.yellow} />
        <path d="M182 150 V134 a18 18 0 0 1 36 0 V150" stroke={C.yellow} strokeWidth="7" fill="none" />
        <circle cx="200" cy="172" r="7" fill={C.navy} />
        <rect x="197" y="174" width="6" height="14" rx="3" fill={C.navy} />
      </g>
    </>
  ),
  film: (g) => (
    <>
      <g className="art-a">
        <rect x="40" y="60" width="320" height="180" rx="16" fill={`url(#${g}-glass)`} stroke="rgba(255,255,255,.2)" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <g key={i}>
            <rect x={56 + i * 38} y="70" width="22" height="12" rx="3" fill="#fff" opacity=".25" />
            <rect x={56 + i * 38} y="218" width="22" height="12" rx="3" fill="#fff" opacity=".25" />
          </g>
        ))}
      </g>
      <g className="art-b">
        <rect x="90" y="96" width="220" height="110" rx="10" fill={C.blue} />
        <circle cx="200" cy="151" r="30" fill={C.yellow} />
        <path d="M192 136 l24 15 l-24 15 z" fill={C.navy} />
      </g>
      <g className="art-c">
        <g transform="rotate(-12 320 70)">
          <rect x="270" y="56" width="100" height="44" rx="6" fill={C.cream} />
          <path d="M270 56 h100 l-6 -20 h-100 z" fill={C.navy} stroke={C.cream} strokeWidth="2" />
          <path d="M282 36 l12 20 M306 36 l12 20 M330 36 l12 20" stroke={C.yellow} strokeWidth="6" />
        </g>
      </g>
    </>
  ),
  event: (g) => (
    <>
      <g className="art-a">
        <path d="M110 40 L60 230 H160 Z" fill="rgba(255,193,7,.22)" />
        <path d="M290 40 L240 230 H340 Z" fill="rgba(54,200,232,.22)" />
        <circle cx="110" cy="40" r="10" fill={C.yellow} />
        <circle cx="290" cy="40" r="10" fill={C.cyan} />
      </g>
      <g className="art-b">
        <rect x="70" y="190" width="260" height="34" rx="6" fill={`url(#${g}-glass)`} stroke="rgba(255,255,255,.3)" />
        <rect x="130" y="90" width="140" height="90" rx="8" fill={C.blue} stroke="rgba(255,255,255,.3)" />
        <text x="200" y="145" textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight="800" fontSize="22" fill={C.white}>LAUNCH</text>
      </g>
      <g className="art-c">
        {Array.from({ length: 11 }).map((_, i) => (
          <circle key={i} cx={60 + i * 28} cy={258 + (i % 2) * 8} r="12" fill={i % 4 === 0 ? C.yellow : '#2a4590'} />
        ))}
      </g>
    </>
  ),
}

export default function Art({ kind = 'brand', accent = C.yellow, className = '', label }) {
  const g = useId().replace(/:/g, '')
  const scene = scenes[kind] || scenes.brand
  return (
    <div className={`art ${className}`} style={{ '--accent': accent }} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id={`${g}-glass`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity=".18" />
            <stop offset="1" stopColor="#ffffff" stopOpacity=".04" />
          </linearGradient>
          <radialGradient id={`${g}-sphere`} cx=".35" cy=".3" r=".75">
            <stop offset="0" stopColor="#9fe9ff" />
            <stop offset=".45" stopColor={C.cyan} />
            <stop offset="1" stopColor={C.blue} />
          </radialGradient>
          <linearGradient id={`${g}-chip`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={C.blue} />
            <stop offset="1" stopColor={C.navy} />
          </linearGradient>
          <linearGradient id={`${g}-card`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1f3f9a" />
            <stop offset="1" stopColor={C.navy} />
          </linearGradient>
        </defs>
        {scene(g)}
      </svg>
    </div>
  )
}
