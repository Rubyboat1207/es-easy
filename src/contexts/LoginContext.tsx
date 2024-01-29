import React, { useState, createContext, useContext } from 'react';

// Step 1: Define the context shape
interface LoginContextProps {
    token: string | null;
    setToken: (token: string | null) => void;
    isLoggedIn: boolean;
}

// Create the context with an initial undefined value
const LoginContext = createContext<LoginContextProps | undefined>(undefined);

// Step 2: Define the provider component
const LoginProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [token, setToken] = useState<string | null>(sessionStorage.getItem('token') || '');

    function setTok(token: string | null): void {
        setToken(token);
        sessionStorage.setItem('token', token || '');
    }


    return (
        <LoginContext.Provider value={{ token, setToken: setTok, isLoggedIn: token != '' }}>
            {children}
        </LoginContext.Provider>
    );
};

// Custom hook for easy access to context
const useLogin: () => LoginContextProps = () => {
    const context = useContext(LoginContext);
    if (!context) {
        throw new Error('useLogin must be used within a LoginProvider');
    }
    return context;
};

export { LoginProvider, useLogin };
