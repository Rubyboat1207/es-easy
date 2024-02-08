import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface ThemeModalProps {
    onClose: () => void
}

const ThemeModal: React.FC<ThemeModalProps> = ({onClose}) => {
  return (
    <div className="modal">
      <Card sx={{ width: "95vw", height: "95vh", zIndex: 500 }}>
        <CardContent sx={{height: '100%'}}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography>Theme Editor</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <Grid container sx={{height: '100%'}}>
            <Grid item sm={8}>
              <div style={{display: 'flex', flexDirection: 'column', height: '90%'}}>
                <div>Heading</div>
                <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', height: '100%'}}>
                  <div>Day View</div>
                  <div>
                    rotation selector
                  </div>
                  <div style={{display: 'flex', height: '100%', justifyContent: 'space-between', flexDirection: 'column'}}>
                    <div>buttons</div>
                    <div>notifications</div>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item sm={4} sx={{backgroundColor: '#000'}}>
                
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeModal;
