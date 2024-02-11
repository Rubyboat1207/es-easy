import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import Heading from './components/Heading';
import StarIcon from '@mui/icons-material/Star';
import CodeIcon from '@mui/icons-material/Code';
import { useLogin } from './contexts/LoginContext';
import { useNavigate } from 'react-router-dom';

const ChangeLog: React.FC = () => {
  const { isLoggedIn } = useLogin();
  const navigate = useNavigate();

  return (
    <>
      <Heading />
      <Grid container alignItems={'center'} flexDirection={'column'}>
        <Grid item container sm={10} marginTop={10} width={'95%'} justifyContent={'center'}>
          <Button
            variant="contained"
            onClick={() => (isLoggedIn ? navigate('/app') : navigate('/'))}
          >
            {isLoggedIn ? 'Return to Schedule View' : 'Login'}
          </Button>
        </Grid>
        <Grid item sm={10} marginTop={10} width={'95%'}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div">
                Version 1.1.4
              </Typography>
              <Grid container marginTop={2}>
                <Grid item>
                  <StarIcon sx={{ width: '30px', height: '30px' }} />
                </Grid>
                <Grid item marginLeft={1}>
                  <Typography sx={{ fontSize: '20px' }}>
                    Release Notes
                  </Typography>
                </Grid>
              </Grid>
              <Typography component={'ul'}>
                <li>Most success notifications now fade out eventually</li>
                <li>Notifications now have an enter and exit animation</li>
                <li><strong>Remember me</strong> option added to login page</li>
                <li>Added failure notification to login screen</li>
                <li>(internal) Fixed semantics that caused error logs</li>
              </Typography>
              <Grid container marginTop={2}>
                <Grid item>
                  <CodeIcon sx={{ width: '30px', height: '30px' }} />
                </Grid>
                <Grid item marginLeft={1}>
                  <Typography sx={{ fontSize: '20px' }}>Beta Notes</Typography>
                </Grid>
              </Grid>
              <Typography component={'ul'}>
                <li>
                  Theme Editor
                  <ul>
                    <li>Themes now have a name by default, meaning they will not automatically show up as invisible in the selection dropdown</li>
                  </ul>
                </li>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={10} marginTop={10} width={'95%'}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div">
                Version 1.1.3
              </Typography>
              <Grid container marginTop={2}>
                <Grid item>
                  <StarIcon sx={{ width: '30px', height: '30px' }} />
                </Grid>
                <Grid item marginLeft={1}>
                  <Typography sx={{ fontSize: '20px' }}>
                    Release Notes
                  </Typography>
                </Grid>
              </Grid>
              <Typography component={'ul'}>
                <li>Added confirmation screen if you try to leave the page before you finish scheduling</li>
              </Typography>
              <Grid container marginTop={2}>
                <Grid item>
                  <CodeIcon sx={{ width: '30px', height: '30px' }} />
                </Grid>
                <Grid item marginLeft={1}>
                  <Typography sx={{ fontSize: '20px' }}>Beta Notes</Typography>
                </Grid>
              </Grid>
              <Typography component={'ul'}>
                <li>
                  Theme Editor
                  <ul>
                    <li>Theme editor accessible from beta menu</li>
                    <li>All colors can be customized</li>
                    <li>Most colors can be previewed in the preview section on the left</li>
                  </ul>
                </li>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={10} marginTop={10} width={'95%'}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div">
                Version 1.1.2
              </Typography>
              <Grid container marginTop={2}>
                <Grid item>
                  <StarIcon sx={{ width: '30px', height: '30px' }} />
                </Grid>
                <Grid item marginLeft={1}>
                  <Typography sx={{ fontSize: '20px' }}>
                    Release Notes
                  </Typography>
                </Grid>
              </Grid>
              <Typography component={'ul'}>
                <li>Added Changelog Page</li>
                <li>Added Schedule Success Notification</li>
                <li>Improved visuals of Login Page</li>
                <li>
                  Fixed bug that causes themes to be reset on page refresh
                </li>
                <li>
                  Schedule class popup now has non-duplicate rotations at the
                  top
                </li>
              </Typography>
              <Grid container marginTop={2}>
                <Grid item>
                  <CodeIcon sx={{ width: '30px', height: '30px' }} />
                </Grid>
                <Grid item marginLeft={1}>
                  <Typography sx={{ fontSize: '20px' }}>Beta Notes</Typography>
                </Grid>
              </Grid>
              <Typography component={'ul'}>
                <li>
                  Theme editor beta menu layout (currently non-functional)
                </li>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ChangeLog;
