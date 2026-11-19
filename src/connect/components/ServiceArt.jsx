// Custom line illustrations, one per studio. Layers (.l1/.l2) shift on card hover.
const arts = {
  creative: (
    <>
      <g className="l1">
        <circle cx="120" cy="100" r="58" className="s-ivory" />
        <circle cx="120" cy="100" r="22" className="s-ivory" />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <path key={a} d="M120 78 L140 52" className="s-ivory" transform={`rotate(${a} 120 100)`} />
        ))}
      </g>
      <g className="l2">
        <path d="M196 40 C 240 70, 236 130, 196 160" className="s-orange" />
        <path d="M188 152 l10 22 l10 -22 z" className="f-orange" />
        <rect x="38" y="150" width="54" height="34" rx="6" className="s-teal" />
      </g>
    </>
  ),
  growth: (
    <>
      <g className="l1">
        <path d="M30 180 H230" className="s-dim" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={46 + i * 36} y={150 - i * 24} width="18" height={30 + i * 24} rx="3" className="s-ivory" />
        ))}
      </g>
      <g className="l2">
        <path d="M40 140 C 90 130, 120 90, 150 80 S 200 40, 222 30" className="s-orange" />
        <path d="M206 26 l18 2 -4 18" className="s-orange" />
        <circle cx="70" cy="60" r="24" className="s-teal" />
        <circle cx="70" cy="60" r="12" className="s-teal" />
        <circle cx="70" cy="60" r="3" className="f-teal" />
      </g>
    </>
  ),
  tech: (
    <>
      <g className="l1">
        <rect x="34" y="40" width="150" height="110" rx="10" className="s-ivory" />
        <path d="M34 62 H184" className="s-dim" />
        <path d="M70 92 l-14 14 14 14 M112 92 l14 14 -14 14 M98 86 l-10 40" className="s-ivory" />
      </g>
      <g className="l2">
        <circle cx="206" cy="58" r="8" className="f-teal" />
        <circle cx="222" cy="128" r="8" className="s-teal" />
        <circle cx="168" cy="178" r="8" className="f-orange" />
        <path d="M206 66 L222 120 M216 134 L174 172 M200 62 L150 150" className="s-teal" />
      </g>
    </>
  ),
  experiences: (
    <>
      <g className="l1">
        <path d="M30 178 H230" className="s-ivory" />
        <path d="M60 178 v-30 h140 v30" className="s-ivory" />
        <path d="M84 30 L56 148 M176 30 L204 148" className="s-dim" />
      </g>
      <g className="l2">
        <path d="M84 30 L130 148 L56 148 Z" className="f-orange-soft" />
        <path d="M176 30 L130 148 L204 148 Z" className="f-teal-soft" />
        <circle cx="84" cy="28" r="7" className="f-orange" />
        <circle cx="176" cy="28" r="7" className="f-teal" />
        <path d="M118 120 l12 -22 12 22 -12 -6z" className="f-ivory" />
      </g>
    </>
  ),
}

export default function ServiceArt({ kind, className = '' }) {
  return (
    <svg className={`cx-art ${className}`} viewBox="0 0 260 200" aria-hidden="true" focusable="false">
      {arts[kind]}
    </svg>
  )
}

