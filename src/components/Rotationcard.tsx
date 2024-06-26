import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Course, ScheduleListResponse } from "../types";
import { useLogin } from "../contexts/LoginContext";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useJSONTheme } from "../contexts/ThemeContext";
import { useCourseContextProvider } from "../contexts/CourseContext";

interface RotationCardProps {
  title: string;
  name?: string;
  room: string;
  classid: number;
  openModal: (classid: number, dayoff: number) => void;
  dayOff: number;
  highlight_text?: boolean;
}

const RotationCard: React.FC<RotationCardProps> = ({
  title,
  name: subtitle,
  room,
  openModal,
  classid,
  dayOff,
  highlight_text
}) => {
  const { getThemeObject } = useJSONTheme();

  const themeObject = getThemeObject();

  return (
    <>
      <Card
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          backgroundColor: themeObject.rotation_card_background_color,
        }}
      >
        <CardContent>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography sx={{ mb: 1.5, color: (highlight_text && themeObject.highlight_text_color) || ''}} color="text.secondary">
            {subtitle} - (
            <Typography sx={{ display: "inline", color: (highlight_text && themeObject.highlight_text_color) || '' }} color="text.secondary">
              {room}
            </Typography>
            )
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            aria-label="edit"
            onClick={() => openModal(classid, dayOff)}
          >
            <EditIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export interface CourseChange {
  courseName: string;
  courseRoom: string;
  periodId: number;
  EsCourseId: number;
  date: string;
}

interface RotationSelectModalProps {
  onClose: () => void;
  onSubmit: (change: CourseChange) => void;
  classid: number;
  datefmted: string;
}

interface RotationSelectionProps {
  title: string;
  subtitle: string;
  onClick: () => void;
  seatsLeft: number;
  hasAlreadyScheduled: boolean;
}

export const RotationSelection: React.FC<RotationSelectionProps> = ({
  title,
  subtitle,
  seatsLeft,
  onClick,
  hasAlreadyScheduled,
}) => {
  const { getThemeObject } = useJSONTheme();

  const themeObject = getThemeObject();

  return (
    <>
      <Card
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          backgroundColor: themeObject.rotation_card_background_color,
        }}
      >
        <CardContent>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {subtitle}
          </Typography>
          {hasAlreadyScheduled && (
            <Typography sx={{ mb: 1.5, color: "red" }}>
              You have already scheduled this mod! Don't schedule it again
              unless you know what you're doing!
            </Typography>
          )}
          <CardActions>
            <Typography>seats {seatsLeft}</Typography>
            <IconButton onClick={onClick}>
              <CalendarTodayIcon />
            </IconButton>
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
};

export const RotationSelectModal: React.FC<RotationSelectModalProps> = ({
  onClose,
  classid,
  datefmted,
  onSubmit,
}) => {
  const { token } = useLogin();
  const [classes, setClasses] = useState<Course[]>();
  const { changes, courses } = useCourseContextProvider();
  const modalContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios
      .post("https://titanschedule.com:8533/api", {
        url: `https://studentsapi.enrichingstudents.com/v1.0/course/forstudentscheduling/${datefmted}/${classid}`,
        method: "get",
        headers: {
          esauthtoken: token,
        },
      })
      .then((res) => {
        const data: ScheduleListResponse = res.data;

        console.log(data);
        setClasses(data.courses);
      });
  }, []);

  useEffect(() => {
    const clickEvent = (event: MouseEvent) => {
      if(event.target === modalContainer.current) {
        onClose();
      }
    }
    if(modalContainer.current !== null) {
      modalContainer.current.addEventListener('click', clickEvent);

      return () => {modalContainer.current?.removeEventListener('click', clickEvent)};
    }
  }, [modalContainer])

  function wasAlreadyScheduled(c: Course) {
    return (
      changes.filter(
        (o) =>
          o.courseName === c.courseNameOriginal && o.date === c.appointmentDate
      ).length > 0 ||
      courses.filter(
        (o) =>
          o?.courseName === c.courseNameOriginal &&
          o.appointmentDate === c.appointmentDate
      ).length > 0
    );
  }

  return (
    <div className="modal" ref={modalContainer}>
      <Card
        sx={{
          width: "500px",
          zIndex: 500,
          maxHeight: "65vh",
          overflowY: "auto",
        }}
      >
        <CardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography>Schedule A Class</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div>
            {classes?.sort((a, b) => {
                const aWasScheduled = wasAlreadyScheduled(a);
                const bWasScheduled = wasAlreadyScheduled(b);
                if (aWasScheduled && !bWasScheduled) {
                    return 1; // a comes after b
                } else if (!aWasScheduled && bWasScheduled) {
                    return -1; // a comes before b
                } else {
                    return 0; // no change in order
                }
            }).map((c) => (
              <RotationSelection
                title={c.courseNameOriginal}
                hasAlreadyScheduled={wasAlreadyScheduled(c)}
                subtitle={`${c.stafferFirstName} ${c.stafferLastName}`}
                onClick={() =>
                  onSubmit({
                    courseName: c.courseNameOriginal,
                    courseRoom: c.courseRoom,
                    periodId: classid,
                    EsCourseId: c.courseId,
                    date: c.appointmentDate,
                  })
                }
                seatsLeft={c.maxNumberStudents - c.numberOfAppointments}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RotationCard;
