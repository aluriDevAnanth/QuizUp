import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthPro } from './context/AuthPro.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthPro>
        <App />
      </AuthPro>

    </BrowserRouter>
  </React.StrictMode>,
)
