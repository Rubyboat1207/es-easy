import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
// import { Edit as EditIcon } from "@mui/icons-material";
import { useJSONTheme } from "../../contexts/ThemeContext";

interface FlexModCardProps {
  title: string;
  room: string;
}

const FlexModCard: React.FC<FlexModCardProps> = ({title, room}) => {
  const { getThemeObject } = useJSONTheme();

  const themeObject = getThemeObject();
  return (
    <Card
      sx={{
        backgroundColor: themeObject.rotation_card_background_color,
      }}
    >
      <CardContent>
        <Typography variant="h6" component="div" sx={{fontSize: 18}}>
          {title}
        </Typography>
        <Typography color="text.secondary">
          <Typography sx={{ display: "inline", fontSize: 12 }} color="text.secondary">
            {room}
          </Typography>
        </Typography>
        <CardActions sx={{ justifyContent: "center", alignContent: "center" }}>
          <IconButton>
            {/* <EditIcon /> */}
          </IconButton>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default FlexModCard;
