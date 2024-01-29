import React, { useEffect, useRef, useState } from "react";
import {
  Typography,
  IconButton,
  Grid,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { AccountCircle as AccountCircleIcon } from "@mui/icons-material";
import RotationCard, {
  CourseChange,
  RotationSelectModal,
} from "./components/Rotationcard";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DailyScheduleBox from "./components/DailyScheduleBox";
import SpinningLoader from "./components/SpinningLoader";
import { useLogin } from "./contexts/LoginContext";
import { useNavigate } from "react-router-dom";
import { ScheduleView } from "./types";
import axios from "axios";
import moment from "moment";
import { createPortal } from "react-dom";
import { useNotification } from "./contexts/NotificationContext";

// Usage in a main component
const App: React.FC = () => {
  const [schedule, setSchedule] = useState<{
    [id: number]: (ScheduleView | null)[];
  }>();
  const [changes, setChanges] = useState<CourseChange[]>([]);
  const [weekOffset, setWeekOffset] = useState<number>(0);
  const navigate = useNavigate();
  const [modalOpen, setOpen] = useState<boolean>(false);
  const [modalTarget, setModalTarget] = useState<number>(0); // dayOffset
  const [dayOffset, setDayOffset] = useState<number>(0);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const { addNotification } = useNotification();

  const startDate = moment().startOf("isoWeek");

  const { token, isLoggedIn } = useLogin();

  console.log(isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      refreshSchedule();
    }
  }, [weekOffset, isLoggedIn]);

  const periodIdToRotationId: { [id: number]: number } = {
    4: 0,
    6: 1,
    7: 2,
    9: 3,
  };

  function refreshSchedule() {
    axios
      .post("https://titanschedule.com:8533/api", {
        url: "https://studentsapi.enrichingstudents.com/v1.0/appointment/viewschedules",
        payload: {
          //"2024-01-29"
          appointmentDate: startDate
            .clone()
            .add(weekOffset, "w")
            .format("YYYY-MM-DD"),
          numberOfDays: 5,
          periodId: 0,
        },
        headers: {
          esauthtoken: token,
        },
      })
      .then((res) => {
        const view: ScheduleView[] = res.data;
        const relevantItems = view.filter((v) =>
          v.periodDescription.startsWith("Rotation")
        );

        const startday = startDate.clone().add(weekOffset, "w").dayOfYear();

        const scheduleMap: { [id: number]: (ScheduleView | null)[] } = {};

        for (const item of relevantItems) {
          const day = moment(item.appointmentDate).dayOfYear() - startday; // will always work because we dont use this on year borders
          if (!scheduleMap[day]) {
            scheduleMap[day] = [null, null, null, null];
          }
          scheduleMap[day][
            parseInt(item.periodDescription.substring("Rotation ".length)) - 1
          ] = item;
        }

        setSchedule(scheduleMap);
      });
  }

  function openModal(classid: number, dayOffset: number) {
    setOpen(true);
    setDayOffset(dayOffset);
    setModalTarget(classid);
  }

  function onSubmit(change: CourseChange) {
    setChanges([change, ...changes]);
    setOpen(false);
  }

  async function save(/*statusUpdate: (progress: number) => void*/) {
    let i = 0;
    const newChanges = [...changes];
    for (const change of changes) {
      console.log(change);
      try {
        const res = await axios.post("https://titanschedule.com:8533/api", {
          url: "https://studentsapi.enrichingstudents.com/v1.0/appointment/save",
          payload: {
            courseId: change.EsCourseId,
            dateRequested: change.date,
            schedulerComment: "",
            periodId: change.rotationId,
          },
          headers: {
            esauthtoken: token,
          },
        });
        if (res.data.appointmentEditorResponse < 0) {
          addNotification({
            color: "error",
            text: res.data.errorMessage
              ? res.data.errorMessage +
                " for rotation " +
                (periodIdToRotationId[change.rotationId] + 1) + " on " + moment(change.date).format('M/DD')
              : "an unknown error occured while scheduling rotation " +
                (periodIdToRotationId[change.rotationId] + 1) + " on " + moment(change.date).format('M/DD'),
            btnText: "ok",
          });
          console.log('continuing')
          continue;
        }
        newChanges.splice(i);
      } catch (e) {
        console.error(e);
      }

      /*statusUpdate(i++);*/
    }
    setChanges(newChanges);
    refreshSchedule();
  }

  const anchorElement = useRef<any>();

  return (
    <>
      <Grid container spacing={2}>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
          item
          xs={12}
        >
          {/* Theme and Login Icons */}
          {/* <ThemeSelect /> */}
          <IconButton
            onClick={() => setProfileOpen(!profileOpen)}
            ref={anchorElement}
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            open={profileOpen}
            onClose={() => setProfileOpen(false)}
            anchorEl={anchorElement.current}
          >
            <MenuItem
              onClick={() => {
                sessionStorage.clear();
                navigate("/");
              }}
            >
              Logout
            </MenuItem>
            <MenuItem
              onClick={() =>
                alert(
                  "click on the edit buttons to open a window that lets you select from avaliable classes. when you're done, click the Save Changes button."
                )
              }
            >
              Help
            </MenuItem>
          </Menu>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "7px",
          }}
          item
          xs={12}
        >
          {/* Week Navigation */}
          <IconButton onClick={() => setWeekOffset(weekOffset - 1)}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography variant="h4" component="h2" sx={{ color: "white" }}>
            Week of{" "}
            {startDate.clone().add(weekOffset, "w").format("MM/DD/YYYY")}
          </Typography>
          <IconButton onClick={() => setWeekOffset(weekOffset + 1)}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Grid>
        {changes.length > 0 && (
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "15px",
              marginBottom: "25px",
            }}
            xs={12}
          >
            <Button variant="contained" onClick={() => save()}>
              Save Changes
            </Button>
            <Button variant="contained" onClick={() => setChanges([])}>
              Cancel All Changes
            </Button>
          </Grid>
        )}
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Grid container spacing={2} sx={{ width: "95vw" }}>
            {!schedule
              ? [...Array(4)].map((_, index) => (
                  <Grid item xs={12} sm={6} md={true} key={index}>
                    <DailyScheduleBox day={index}>
                      <SpinningLoader />
                    </DailyScheduleBox>
                  </Grid>
                ))
              : [...Array(4)].map((_, index) => {
                  const day = schedule[index];
                  return (
                    <Grid item xs={12} sm={6} md={true} key={index}>
                      <DailyScheduleBox day={index}>
                        {day[0] && (
                          <RotationCard
                            title="Rotation 1"
                            name={day[0].courseName || "not scheduled"}
                            room={day[0].courseRoom || ""}
                            openModal={openModal}
                            classid={day[0].periodId}
                            dayOff={index}
                          />
                        )}
                        {day[1] && (
                          <RotationCard
                            title="Rotation 2"
                            name={day[1].courseName || "not scheduled"}
                            room={day[1].courseRoom || ""}
                            openModal={openModal}
                            classid={day[1].periodId}
                            dayOff={index}
                          />
                        )}
                        {day[2] && (
                          <RotationCard
                            title="Rotation 3"
                            name={day[2].courseName || "not scheduled"}
                            room={day[2].courseRoom || ""}
                            openModal={openModal}
                            classid={day[2].periodId}
                            dayOff={index}
                          />
                        )}
                        {day[3] && (
                          <RotationCard
                            title="Rotation 4"
                            name={day[3].courseName || "not scheduled"}
                            room={day[3].courseRoom || ""}
                            openModal={openModal}
                            classid={day[3].periodId}
                            dayOff={index}
                          />
                        )}
                      </DailyScheduleBox>
                    </Grid>
                  );
                })}
          </Grid>
        </div>
      </Grid>
      {modalOpen &&
        createPortal(
          <RotationSelectModal
            onClose={() => setOpen(false)}
            onSubmit={onSubmit}
            classid={modalTarget}
            datefmted={startDate
              .clone()
              .add(weekOffset, "w")
              .add(dayOffset, "d")
              .format("YYYY-MM-DD")}
          />,
          document.body
        )}
    </>
  );
};

export default App;
