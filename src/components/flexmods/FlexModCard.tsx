import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { useJSONTheme } from "../../contexts/ThemeContext";
import { useState } from "react";
import { createPortal } from "react-dom";
import FlexModSelectModal from "./FlexModSelectModal";
import { CourseChange } from "../Rotationcard";

interface FlexModCardProps {
  title: string;
  room: string;
  periodid: number;
  formatted_date: string;
  setChanges: React.Dispatch<React.SetStateAction<CourseChange[]>>;
}

const FlexModCard: React.FC<FlexModCardProps> = ({title, room, periodid, formatted_date, setChanges}) => {
  const { getThemeObject } = useJSONTheme();
  const [modalShow, setShowModal] = useState<boolean>(false);

  const themeObject = getThemeObject();

  function showModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function submitChanges(change: CourseChange) {
    setChanges(changes => [change, ...changes]);
    closeModal();
  }

  return (
    <>
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
          <IconButton onClick={showModal}>
            <EditIcon />
          </IconButton>
        </CardActions>
      </CardContent>
    </Card>
    {modalShow && createPortal((<FlexModSelectModal onClose={closeModal} classid={periodid} datefmted={formatted_date} onSubmit={submitChanges}/>), document.body)}
    </>
  );
};


export default FlexModCard;
