import { Accordion, AccordionSummary, Card, CardContent, IconButton, Typography } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CourseChange, RotationSelection } from '../Rotationcard';
import { Course, ScheduleListResponse } from '../../types';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useLogin } from '../../contexts/LoginContext';
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
  const modalContainer = useRef<HTMLDivElement>(null);


  useEffect(() => {
    axios
      .post('https://titanschedule.com:8533/api', {
        url: `https://studentsapi.enrichingstudents.com/v1.0/course/forstudentscheduling/${datefmted}/${classid}`,
        method: 'get',
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

  const groupedClasses = classes?.reduce(
    (acc: { [department: string]: Course[] }, c) => {
      acc[c.departmentName] = acc[c.departmentName] || [];
      acc[c.departmentName].push(c);
      return acc;
    },
    {}
  );

  return (
    <div className="modal" ref={modalContainer}>
      <Card
        sx={{
          width: '500px',
          zIndex: 500,
          maxHeight: '65vh',
          overflowY: 'auto',
        }}
      >
        <CardContent>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Typography>Schedule A Class</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div>
            {groupedClasses && Object.entries(groupedClasses).map(
              ([departmentName, departmentClasses]) => (
                <Accordion key={departmentName} defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{departmentName}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {departmentClasses.map((c: Course) => (
                      <RotationSelection
                        key={c.courseId}
                        title={c.courseNameOriginal}
                        subtitle={`${c.stafferFirstName} ${c.stafferLastName}`}
                        onClick={() =>
                          onSubmit({
                            courseName: c.courseNameOriginal,
                            courseRoom: c.courseRoom,
                            periodId: classid, // Ensure 'classid' is defined or passed correctly
                            EsCourseId: c.courseId,
                            date: c.appointmentDate,
                          })
                        }
                        seatsLeft={c.maxNumberStudents - c.numberOfAppointments}
                        hasAlreadyScheduled={false}
                      />
                    ))}
                  </AccordionDetails>
                </Accordion>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FlexModSelectModal;
