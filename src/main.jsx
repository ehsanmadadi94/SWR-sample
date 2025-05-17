import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { SWRConfig } from 'swr'

createRoot(document.getElementById('root')).render(
  <SWRConfig value={{
    refreshInterval :1000
  }}>
    <App />
  </SWRConfig>

)
