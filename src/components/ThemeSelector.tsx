import React from 'react';
import { Select, MenuItem } from '@mui/material';
import { theme_american, theme_dark, theme_dracula, theme_light, theme_purple, theme_red, theme_titan } from '../util/themes';
import { useJSONTheme } from '../contexts/ThemeContext';
import { useSecretMode } from '../contexts/SecretModeContexts';

// Theme Select Component
const ThemeSelect: React.FC = () => {
  const { setThemeJson, getThemeObject } = useJSONTheme();
  const [theme, setTheme] = React.useState(JSON.stringify(getThemeObject()));

  const { showHiddenThemes } = useSecretMode();

  const themes: {[key: string]: string} = {
    dark: theme_dark,
    light: theme_light,
    dracula: theme_dracula,
    red: theme_red,
    purple: theme_purple,
    robotics: theme_titan
  }
  const custom_theme = localStorage.getItem('custom_theme')

  if(showHiddenThemes) {
    themes['america'] = theme_american;
  }


  if(custom_theme) {
    // console.log(custom_theme)
    themes['custom'] = custom_theme
  }


  // useEffect(() => {
  //   if(Object.keys(themes).includes(theme)) {
  //     setThemeJson(themes[theme]);
  //   }

  //   localStorage.setItem('theme', theme);
  // }, [theme])

  function onThemeChange(theme_json: string) {
    setTheme(theme_json);
    setThemeJson(theme_json)
  }

  return (
    <Select
      value={theme}
      onChange={(event) => onThemeChange(event.target.value)}
      displayEmpty
      inputProps={{ 'aria-label': 'Without label' }}
    >
      <MenuItem value="" disabled key={0}>
        Theme
      </MenuItem>
      {Object.values(themes).map((k: string, idx) => (
        <MenuItem value={k} key={idx}>{JSON.parse(k).theme_name}</MenuItem>
      ))}
    </Select>
  );
};

export default ThemeSelect;