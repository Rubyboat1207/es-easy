import React from 'react';
import { Card, CardContent, CardActions, Typography, IconButton, Select, MenuItem, Grid } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, CalendarToday as CalendarTodayIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';

// Theme Select Component
const ThemeSelect: React.FC = () => {
  const [theme, setTheme] = React.useState('');

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
      <MenuItem value={'dark'}>Dark</MenuItem>
      <MenuItem value={'light'}>Light</MenuItem>
      <MenuItem value={'dracula'}>Dracula</MenuItem>
      <MenuItem value={'red'}>Red</MenuItem>
      <MenuItem value={'purple'}>Purple</MenuItem>
    </Select>
  );
};

export default ThemeSelect;