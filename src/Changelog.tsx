import { Card, CardContent, Grid, Typography } from '@mui/material';
import Heading from './components/Heading';
import StarIcon from '@mui/icons-material/Star';
import CodeIcon from "@mui/icons-material/Code";

const ChangeLog: React.FC = () => {
  return (
    <>
      <Heading />
      <Grid container justifyContent={'center'}>
        <Grid item sm={10} marginTop={10}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div">
                Version 1.1.2
              </Typography>
              <Grid container marginTop={2}>
                <Grid item>
                  <StarIcon sx={{width: '30px', height: '30px'}}/>
                </Grid>
                <Grid item marginLeft={1}>
                  <Typography sx={{fontSize: '20px'}}>Release Notes</Typography>
                </Grid>
              </Grid>
              <Typography component={'ul'}>
                <li>Added Changelog Page</li>
                <li>Added Schedule Success Notification</li>
                <li>Improved visuals of Login Page</li>
                <li>Fixed bug that causes themes to be reset on page refresh</li>
                <li>Schedule class popup now has non-duplicate rotations at the top</li>
              </Typography>
              <Grid container marginTop={2}>
                <Grid item>
                  <CodeIcon sx={{width: '30px', height: '30px'}}/>
                </Grid>
                <Grid item marginLeft={1}>
                  <Typography sx={{fontSize: '20px'}}>Beta Notes</Typography>
                </Grid>
              </Grid>
              <Typography component={'ul'}>
                <li>Theme editor beta menu layout (currently non-functional)</li>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ChangeLog;
