import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const SpinningLoader: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40%',
        minHeight: '400px' // This will center the loader vertically in the viewport. Adjust as necessary.
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default SpinningLoader;
