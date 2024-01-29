import { Card, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Course, ScheduleListResponse } from '../types';
import { useLogin } from '../contexts/LoginContext';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface RotationCardProps {
    title: string;
    name?: string;
    room: string;
    classid: number;
    openModal: (classid: number, dayoff: number) => void;
    dayOff: number;
}

const RotationCard: React.FC<RotationCardProps> = ({ title, name: subtitle, room: name, openModal, classid, dayOff }) => {

    return (
        <>
            <Card sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <CardContent>
                    <Typography variant="h6" component="div">
                        {title}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {subtitle}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton aria-label="edit" onClick={() => openModal(classid, dayOff)}>
                        <EditIcon />
                    </IconButton>

                </CardActions>
            </Card>
        </>
    );
};

export interface CourseChange {
    courseName: string,
    courseRoom: string,
    rotationId: number,
    EsCourseId: number,
    date: string
}

interface RotationSelectModalProps {
    onClose: () => void,
    onSubmit: (change: CourseChange) => void,
    classid: number,
    datefmted: string
}

interface RotationSelectionProps {
    title: string;
    subtitle: string;
    onClick: () => void;
    seatsLeft: number;
}

const RotationSelection: React.FC<RotationSelectionProps> = ({ title, subtitle, seatsLeft, onClick}) => {

    return (
        <>
            <Card sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <CardContent>
                    <Typography variant="h6" component="div">
                        {title}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {subtitle}
                    </Typography>
                    <CardActions>
                        <Typography>seats {seatsLeft}</Typography>
                        <IconButton onClick={onClick}>
                            <CalendarTodayIcon/>
                        </IconButton>
                    </CardActions>
                </CardContent>
            </Card>
        </>
    );
};

export const RotationSelectModal: React.FC<RotationSelectModalProps> = ({ onClose, classid, datefmted, onSubmit }) => {
    const { token } = useLogin();
    const [classes, setClasses] = useState<Course[]>();

    useEffect(() => {
        axios.post('https://titanschedule.com:8533/api', {
            url: `https://studentsapi.enrichingstudents.com/v1.0/course/forstudentscheduling/${datefmted}/${classid}`,
            method: "get",
            headers: {
                esauthtoken: token
            }
        }).then(res => {
            const data: ScheduleListResponse = res.data;

            console.log(data);
            setClasses(data.courses);
        })
    }, [])


    return (
        <div className='modal'>
            <Card sx={{ width: '500px', zIndex: 500, maxHeight: '60vh', overflowY: 'auto' }}>
                <CardContent>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <Typography>Schedule A Class</Typography>
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div>
                        {classes?.map(c => (
                            <RotationSelection title={c.courseNameOriginal} subtitle={`${c.stafferFirstName} ${c.stafferLastName}`} onClick={() => onSubmit({
                                courseName: c.courseNameOriginal,
                                courseRoom: c.courseRoom,
                                rotationId: classid,
                                EsCourseId: c.courseId,
                                date: c.appointmentDate
                            })}
                            seatsLeft={c.maxNumberStudents - c.numberOfAppointments}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default RotationCard;