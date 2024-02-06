import { Card, CardContent, IconButton, Typography } from "@mui/material";
import { CourseChange, RotationSelection } from "../Rotationcard";
import { Course, ScheduleListResponse } from "../../types";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLogin } from "../../contexts/LoginContext";
import CloseIcon from '@mui/icons-material/Close';

interface FlexModSelectModalProps {
  onClose: () => void;
  onSubmit: (change: CourseChange) => void;
  classid: number;
  datefmted: string;
}

export const FlexModSelectModal: React.FC<FlexModSelectModalProps> = ({
  onClose,
  classid,
  datefmted,
  onSubmit,
}) => {
  const { token } = useLogin();
  const [classes, setClasses] = useState<Course[]>();

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

  return (
    <div className="modal">
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
            {classes?.map((c) => (
              <RotationSelection
                title={c.courseNameOriginal}
                subtitle={`${c.stafferFirstName} ${c.stafferLastName}`}
                onClick={() =>
                  onSubmit({
                    courseName: c.courseNameOriginal,
                    courseRoom: c.courseRoom,
                    rotationId: classid,
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

export default FlexModSelectModal;
