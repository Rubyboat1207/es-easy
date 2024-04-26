import { Card, Grid, Typography } from "@mui/material";
import { ScheduleView } from "../../types";
import { CourseChange } from "../Rotationcard";
import FlexMod from "./FlexMod";
import { useCourseContextProvider } from "../../contexts/CourseContext";

interface FlexModsProps {
  coursesList:
    | {
        [id: number]: (ScheduleView | null)[];
      }
    | undefined;
  setChanges: React.Dispatch<React.SetStateAction<CourseChange[]>>;
  date: moment.Moment;
}

const FlexModsContainer: React.FC<FlexModsProps> = ({
  coursesList,
  setChanges,
  date,
}) => {
  const {changes} = useCourseContextProvider()


  return (
    <>
      <div
        style={{
          marginTop: 20,
          marginBottom: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flexDirection: "column",
        }}
      >
        <Grid item>
          <Card
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "50px",
              padding: "20px 20px 20px 20px",
            }}
          >
            <Typography variant="h4" component="div" color={"text"}>
              Flex Mod Friday
            </Typography>
          </Card>
        </Grid>
        <Grid
          container
          spacing={2}
          
          sx={{
            width: "90%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {coursesList
            ? coursesList[4].map((c, idx) => {
              const override = changes.find(
                (change) =>
                  change.date == c?.appointmentDate &&
                  change.periodId == c?.periodId
              );
              
              return (
                <FlexMod
                  courseName={override?.courseName || c?.courseName || ""}
                  courseRoom={override?.courseRoom || c?.courseRoom || ""}
                  formatted_date={
                    c?.appointmentDate || date.format("YYYY-MM-DD")
                  }
                  periodId={c?.periodId || 16 + idx}
                  index={idx}
                  setChanges={setChanges}
                  key={idx}
                  highlighted={override != null}
                />
              )})
            : [...Array(5)].map((_, idx) => (
                <FlexMod
                  courseName={"Not Scheduled"}
                  courseRoom={""}
                  formatted_date={date.format("YYYY-MM-DD")}
                  periodId={16 + idx}
                  index={idx}
                  setChanges={setChanges}
                  key={idx}
                />
              ))}
        </Grid>
      </div>
    </>
  );
};

export default FlexModsContainer;
