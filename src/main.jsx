import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { SWRConfig } from 'swr'

createRoot(document.getElementById('root')).render(
  //use SWRConfig component->
  // <SWRConfig value={{
  //   refreshInterval :1000
  // }}>
  //   <App />
  // </SWRConfig>

  //normal way->
  <App />

)
