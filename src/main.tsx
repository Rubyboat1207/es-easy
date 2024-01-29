import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import { LoginProvider } from './contexts/LoginContext.tsx'
import Login from './Login.tsx'
import './index.css'
import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'

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

const theme = createTheme({
  palette: {
    mode: 'dark',
    // Optionally, customize your colors here
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
  typography: {
    fontFamily: [
      'Noto Sans',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoginProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider router={routes} />
      </ThemeProvider>
    </LoginProvider>
  </React.StrictMode>,
)