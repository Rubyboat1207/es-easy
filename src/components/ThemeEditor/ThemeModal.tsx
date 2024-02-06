import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface ThemeModalProps {
    onClose: () => void
}

const ThemeModal: React.FC<ThemeModalProps> = ({onClose}) => {
  return (
    <div className="modal">
      <Card sx={{ width: "95vw", height: "95vh", zIndex: 500 }}>
        <CardContent>
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
          <Grid container sm={2}>
            <Grid item>

            </Grid>
            <Grid item>
                
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeModal;
