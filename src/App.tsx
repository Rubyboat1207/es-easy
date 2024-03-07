import React, { useEffect, useMemo, useState } from 'react';
import { Typography, IconButton, Grid, Button, Card } from '@mui/material';
import RotationCard, {
  CourseChange,
  RotationSelectModal,
} from './components/Rotationcard';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DailyScheduleBox from './components/DailyScheduleBox';
import SpinningLoader from './components/SpinningLoader';
import { useLogin } from './contexts/LoginContext';
import { useNavigate } from 'react-router-dom';
import { ScheduleView } from './types';
import axios from 'axios';
import moment from 'moment';
import { createPortal } from 'react-dom';
import { useNotification } from './contexts/NotificationContext';
import Heading from './components/Heading';
import { useSecretMode } from './contexts/SecretModeContexts';
import FlexModsContainer from './components/flexmods/FlexModsContainer';
import { CourseContextProvider } from './contexts/CourseContext';
import { getInterestingCalendarEvents } from './api/schoolwires';
import { SchoolWiresCalendarEvent } from './api/definitions';

// Usage in a main component
const App: React.FC = () => {
  const [schedule, setSchedule] = useState<
    | {
        [id: number]: (ScheduleView | null)[];
      }
    | undefined
  >();
  const [changes, setChanges] = useState<CourseChange[]>([]);
  const [weekOffset, setWeekOffset] = useState<number>(0);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalTarget, setModalTarget] = useState<number>(0); // dayOffset
  const [dayOffset, setDayOffset] = useState<number>(0);
  const [calendarEvents, setCalendarEvents] = useState<
    SchoolWiresCalendarEvent[]
  >([]);
  const { addNotification, removeNotification } = useNotification();

  const startDate = moment().startOf('isoWeek');

  const caleventmap: { [key: string]: SchoolWiresCalendarEvent[] } =
    useMemo(() => {
      return calendarEvents.reduce(
        (acc: { [key: string]: SchoolWiresCalendarEvent[] }, obj) => {
          const fmted = moment(obj.Start).format('MM-DD-YYYY');
          if (!acc[fmted]) {
            acc[fmted] = [];
          }
          acc[fmted].push(obj);
          return acc;
        },
        {}
      );
    }, [calendarEvents]);

  const isDayIdxOff = (idx: number) => {
    if (
      Object.keys(caleventmap).includes(
        startDate
          .clone()
          .add(weekOffset, 'w')
          .add(idx, 'd')
          .format('MM-DD-YYYY')
      )
    ) {
      // console.log('off on day idx ', idx);
      return true;
    }

    return false;
  };

  const shouldIncludeFriday = useMemo(() => {
    let days_off = 0;
    // console.log(caleventmap);
    // TODO add support for multiday breaks
    for (let day = 0; day < 5; day++) {
      if(isDayIdxOff(day)) {
        days_off++;
      }
    }

    // console.log(days_off >= 2);

    return days_off >= 2;
  }, [caleventmap, weekOffset]);

  const { token, isLoggedIn } = useLogin();

  // Function to handle key press
  const handleKeyPress = (event: KeyboardEvent) => {
    //console.log(`Key "${event.key}" pressed [event: keydown]`)
    if (event.key === 'Escape') {
      setModalOpen(false);
      event.preventDefault();
      event.stopPropagation();
    }
  };

  // const { showFlexModBeta } = useSecretMode();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }

    getInterestingCalendarEvents().then(setCalendarEvents);

    window.addEventListener('keydown', handleKeyPress);

    // Removing the event listener on cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const beforeUnload = (e: BeforeUnloadEvent) => {
      if (changes.length > 0) {
        e.preventDefault();
        const message = 'Save your changes before you leave the site!';
        // for chrome
        e.returnValue = message;

        return message;
      }
    };

    window.addEventListener('beforeunload', beforeUnload);

    return () => {
      window.removeEventListener('beforeunload', beforeUnload);
    };
  }, [changes]);

  useEffect(() => {
    setSchedule(undefined);
    if (isLoggedIn && caleventmap) {
      refreshSchedule();
    }
  }, [weekOffset, isLoggedIn, caleventmap]);

  const periodIdToRotationId: { [id: number]: number } = {
    4: 0,
    7: 1,
    9: 2,
    14: 3,
  };

  function refreshSchedule() {
    axios
      .post('https://titanschedule.com:8533/api', {
        url: 'https://studentsapi.enrichingstudents.com/v1.0/appointment/viewschedules',
        payload: {
          //"2024-01-29"
          appointmentDate: startDate
            .clone()
            .add(weekOffset, 'w')
            .format('YYYY-MM-DD'),
          numberOfDays: 5,
          periodId: 0,
        },
        headers: {
          esauthtoken: token,
        },
      })
      .then((res) => {
        const view: ScheduleView[] = res.data;
        const relevantItems = view.filter(
          (v) => {
            // on weeks where friday rotation
            if(shouldIncludeFriday) {
              return v.periodDescription.startsWith('Rotation');
            }

            if(v.periodDescription.startsWith('Rotation')) {
              return moment(v.appointmentDate).weekday() !== 5;
            }else if(v.periodDescription.startsWith('Flex')) {
              console.log('got here!')
              return moment(v.appointmentDate).weekday() === 5;
            }
          }
        );

        const startday = startDate.clone().add(weekOffset, 'w').dayOfYear();

        const scheduleMap: { [id: number]: (ScheduleView | null)[] } = {};

        for (const item of relevantItems) {
          const day = moment(item.appointmentDate).dayOfYear() - startday; // will always work because we dont use this on year borders
          let idx;
          // This is rotation ID agnostic, which is nice.
          if (item.periodDescription.startsWith('Rotation')) {
            idx =
              parseInt(item.periodDescription.substring('Rotation '.length)) -
              1;
          } else {
            idx =
              parseInt(item.periodDescription.substring('Flex Mod '.length)) -
              1;
          }
          if (!scheduleMap[day]) {
            // last null is unused for rotation schedule
            scheduleMap[day] = [null, null, null, null, null];
          }
          scheduleMap[day][idx] = item;
        }
        if (shouldIncludeFriday) {
          scheduleMap[4][4] = null;
        }

        console.log(scheduleMap);

        setSchedule(scheduleMap);
      });
  }

  function openModal(classid: number, dayOffset: number) {
    setModalOpen(true);
    setDayOffset(dayOffset);
    setModalTarget(classid);
  }

  function onSubmit(change: CourseChange) {
    setChanges([change, ...changes]);
    setModalOpen(false);
  }

  async function save(/*statusUpdate: (progress: number) => void*/) {
    let i = 0;
    const newChanges = [...changes];
    let failures = 0;
    const total = changes.length;
    for (const change of changes) {
      // console.log(change);
      try {
        const res = await axios.post('https://titanschedule.com:8533/api', {
          url: 'https://studentsapi.enrichingstudents.com/v1.0/appointment/save',
          payload: {
            courseId: change.EsCourseId,
            dateRequested: change.date,
            schedulerComment: '',
            periodId: change.rotationId,
          },
          headers: {
            esauthtoken: token,
          },
        });
        if (res.data.appointmentEditorResponse < 0) {
          addNotification({
            color: 'error',
            text: res.data.errorMessage
              ? res.data.errorMessage +
                ' for rotation ' +
                periodIdToRotationId[change.rotationId] +
                ' on ' +
                moment(change.date).format('M/DD')
              : 'an unknown error occured while scheduling rotation ' +
                periodIdToRotationId[change.rotationId] +
                ' on ' +
                moment(change.date).format('M/DD'),
            btnText: 'ok',
          });
          // console.log('continuing');
          failures++;
          continue;
        }
        newChanges.splice(i);
      } catch (e) {
        console.error(e);
      }

      /*statusUpdate(i++);*/
    }
    let successes = total - failures;
    if (total > 0 && successes > 0) {
      let notif: string;
      if (successes === 1 && total === 1) {
        notif = addNotification({
          color: 'ok',
          text: `Your mod was scheduled successfully!`,
          btnText: 'ok',
        });
      } else if (successes === 2 && total === 2) {
        notif = addNotification({
          color: 'ok',
          text: `Both of your mods were scheduled successfully!`,
          btnText: 'ok',
        });
      } else if (total !== successes) {
        notif = addNotification({
          color: 'ok',
          text: `${successes} out of ${total} Mods scheduled successfully!`,
          btnText: 'ok',
        });
      } else {
        notif = addNotification({
          color: 'ok',
          text: `${successes} out of ${total} Mods scheduled successfully!`,
          btnText: 'ok',
        });
      }

      setTimeout(() => {
        removeNotification(notif);
      }, 5000);
    }
    setChanges(newChanges);
    refreshSchedule();
  }

  return (
    <>
      <CourseContextProvider
        changes={changes}
        setChanges={setChanges}
        courses={schedule ? Object.values(schedule).flat(1) : []}
      >
        <Grid container spacing={2} key={0}>
          <Heading />
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            item
            xs={12}
          >
            <Card
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: changes.length > 0 ? '10px' : '25px',
                padding: '20px 20px 20px 20px',
              }}
            >
              {/* Week Navigation */}
              <IconButton onClick={() => setWeekOffset(weekOffset - 1)}>
                <ArrowBackIosNewIcon />
              </IconButton>
              <Typography variant="h4" component="div" color={'text'}>
                Week of{' '}
                {startDate.clone().add(weekOffset, 'w').format('MM/DD/YYYY')}
              </Typography>
              <IconButton onClick={() => setWeekOffset(weekOffset + 1)}>
                <ArrowForwardIosIcon />
              </IconButton>
            </Card>
          </Grid>
          {changes.length > 0 && (
            <Grid
              item
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '15px',
                marginBottom: '25px',
              }}
              xs={12}
            >
              <Button variant="contained" onClick={() => save()}>
                Save Changes
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setChanges([])}
              >
                Cancel All Changes
              </Button>
            </Grid>
          )}
          <div
            style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          >
            <Grid container spacing={2} sx={{ width: '95vw' }}>
              {!schedule
                ? [...Array(shouldIncludeFriday ? 5 : 4)].map((_, index) => (
                    <>
                    {isDayIdxOff(index) ||
                    <Grid item xs={12} sm={6} md={true} key={index}>
                      <DailyScheduleBox
                        day={index}
                        dayOfTheMonth={startDate
                          .clone()
                          .add(weekOffset, 'w')
                          .add(index, 'd')
                          .date()}
                      >
                        <SpinningLoader />
                      </DailyScheduleBox>
                    </Grid>}
                    </>
                  ))
                : [...Array(shouldIncludeFriday ? 5 : 4)].map((_, index) => {
                    const day = schedule[index];
                    // console.log(day);
                    if(isDayIdxOff(index)) {
                      return;
                    }
                    return (
                      <Grid item xs={12} sm={6} md={true} key={index}>
                        <DailyScheduleBox
                          day={index}
                          dayOfTheMonth={startDate
                            .clone()
                            .add(weekOffset, 'w')
                            .add(index, 'd')
                            .date()}
                        >
                          {day[0] && (
                            <RotationCard
                              title="Rotation 1"
                              name={day[0].courseName || 'not scheduled'}
                              room={day[0].courseRoom || ''}
                              openModal={openModal}
                              classid={day[0].periodId}
                              dayOff={index}
                              key={0}
                            />
                          )}
                          {day[1] && (
                            <RotationCard
                              title="Rotation 2"
                              name={day[1].courseName || 'not scheduled'}
                              room={day[1].courseRoom || ''}
                              openModal={openModal}
                              classid={day[1].periodId}
                              dayOff={index}
                              key={1}
                            />
                          )}
                          {day[2] && (
                            <RotationCard
                              title="Rotation 3"
                              name={day[2].courseName || 'not scheduled'}
                              room={day[2].courseRoom || ''}
                              openModal={openModal}
                              classid={day[2].periodId}
                              dayOff={index}
                              key={2}
                            />
                          )}
                          {day[3] && (
                            <RotationCard
                              title="Rotation 4"
                              name={day[3].courseName || 'not scheduled'}
                              room={day[3].courseRoom || ''}
                              openModal={openModal}
                              classid={day[3].periodId}
                              dayOff={index}
                              key={3}
                            />
                          )}
                          {day[4] && (
                            <RotationCard
                              title="Rotation 4"
                              name={day[4].courseName || 'not scheduled'}
                              room={day[4].courseRoom || ''}
                              openModal={openModal}
                              classid={day[4].periodId}
                              dayOff={index}
                              key={3}
                            />
                          )}
                        </DailyScheduleBox>
                      </Grid>
                    );
                  })}
            </Grid>
          </div>
        </Grid>
        {!shouldIncludeFriday && !isDayIdxOff(4) && (
          <FlexModsContainer
            coursesList={schedule}
            setChanges={setChanges}
            date={startDate.clone().add(weekOffset, 'w').add(4, 'd')}
            key={1}
          />
        )}
        {modalOpen &&
          createPortal(
            <RotationSelectModal
              onClose={() => setModalOpen(false)}
              onSubmit={onSubmit}
              classid={modalTarget}
              datefmted={startDate
                .clone()
                .add(weekOffset, 'w')
                .add(dayOffset, 'd')
                .format('YYYY-MM-DD')}
              key={3}
            />,
            document.body
          )}
      </CourseContextProvider>
    </>
  );
};

export default App;
