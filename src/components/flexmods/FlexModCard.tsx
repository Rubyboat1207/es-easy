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
  highlighted?: boolean;
}

const FlexModCard: React.FC<FlexModCardProps> = ({title, room, periodid, formatted_date, setChanges, highlighted}) => {
  const { getThemeObject } = useJSONTheme();
  const [modalShow, setShowModal] = useState<boolean>(false);

  const theme = getThemeObject();

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
        backgroundColor: theme.rotation_card_background_color,
      }}
    >
      <CardContent>
        <Typography variant="h6" component="div" sx={{fontSize: 18, color: highlighted ? theme.highlight_text_color : undefined}}>
          {title}
        </Typography>
        <Typography color="text.secondary">
          <Typography sx={{ display: "inline", fontSize: 12, color: highlighted ? theme.highlight_text_color : undefined }}>
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
