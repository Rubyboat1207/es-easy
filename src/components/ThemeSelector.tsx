import React, { useEffect } from 'react';
import { Select, MenuItem } from '@mui/material';
import { theme_american, theme_dark, theme_dracula, theme_light, theme_purple, theme_red, theme_titan } from '../util/themes';
import { useJSONTheme } from '../contexts/ThemeContext';
import { useSecretMode } from '../contexts/SecretModeContexts';

// Theme Select Component
const ThemeSelect: React.FC = () => {
  const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'dark');
  const { setThemeJson } = useJSONTheme();

  const { showHiddenThemes } = useSecretMode();

  const themes: {[key: string]: string} = {
    dark: theme_dark,
    light: theme_light,
    dracula: theme_dracula,
    red: theme_red,
    purple: theme_purple,
    robotics: theme_titan
  }

  if(showHiddenThemes) {
    themes['america'] = theme_american;
  }

  useEffect(() => {
    if(Object.keys(themes).includes(theme)) {
      setThemeJson(themes[theme]);
    }

    localStorage.setItem('theme', theme);
  }, [theme])

  return (
    <Select
      value={theme}
      onChange={(event) => setTheme(event.target.value)}
      displayEmpty
      inputProps={{ 'aria-label': 'Without label' }}
    >
      <MenuItem value="" disabled>
        Theme
      </MenuItem>
      {Object.keys(themes).map((k: string) => (
        <MenuItem value={k}>{k.substring(0,1).toUpperCase() + k.substring(1)}</MenuItem>
      ))}
    </Select>
  );
};

export default ThemeSelect;