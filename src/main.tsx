import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import { LoginProvider } from './contexts/LoginContext.tsx'
import Login from './Login.tsx'
import './index.css'
import { NotificationProvider } from './contexts/NotificationContext.tsx'
import { JSONThemeProvider } from './contexts/ThemeContext.tsx'
import EulaPage from './Eula.tsx'
import { SecretModeProvider } from './contexts/SecretModeContexts.tsx'

const routes = createBrowserRouter([
  {
    path: '/App',
    element: (<App/>)
  },
  {
    path: '/eula',
    element: (<EulaPage/>)
  },
  {
    path: '/',
    element: (<Login/>)
  }
])



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoginProvider>
        <NotificationProvider>
          <JSONThemeProvider>
            <SecretModeProvider>
              <RouterProvider router={routes} />
            </SecretModeProvider>
          </JSONThemeProvider>
        </NotificationProvider>
    </LoginProvider>
  </React.StrictMode>,
)
