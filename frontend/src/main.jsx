import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FarmerProvider } from './context/FarmerContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FarmerProvider>
      <App />
    </FarmerProvider>
  </StrictMode>,
)
