import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
import { Card, IconButton, Radio, RadioGroup, TextField, useMediaQuery, useTheme } from '@mui/material';
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
        <div key={index} className='w-8 lg:w-16 h-14 flex items-center justify-center text-5xl' style={{ background: themeObject.rotation_card_background_color }}>{index < str.length && str[index]}</div>
      ))}
    </div>
  );
};

interface ShareScheduleOptionsParams {
  sharingOption: string,
  setSharingOption: (option: string) => void
}


const ShareScheduleOptions: React.FC<ShareScheduleOptionsParams> = ({sharingOption, setSharingOption}) => {



  return (<>
    <RadioGroup
      value={sharingOption}
      onChange={e => setSharingOption(e.target.value)}
    >
      <div className='flex items-center'>
        <Radio value='full' /><Typography>Share Full Schedule</Typography>
      </div>
      <div className='flex items-center'>
        <Radio value='rotations' /><Typography>Share Only Rotations</Typography>
      </div>
      <div className='flex items-center'>
        <Radio value='flexmods' /><Typography>Share Only Flexmods</Typography>
      </div>
      <div className='flex items-center'>
        <Radio value='today' /><Typography>Share Only Today</Typography>
      </div>
    </RadioGroup>
  </>)
}

interface ShareScheduleModalProps {
  onClose: () => void,
  onShare: (mode: string) => void,
  onUse: () => void,
  code: string,
  setCode: (code: string | ((prev: string) => string)) => void,
  shouldCopy: boolean
}


const ShareScheduleDialog: React.FC<ShareScheduleModalProps> = ({ onClose, onShare, onUse, code, setCode, shouldCopy }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [sharingOption, setSharingOption] = useState('full')
  const {getThemeObject } = useJSONTheme();
  const themeObject = getThemeObject();

  let regex = new RegExp(`[^123456789ABCDEFGHKMNPQRSTUVWXYZ]`, "gi")

  return (
    <div className="modal flex-col lg:flex-row">
      <Card sx={{ zIndex: 500 }} className='w-full h-3/6 lg:h-3/6 lg:w-6/12 justify-between flex flex-col p-5'>
        <div className='flex items-center justify-between'>
          <Typography sx={{ fontSize: 32 }}>Share Schedule</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div>
        <Typography>To copy your friends schedule, simply enter the code generated for them into the box below, and then press save at the top of the screen. If you would like to share a code for your friends, simply press the "Share Schedule" button below and send the generated code to them. (remember to save your own schedule before sending it to others)</Typography>
        <br/>
        <Typography sx={{fontSize: 14, color: themeObject.secondary_text_color}}>Creating a share code uploads your current schedule and your name for basic functionality. Only continue if you are ok with these two bits of data being stored.</Typography>
        </div>
        <div className='justify-center mt-5 w-full flex'>
          <TextField InputLabelProps={{style:{color: themeObject.primary_text_color}}} value={code} onChange={e => setCode(e.target.value.toUpperCase().replace(regex, ''))} label="Share Code" inputProps={{maxLength:5}}></TextField>
        </div>
        <Box textAlign="center" marginTop={2}>
          <Button variant="contained" startIcon={<ShareIcon />} onClick={shouldCopy ? () => { navigator.clipboard.writeText(code) } : code ? () => onUse() : () => onShare(sharingOption)}>
            {shouldCopy ? "Copy Code" : code ? "Use Schedule" : "Share Schedule"}
          </Button>
        </Box>
      </Card>
      <Card sx={{ zIndex: 500 }} className='mt-10 lg:mt-0 p-5 lg:ml-10'>
        <ShareScheduleOptions sharingOption={sharingOption} setSharingOption={setSharingOption}/>
      </Card>
    </div>
  );
};

export default ShareScheduleDialog;
