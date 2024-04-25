import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
import { Card, IconButton } from '@mui/material';
import { useJSONTheme } from '../contexts/ThemeContext';
import CloseIcon from '@mui/icons-material/Close';

interface CharacterSpotsProps {
  count: number;
  str: string;
}

const CharacterSpots: React.FC<CharacterSpotsProps> = ({ count, str }) => {
  const { getThemeObject } = useJSONTheme();

  const themeObject = getThemeObject();

  return (
    <div className='flex items-center justify-between w-3/4'>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className='w-8 lg:w-16 h-14 flex items-center justify-center text-5xl' style={{background: themeObject.rotation_card_background_color}}>{index < str.length && str[index]}</div>
      ))}
    </div>
  );
};

interface ShareScheduleModalProps {
  onClose: () => void,
  onShare: () => void,
  onUse: () => void,
  code: string,
  setCode: (code: string | ((prev: string) => string)) => void,
  shouldCopy: boolean
}

const ShareScheduleDialog: React.FC<ShareScheduleModalProps> = ({onClose, onShare, onUse, code, setCode, shouldCopy}) => {

  useEffect(() => {
    // Function to handle key press events
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase(); // Normalize the key to uppercase
      const allowedKeys = '123456789ABCDEFGHKMNPQRSTUVWXYZ';

      if (event.ctrlKey && key === 'V') {
        return; // Do nothing and wait for the paste handler to take over
      }
  
      if (allowedKeys.includes(key)) {
        setCode((prevStr) => {
          if (prevStr.length + 1 <= 5) {
            return prevStr + key;
          }
          return prevStr;
        });
      } else if (event.key === 'Backspace') {
        setCode(prevStr => prevStr.slice(0, -1));
      }
    };
  
    // Function to handle paste events
    const handlePaste = (event: ClipboardEvent) => {
      if(!event.clipboardData) {
        return;
      }
      const paste = (event.clipboardData).getData('text').toUpperCase();
      const allowedKeys = '123456789ABCDEFGHKMNPQRSTUVWXYZ';
      const filteredPaste = paste.split('').filter(char => allowedKeys.includes(char)).join('');
  
      setCode(prevStr => {
        const newStr = prevStr + filteredPaste;
        return newStr.slice(0, Math.min(newStr.length, 5)); // Ensure not to exceed the length limit
      });
  
      // Prevent the default paste action
      event.preventDefault();
    };
  
    // Attach the event listeners
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('paste', handlePaste);
  
    // Cleanup function to remove the event listeners
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('paste', handlePaste);
    };
  }, []); // Empty dependency array means this effect runs only on mount and unmount
  

  return (
    <div className="modal">
      <Card sx={{zIndex:500}} className='w-full h-2/6 lg:w-6/12 text-center justify-between flex flex-col p-5'>
        <div className='flex items-center justify-between'>
          <Typography sx={{fontSize: 32}}>Share Schedule</Typography>
          <IconButton onClick={onClose}>
              <CloseIcon />
          </IconButton>
        </div>
        <div className='flex justify-center mt-5 w-full'>
        <CharacterSpots count={5} str={code}/>
        </div>
        <Box textAlign="center" marginTop={2}>
          <Button variant="contained" startIcon={<ShareIcon />} onClick={shouldCopy ? () => {navigator.clipboard.writeText(code)} : code ? () => onUse() : onShare}>
            {shouldCopy ? "Copy Code" : code ? "Use Schedule" : "Share Schedule"}
          </Button>
        </Box>
      </Card>
    </div>
  );
};

export default ShareScheduleDialog;
