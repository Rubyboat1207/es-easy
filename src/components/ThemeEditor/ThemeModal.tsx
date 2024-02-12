import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Input,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './ThemeModal.module.css';
import { useJSONTheme } from '../../contexts/ThemeContext';
import { ThemeObject, ThemeObjectDef } from '../../util/themes';
import { MuiColorInput } from 'mui-color-input';
import { useEffect } from 'react';
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

  function closeModal() {
    localStorage.setItem('custom_theme', JSON.stringify(themeObject));
    onClose();
  }

  useEffect(() => {
    if(!themeObject.is_custom) {
      setThemeJson(JSON.stringify(Object.assign(themeObject, {theme_name: '', is_custom: true})))
    }
  }, [])

  function copy() {
    navigator.clipboard.writeText(themeJson);
    let notif = addNotification({text: "Copied JSON to clipboard", btnText: "dismiss", color: "ok"})

    setTimeout(() => {
      removeNotification(notif);
    }, 2000)
  }

  return (
    <div className="modal">
      <Card
        sx={{
          width: '95vw',
          height: '95vh',
          zIndex: 600,
          backgroundColor: themeObject.background_color,
        }}
      >
        <CardContent sx={{ height: '100%' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Typography>Theme Editor</Typography>
            <Grid container item>
              <Input
                placeholder="Theme Name"
                value={themeObject.theme_name}
                sx={{color: themeObject.primary_text_color}}
                onChange={(v) =>
                  setThemeJson(
                    JSON.stringify(
                      Object.assign(themeObject, { theme_name: v.target.value })
                    )
                  )
                }
              />
              <IconButton onClick={copy}>
                <ContentPasteIcon/>
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
                      }}
                    >
                      <div
                        className={styles.day}
                        style={{
                          backgroundColor:
                            themeObject.rotation_card_background_color,
                        }}
                      ></div>
                      <div
                        className={styles.day}
                        style={{
                          backgroundColor:
                            themeObject.rotation_card_background_color,
                        }}
                      ></div>
                      <div
                        className={styles.day}
                        style={{
                          backgroundColor:
                            themeObject.rotation_card_background_color,
                        }}
                      ></div>
                      <div
                        className={styles.day}
                        style={{
                          backgroundColor:
                            themeObject.rotation_card_background_color,
                        }}
                      ></div>
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
            <Grid item sm={5} sx={{ overflowY: 'auto', height: '90%' }}>
              {Object.keys(ThemeObjectDef).map((k) => (
                <>
                  {ThemeObjectDef[k] === 'color' && (
                    <Grid container alignItems={'center'}>
                      <MuiColorInput
                        value={themeObject[k]}
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
                </>
              ))}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeModal;
