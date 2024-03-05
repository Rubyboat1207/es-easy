import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Input,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './ThemeModal.module.css';
import { useJSONTheme } from '../../contexts/ThemeContext';
import { ThemeObject, ThemeObjectDef } from '../../util/themes';
import { MuiColorInput } from 'mui-color-input';
import { useEffect, useState } from 'react';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { useNotification } from '../../contexts/NotificationContext';

interface ThemeModalProps {
  onClose: () => void;
}

type GymnasticsThemeObject = ThemeObject & { [key: string]: string };

const ThemeModal: React.FC<ThemeModalProps> = ({ onClose }) => {
  const { getThemeObject, setThemeJson, themeJson } = useJSONTheme();
  const { addNotification, removeNotification } = useNotification();

  const themeObject: GymnasticsThemeObject =
    getThemeObject() as unknown as GymnasticsThemeObject;
  
  const [ jsonEditorText, setJSONditorText] = useState<string>(JSON.stringify(themeObject, null, 4));

  function closeModal() {
    localStorage.setItem('custom_theme', JSON.stringify(themeObject));
    onClose();
  }

  useEffect(() => {
    if (!themeObject.is_custom) {
      setThemeJson(
        JSON.stringify(
          Object.assign(themeObject, {
            theme_name: 'My Custom Theme',
            is_custom: true,
          })
        )
      );
    }
  }, []);

  function copy() {
    navigator.clipboard.writeText(themeJson);
    let notif = addNotification({
      text: 'Copied JSON to clipboard',
      btnText: 'dismiss',
      color: 'ok',
    });

    setTimeout(() => {
      removeNotification(notif);
    }, 2000);
  }

  const RotationCard = () => {
    return (
      <div
        className={styles.day}
        style={{
          backgroundColor: themeObject.rotation_card_background_color,
        }}
      >
        <div
          className={styles.title}
          style={{ backgroundColor: themeObject.primary_text_color }}
        ></div>
        <div
          className={styles.description}
          style={{ backgroundColor: themeObject.secondary_text_color }}
        ></div>
        <div
          className={styles.description2}
          style={{ backgroundColor: themeObject.secondary_text_color }}
        ></div>
      </div>
    );
  };

  return (
    <div className="modal">
      <Card
        sx={{
          width: '95vw',
          height: '95vh',
          zIndex: 600,
          backgroundSize: 'cover',
          backgroundColor: themeObject.background_image_url ? undefined : themeObject.background_color,
          backgroundImage: themeObject.background_image_url ? `url(${themeObject.background_image_url})` : undefined,
        }}
      >
        <CardContent sx={{ height: '100%' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              backdropFilter: 'blur(20px)',
            }}
          >
            <Typography>Theme Editor</Typography>
            <Grid container item>
              <Input
                placeholder="Theme Name"
                value={themeObject.theme_name}
                sx={{ color: themeObject.primary_text_color }}
                onChange={(v) =>
                  setThemeJson(
                    JSON.stringify(
                      Object.assign(themeObject, { theme_name: v.target.value })
                    )
                  )
                }
              />
              <IconButton onClick={copy}>
                <ContentPasteIcon />
              </IconButton>
            </Grid>
            <IconButton onClick={closeModal}>
              <CloseIcon />
            </IconButton>
          </div>
          <Grid container sx={{ height: '100%' }}>
            <Grid item sm={7}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '90%',
                }}
              >
                <div className={styles.heading}></div>
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    height: '100%',
                  }}
                >
                  <div className={styles.dayViewContainer}>
                    <div
                      className={styles.dayView}
                      style={{
                        backgroundColor: themeObject.card_background_color,
                        padding: '10px 10px 10px 10px'
                      }}
                    >
                      <div
                        className={styles.title}
                        style={{
                          backgroundColor: themeObject.primary_text_color,
                        }}
                      ></div>
                      {[...Array(4)].map(() => (
                        <RotationCard />
                      ))}
                    </div>
                  </div>
                  <div className={styles.rotationSelector}></div>
                  <div
                    style={{
                      display: 'flex',
                      height: '100%',
                      justifyContent: 'space-between',
                      flexDirection: 'column',
                      width: '33%',
                    }}
                  >
                    <div className={styles.buttonContainer}>
                      <div className={styles.button}></div>
                      <div className={styles.button}></div>
                    </div>
                    <div className={styles.notificationContainer}>
                      <Typography sx={{ textAlign: 'center' }}>
                        Notifications
                      </Typography>
                      <div
                        className={styles.notification}
                        style={{
                          backgroundColor: themeObject.error_notification_color,
                        }}
                      ></div>
                      <div
                        className={styles.notification}
                        style={{
                          backgroundColor:
                            themeObject.positive_notification_color,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item sm={5} sx={{ overflowY: 'auto', height: '90%', backdropFilter: 'blur(20px)' }}>
              {Object.keys(ThemeObjectDef).map((k) => (
                <>
                  {ThemeObjectDef[k] === 'color' && (
                    <Grid container alignItems={'center'}>
                      <MuiColorInput
                        variant='outlined'
                        value={themeObject[k]}
                        format='hex'
                        onChange={(v) => {
                          setThemeJson(
                            JSON.stringify(
                              Object.assign(themeObject, { [k]: v })
                            )
                          );
                        }}
                      />
                      <Typography>{k}</Typography>
                    </Grid>
                  )}
                  {ThemeObjectDef[k] === 'string' && (
                    <>
                      <Grid container alignItems={'center'}>
                        <TextField
                        sx={{width:255}}
                          value={themeObject[k]}
                          onChange={(v) => {
                            setThemeJson(
                              JSON.stringify(
                                Object.assign(themeObject, { [k]: v.target.value })
                              )
                            );
                          }}
                        />
                        <Typography>{k}</Typography>
                      </Grid>
                    </>
                  )}
                </>
              ))}
            <TextField value={jsonEditorText} multiline onChange={e => setJSONditorText(e.target.value)} sx={{width:'100%', backgroundColor: '#000000aa'}}/>
            <Button onClick={() => setThemeJson(jsonEditorText)} variant='contained'>Update JSON</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeModal;
