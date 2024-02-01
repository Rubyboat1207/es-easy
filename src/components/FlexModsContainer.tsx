import {
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Edit as EditIcon } from '@mui/icons-material';
import { useJSONTheme } from "../contexts/ThemeContext";

function FlexModsContainer() {
  const { getThemeObject } = useJSONTheme();

  const themeObject = getThemeObject();

  
  return (
    <Grid
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      item
      xs={12}
    >
      <Card sx={{backgroundColor: themeObject.rotation_card_background_color}}>
        <CardContent>
          <Typography>Flex Mod 1</Typography>
        </CardContent>
        <CardActions>
          <IconButton>
            <EditIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default FlexModsContainer;
