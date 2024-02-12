import React, { useEffect, useState } from "react";
import { Typography, IconButton, Grid, Button, Card } from "@mui/material";
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
import Heading from "./components/Heading";
import { useSecretMode } from "./contexts/SecretModeContexts";
import FlexModsContainer from "./components/flexmods/FlexModsContainer";
import { CourseContextProvider } from "./contexts/ChangelogContext";

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
  const { addNotification } = useNotification();

  const startDate = moment().startOf("isoWeek");

  const { token, isLoggedIn } = useLogin();

  // Function to handle key press
  const handleKeyPress = (event: KeyboardEvent) => {
    //console.log(`Key "${event.key}" pressed [event: keydown]`)
    if (event.key === "Escape") {
      setModalOpen(false);
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const { showFlexModBeta } = useSecretMode();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }

    

    window.addEventListener("keydown", handleKeyPress);

    // Removing the event listener on cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const beforeUnload = (e: BeforeUnloadEvent) => {
      if(changes.length > 0) {
        e.preventDefault();
        const message = 'Save your changes before you leave the site!';
        // for chrome
        e.returnValue = message;

        return message;
      }
    }

    window.addEventListener('beforeunload', beforeUnload);

    return (() => {
      window.removeEventListener('beforeunload', beforeUnload);
    })
  }, [changes])

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
        const relevantItems = view.filter(
          (v) =>
            v.periodDescription.startsWith("Rotation") ||
            (v.periodDescription.startsWith("Flex Mod") &&
              moment(v.appointmentDate).weekday() === 5)
        );

        const startday = startDate.clone().add(weekOffset, "w").dayOfYear();

        const scheduleMap: { [id: number]: (ScheduleView | null)[] } = {};

        for (const item of relevantItems) {
          const day = moment(item.appointmentDate).dayOfYear() - startday; // will always work because we dont use this on year borders
          let idx;
          if (item.periodDescription.startsWith("Rotation")) {
            idx =
              parseInt(item.periodDescription.substring("Rotation ".length)) -
              1;
          } else {
            idx =
              parseInt(item.periodDescription.substring("Flex Mod ".length)) -
              1;
          }
          if (!scheduleMap[day]) {
            // last null is unused for rotation schedule
            scheduleMap[day] = [null, null, null, null, null];
          }
          scheduleMap[day][idx] = item;
        }

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
                (periodIdToRotationId[change.rotationId]) +
                " on " +
                moment(change.date).format("M/DD")
              : "an unknown error occured while scheduling rotation " +
                (periodIdToRotationId[change.rotationId]) +
                " on " +
                moment(change.date).format("M/DD"),
            btnText: "ok",
          });
          console.log("continuing");
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
      if(successes === 1 && total === 1) {
        addNotification({
          color: "ok",
          text: `Your mod was scheduled successfully!`,
          btnText: "ok",
        });
      }else if(successes === 2 && total === 2) {
        addNotification({
          color: "ok",
          text: `Both of your mods were scheduled successfully!`,
          btnText: "ok",
        });
      } else if(total !== successes) {
        addNotification({
          color: "ok",
          text: `${successes} out of ${total} Mods scheduled successfully!`,
          btnText: "ok",
        });
      }else {
        addNotification({
          color: "ok",
          text: `${successes} out of ${total} Mods scheduled successfully!`,
          btnText: "ok",
        });
      }
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
        <Grid container spacing={2}>
          <Heading />
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            item
            xs={12}
          >
            <Card
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: changes.length > 0 ? "10px" : "25px",
                padding: "20px 20px 20px 20px",
              }}
            >
              {/* Week Navigation */}
              <IconButton onClick={() => setWeekOffset(weekOffset - 1)}>
                <ArrowBackIosNewIcon />
              </IconButton>
              <Typography variant="h4" component="div" color={"text"}>
                Week of{" "}
                {startDate.clone().add(weekOffset, "w").format("MM/DD/YYYY")}
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
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Grid container spacing={2} sx={{ width: "95vw" }}>
              {!schedule
                ? [...Array(4)].map((_, index) => (
                    <Grid item xs={12} sm={6} md={true} key={index}>
                      <DailyScheduleBox
                        day={index}
                        dayOfTheMonth={startDate
                          .clone()
                          .add(weekOffset, "w")
                          .add(index, "d")
                          .date()}
                      >
                        <SpinningLoader />
                      </DailyScheduleBox>
                    </Grid>
                  ))
                : [...Array(4)].map((_, index) => {
                    const day = schedule[index];
                    // console.log(day);
                    return (
                      <Grid item xs={12} sm={6} md={true} key={index}>
                        <DailyScheduleBox
                          day={index}
                          dayOfTheMonth={startDate
                            .clone()
                            .add(weekOffset, "w")
                            .add(index, "d")
                            .date()}
                        >
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
        {showFlexModBeta && (
          <FlexModsContainer
            coursesList={schedule}
            setChanges={setChanges}
            date={startDate.clone().add(weekOffset, "w").add(4, "d")}
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
                .add(weekOffset, "w")
                .add(dayOffset, "d")
                .format("YYYY-MM-DD")}
            />,
            document.body
          )}
      </CourseContextProvider>
    </>
  );
};

export default App;
