import React, { createContext, useContext, useState } from "react";

// Step 1: Define the context shape
interface SecretModeContextProps {
  isEnabled: boolean;
  showHiddenThemes: boolean;
  setShowHiddenThemes: (value: boolean) => void;
  setShowFlexModBeta: (value: boolean) => void;

}

// Create the context with an initial undefined value
const SecretModeContext = createContext<SecretModeContextProps | undefined>(
  undefined
);

// Step 2: Define the provider component
const SecretModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showHiddenThemes, setShowHiddenThemes] = useState(localStorage.getItem("showHiddenThemes") === "true")
  const [showFlexModBeta, setShowFlexModBeta] = useState(localStorage.getItem("showFlexMods") === "true")

  function setShowHiddenThemesLS(v: boolean) {
    setShowHiddenThemes(v);
    localStorage.setItem("showHiddenThemes", v + '')
  }

  function setShowFlexModBetaLS(v: boolean) {
    setShowFlexModBeta(v);
    localStorage.setItem("showFlexMods", v + '')
  }

  const isDevMode = localStorage.getItem("winner") === "yes";

  return (
    <SecretModeContext.Provider
      value={{
        isEnabled: isDevMode,
        showHiddenThemes: showHiddenThemes && isDevMode,
        setShowHiddenThemes: setShowHiddenThemesLS,
        setShowFlexModBeta: setShowFlexModBetaLS
      }}
    >
      {children}
    </SecretModeContext.Provider>
  );
};

// Custom hook for easy access to context
const useSecretMode: () => SecretModeContextProps = () => {
  const context = useContext(SecretModeContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};

export { SecretModeProvider, useSecretMode };
