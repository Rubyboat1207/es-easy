import React, { useState, createContext, useContext } from 'react';
import { ThemeObject, theme_dark } from '../util/themes';
import { ThemeProvider, createTheme } from '@mui/material';

// Step 1: Define the context shape
interface ThemeContextProps {
    themeJson: string,
    setThemeJson: (json: string) => void,
    getThemeObject: () => ThemeObject
}

// Create the context with an initial undefined value
const JSONThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// Step 2: Define the provider component
const JSONThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [themeJson, setThemeJson] = useState<string>(theme_dark);

    const theme: ThemeObject = getThemeObject() || JSON.parse(theme_dark);

    console.log(theme)

    const muiTheme = createTheme({
        palette: {
            background: {
                paper: theme.card_background_color
            },
            primary: {
                main: theme.primary_color,
                contrastText: theme.primary_text_color
            },
            secondary: {
                main: theme.secondary_color,
            },
            text: {
                primary: theme.primary_text_color,
                secondary: theme.secondary_text_color,
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
        components: {
            MuiSvgIcon: {
                defaultProps: {
                    sx: {color: theme.icon_color || theme.primary_text_color}
                }
            }
        }
    })

    if(!theme.background_image_url) {
        document.body.style.backgroundColor = theme.background_color;
        document.body.style.backgroundImage = ''
    }else {
        document.body.style.backgroundColor = '';
        document.body.style.backgroundImage = `url(${theme.background_image_url})`;

    }


    function getThemeObject() {
        return themeJson ? JSON.parse(themeJson) as ThemeObject : JSON.parse(theme_dark);
    }


    return (
        <JSONThemeContext.Provider value={{ themeJson, setThemeJson, getThemeObject }}>
            <ThemeProvider theme={muiTheme}>
                {children}
            </ThemeProvider>
        </JSONThemeContext.Provider>
    );
};

// Custom hook for easy access to context
const useJSONTheme: () => ThemeContextProps = () => {
    const context = useContext(JSONThemeContext);
    if (!context) {
        throw new Error('useLogin must be used within a LoginProvider');
    }
    return context;
};

export { JSONThemeProvider, useJSONTheme };
