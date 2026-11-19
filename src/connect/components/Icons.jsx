// Line icons for the /connect page (24px grid, currentColor).

const P = {
  phone: <path d="M5 3.5h3.6l1.6 4.4-2.3 1.5a11.5 11.5 0 006.7 6.7l1.5-2.3 4.4 1.6V19a2 2 0 01-2 2C10.8 20.5 3.5 13.2 3 5.5a2 2 0 012-2z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3.8 6.6L12 12.6l8.2-6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.6 2.6 3.8 5.6 3.8 9s-1.2 6.4-3.8 9c-2.6-2.6-3.8-5.6-3.8-9S9.4 5.6 12 3z" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M4.2 20l1.1-4A8.6 8.6 0 1112 20.6a8.6 8.6 0 01-4-1l-3.8.4z" />
      <path d="M9 8.4c.2-.4.5-.5.8-.5h.5c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.1.1-.1.3 0 .5.6 1 1.4 1.8 2.4 2.4.2.1.4.1.5 0l.6-.6c.2-.2.4-.2.6-.1l1.6.8c.2.1.3.3.3.5v.4c0 .4-.2.7-.5.9-.6.4-1.4.5-2.2.2-2.2-.8-4-2.6-4.8-4.8-.3-.8-.2-1.6.2-2.2z" fill="currentColor" stroke="none" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3.5" />
      <path d="M8 10.5V16.5M8 7.5v.01M11.5 16.5v-6M11.5 13c0-1.6 1-2.6 2.4-2.6s2.1.9 2.1 2.6v3.5" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.2 6.8v.01" />
    </>
  ),
  download: <path d="M12 4v11M7.5 10.5L12 15l4.5-4.5M5 19.5h14" />,
  contact: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <circle cx="9" cy="11" r="2.4" />
      <path d="M5.5 16.5c.6-1.8 1.9-2.7 3.5-2.7s2.9.9 3.5 2.7M15 9.5h3M15 13h3" />
    </>
  ),
  arrowUp: <path d="M12 19V5M6.5 10.5L12 5l5.5 5.5" />,
  arrowRight: <path d="M4 12h16M14 6l6 6-6 6" />,
  arrowNE: <path d="M7 17L17 7M8.5 7H17v8.5" />,
  menu: <path d="M4 8h16M4 16h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  copy: (
    <>
      <rect x="8.5" y="8.5" width="11.5" height="11.5" rx="2.5" />
      <path d="M15.5 8.5V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7.5a2 2 0 002 2h2.5" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  bulb: <path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9V16h7v-2.1A6 6 0 0012 3z" />,
  code: <path d="M8.5 7L3.5 12l5 5M15.5 7l5 5-5 5M13.5 4.5l-3 15" />,
  layers: (
    <>
      <path d="M12 3L2.5 8 12 13l9.5-5L12 3z" />
      <path d="M2.5 12.5L12 17.5l9.5-5M2.5 16.5L12 21.5l9.5-5" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8.5" r="3.2" />
      <circle cx="17" cy="9.5" r="2.4" />
      <path d="M3 20c0-3.5 2.7-5.8 6-5.8s6 2.3 6 5.8M15.5 14.6c3 0 5.5 1.6 5.5 4.9" />
    </>
  ),
  alert: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.5M12 16.5v.01" />
    </>
  ),
}

export function Icon({ name, size = 20, stroke = 1.7, className }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {P[name]}
    </svg>
  )
}
