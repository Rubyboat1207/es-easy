import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import { LoginProvider } from './contexts/LoginContext.tsx'
import Login from './Login.tsx'
import './index.css'
import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'
import { NotificationProvider } from './contexts/NotificationContext.tsx'
import { JSONThemeProvider } from './contexts/ThemeContext.tsx'

const routes = createBrowserRouter([
  {
    path: '/App',
    element: (<App/>)
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
            <RouterProvider router={routes} />
          </JSONThemeProvider>
        </NotificationProvider>
    </LoginProvider>
  </React.StrictMode>,
)
