import { Box, Paper, Typography } from "@mui/material";

interface DailyScheduleBoxProps {
    children?: React.ReactNode;
    day: number
}

const DailyScheduleBox: React.FC<DailyScheduleBoxProps> = ({ day, children }) => {
    const dotw = ['Monday', 'Tuesday', 'Wednesday', 'Thursday']
    return (
        <Paper
            elevation={1}
            sx={{padding: '5px 20px 5px 20px', display: 'flex', alignItems: 'center', flexDirection: 'column'}}
        >
            <Typography
                variant="h4"
                component="h2"
            >{dotw[day]}</Typography>
            {children}
        </Paper>
    );
};

export default DailyScheduleBox;