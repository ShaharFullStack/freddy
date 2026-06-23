/**
 * Application entry point. Bootstraps React with StrictMode and mounts App to #root.
 * Global styles (Tailwind + custom) are imported here.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Mount the root component; index.html provides the <div id="root"> container
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
