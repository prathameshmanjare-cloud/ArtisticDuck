import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './connect.css'
import ConnectPage from './ConnectPage.jsx'

// /connect is its own lightweight entry (see connect/index.html and vite.config.js):
// no router, smooth-scroll library or main-site chrome, so the QR landing loads fast on phones.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConnectPage />
  </StrictMode>,
)
