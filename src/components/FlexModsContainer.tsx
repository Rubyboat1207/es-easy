import {
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useJSONTheme } from "../contexts/ThemeContext";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

function FlexModsContainer() {
  const { getThemeObject } = useJSONTheme();

  const themeObject = getThemeObject();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <div style={{ marginTop: 20, marginBottom: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', flexDirection: 'column' }}>
        <Grid item>
        <Card
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: '50px',
            padding: "20px 20px 20px 20px",
          }}
        >
          <Typography variant="h4" component="div" color={"text"}>Flex Mod Friday</Typography>
        </Card>
        </Grid>
        <Grid container spacing={2} sx={{ width: '90%', display: 'flex', justifyContent: 'space-between' }}>
          {[...Array(5)].map((_, idx) => (
            <Paper
              elevation={1}
              sx={{ padding: '0px 20px 0px 20px', width: isSmallScreen ? undefined : '15%', display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: isSmallScreen && idx != 0 ? 5 : undefined}}
            >
              <Card sx={{ backgroundColor: themeObject.rotation_card_background_color, height: '60%' }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Flex Mod {idx + 1}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    wjat
                  </Typography>
                  <CardActions>
                    <Typography>seats 5</Typography>
                    <IconButton>
                      <CalendarTodayIcon />
                    </IconButton>
                  </CardActions>
                </CardContent>
              </Card>
            </Paper>
          ))}

        </Grid>
      </div>
    </>
  );
}

export default FlexModsContainer;
