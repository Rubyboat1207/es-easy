import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import Heading from './components/Heading';
import StarIcon from '@mui/icons-material/Star';
import CodeIcon from '@mui/icons-material/Code';
import { useLogin } from './contexts/LoginContext';
import { useNavigate } from 'react-router-dom';
import { useJSONTheme } from './contexts/ThemeContext';

const ChangeLog: React.FC = () => {
  const { isLoggedIn } = useLogin();
  const navigate = useNavigate();
  const { getThemeObject } = useJSONTheme();

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
                Version 1.4.3
              </Typography>
              <Typography color={getThemeObject().secondary_text_color}>
                4/26/24
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
              <Typography component={'ul'} className='list-disc'>
              <li>Mobile is no longer broken for the share modal</li>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={10} marginTop={10} width={'95%'}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div">
                Version 1.4.2
              </Typography>
              <Typography color={getThemeObject().secondary_text_color}>
                4/25/24
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
              <Typography component={'ul'} className='list-disc'>
              <li>Share Modal has been modified to be more user friendly</li>
              <li>Share Modal has been given a tutorial and disclaimer</li>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={10} marginTop={10} width={'95%'}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div">
                Version 1.4.1
              </Typography>
              <Typography color={getThemeObject().secondary_text_color}>
                4/25/24
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
              <Typography component={'ul'} className='list-disc'>
              <li>Share Modal has been modified to add mobile support</li>
              <li>Share Modal was given extra options for course sharing like: 
                <ul className='list-disc ml-4'>
                <li>Sharing All Courses (default)</li>
                <li>Sharing Only rotations</li>
                <li>Sharing Only flex mods</li>
                <li>Sharing Only today's mods</li>
                </ul>
              </li>
              <li>Flex mod changes now show up highlighted, where previously this feature was bugged</li>
              <li>Fixed list items not correctly displaying in changelog</li>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={10} marginTop={10} width={'95%'}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div">
                Version 1.4 - Sharing is Caring Update
              </Typography>
              <Typography color={getThemeObject().secondary_text_color}>
                4/25/24
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
              <Typography component={'ul'} className='list-disc'>
              <li>A new share button has been added to the "Week Of" banner</li>
              <li>Share Modal has been added</li>
              <li>Share codes have been added</li>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={10} marginTop={10} width={'95%'}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div">
                Version 1.3.1
              </Typography>
              <Typography color={getThemeObject().secondary_text_color}>
                4/24/24
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
              <Typography component={'ul'} className='list-disc'>
              <li>To-be-Scheduled classes now show up highlighted in place of a "not scheduled" text.</li>
              <li>Themes now have a new "highlighted text" color property</li>
                <li>Reintroduced clicking off modals to close them, rather than only being able to close using the close button</li>
              </Typography>
              <Grid container marginTop={2}>
                <Grid item>
                  <CodeIcon sx={{ width: '30px', height: '30px' }} />
                </Grid>
                <Grid item marginLeft={1}>
                  <Typography sx={{ fontSize: '20px' }}>Beta Notes</Typography>
                </Grid>
              </Grid>
              <Typography component={'ul'} className='list-disc'>
                <li>
                  Theme Editor
                  <ul className='list-disc ml-4'>
                    <li>Added highlited text color property to theme editor</li>
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
                Version 1.3.0
              </Typography>
              <Typography color={getThemeObject().secondary_text_color}>
                3/7/24
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
              <Typography component={'ul'} className='list-disc'>
                <li>Added the flex mod beta to be in the release!</li>
                <ul className='list-disc ml-4'>
                  <li>Flex mods a re now grouped by category.</li>
                </ul>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={10} marginTop={10} width={'95%'}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div">
                Version 1.2.3
              </Typography>
              <Typography color={getThemeObject().secondary_text_color}>
                3/6/24
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
              <Typography component={'ul'} className='list-disc'>
              <li>Removed clicking off schedule modal</li>
              </Typography>
              <Grid container marginTop={2}>
                <Grid item>
                  <CodeIcon sx={{ width: '30px', height: '30px' }} />
                </Grid>
                <Grid item marginLeft={1}>
                  <Typography sx={{ fontSize: '20px' }}>Beta Notes</Typography>
                </Grid>
              </Grid>
              <Typography component={'ul'} className='list-disc'>
                <li>
                  Theme Editor
                  <ul className='list-disc ml-4'>
                    <li>Added feedback for when you copy the theme json to clipboard</li>
                    <li>Added JSON theme editor (unstable) (here be dragons!)</li>
                    <li>Added support for image backgrounds</li>
                    <li>Backgrounds now work correctly in theme editor</li>
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
                Version 1.2.2
              </Typography>
              <Typography color={getThemeObject().secondary_text_color}>
                2/21/24
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
              <Typography component={'ul'} className='list-disc'>
              <li>Fixed bug where two <strong>Rotation 4</strong>s would show up on friday rotations (last fix didnt work in all cases)</li>
              <li>Fixed visual bug where all <strong>Friday Rotations</strong> are marked as not scheduled when refreshed.</li>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={10} marginTop={10} width={'95%'}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div">
                Version 1.2.1
              </Typography>
              <Typography color={getThemeObject().secondary_text_color}>
                2/19/24
              </Typography>
              <Grid container marginTop={2}>
                <Grid item>
                  <CodeIcon sx={{ width: '30px', height: '30px' }} />
                </Grid>
                <Grid item marginLeft={1}>
                  <Typography sx={{ fontSize: '20px' }}>Beta Notes</Typography>
                </Grid>
              </Grid>
              <Typography component={'ul'} className='list-disc'>
                <li>Friday flex mods are hidden on days with a friday rotation</li>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={10} marginTop={10} width={'95%'}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div">
                Version 1.2.0
              </Typography>
              <Typography color={getThemeObject().secondary_text_color}>
                2/19/24
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
              <Typography component={'ul'} className='list-disc'>
                <li>Added support for Holidays</li>
                <li>Added support for Friday Rotations if there are more than 2 days missing in a given week</li>
              </Typography>
              <Grid container marginTop={2}>
                <Grid item>
                  <CodeIcon sx={{ width: '30px', height: '30px' }} />
                </Grid>
                <Grid item marginLeft={1}>
                  <Typography sx={{ fontSize: '20px' }}>Beta Notes</Typography>
                </Grid>
              </Grid>
              <Typography component={'ul'} className='list-disc'>
              <li>Friday flex mods are hidden on days with a friday rotation</li>
              <li>Friday flex mods are hidden on days where friday is a missing day.</li>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={10} marginTop={10} width={'95%'}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div">
                Version 1.1.6 (HOTFIX)
              </Typography>
              <Typography color={getThemeObject().secondary_text_color}>
                2/12/24
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
              <Typography component={'ul'} className='list-disc'>
                <li>Fixed Rotation IDs</li>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={10} marginTop={10} width={'95%'}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div">
                Version 1.1.5
              </Typography>
              <Typography color={getThemeObject().secondary_text_color}>
                2/12/24
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
              <Typography component={'ul'} className='list-disc'>
              <li>Fixed bug where Rotation error messages would show the wrong rotation.</li>
              <li>Fixed bug where certain elements would render over popups</li>
              <li>Internal Refactoring</li>
              </Typography>
              <Grid container marginTop={2}>
                <Grid item>
                  <CodeIcon sx={{ width: '30px', height: '30px' }} />
                </Grid>
                <Grid item marginLeft={1}>
                  <Typography sx={{ fontSize: '20px' }}>Beta Notes</Typography>
                </Grid>
              </Grid>
              <Typography component={'ul'} className='list-disc'>
                <li>
                  Theme Editor
                  <ul className='list-disc ml-4'>
                    <li>You can now copy the the theme JSON to your clipboard.</li>
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
                Version 1.1.4
              </Typography>
              <Typography color={getThemeObject().secondary_text_color}>
                2/10/24
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
              <Typography component={'ul'} className='list-disc'>
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
              <Typography component={'ul'} className='list-disc'>
                <li>
                  Theme Editor
                  <ul className='list-disc ml-4'>
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
              <Typography component={'ul'} className='list-disc'>
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
              <Typography component={'ul'} className='list-disc'>
                <li>
                  Theme Editor
                  <ul className='list-disc ml-4'>
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
              <Typography component={'ul'} className='list-disc'>
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
              <Typography component={'ul'} className='list-disc'>
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
