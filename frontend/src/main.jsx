import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')).render(
   <AuthProvider>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </AuthProvider>
)
