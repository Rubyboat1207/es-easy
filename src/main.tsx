import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import { LoginProvider } from "./contexts/LoginContext.tsx";
import Login from "./Login.tsx";
import "./index.css";
import { NotificationProvider } from "./contexts/NotificationContext.tsx";
import { JSONThemeProvider } from "./contexts/ThemeContext.tsx";
import EulaPage from "./Eula.tsx";
import { SecretModeProvider } from "./contexts/SecretModeContexts.tsx";
import ChangeLog from "./Changelog.tsx";
import { ThemesMarket } from "./ThemesMarket.tsx";
//6LcQJscpAAAAACpIvLt3DlJ4sWekNGLHuSqBB8Z_
const routes = createBrowserRouter([
  {
    path: "/App",
    element: <App />,
  },
  {
    path: "/eula",
    element: <EulaPage />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: '/patch_notes',
    element: <ChangeLog/>
  },
  {
    path: '/market',
    element: <ThemesMarket/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LoginProvider>
      <JSONThemeProvider>
        <NotificationProvider>
          <SecretModeProvider>
            <RouterProvider router={routes}/>
          </SecretModeProvider>
        </NotificationProvider>
      </JSONThemeProvider>
    </LoginProvider>
  </React.StrictMode>
);
