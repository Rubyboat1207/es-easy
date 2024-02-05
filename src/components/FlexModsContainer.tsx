import {
  Card,
  Grid,
  Typography,
} from "@mui/material";
import { ScheduleView } from "../types";
import { CourseChange } from "./Rotationcard";
import FlexMod from "./flexmods/FlexMod";

interface FlexModsProps {
  coursesList:
    | {
        [id: number]: (ScheduleView | null)[];
      }
    | undefined;
  setChanges: React.Dispatch<React.SetStateAction<CourseChange[]>>;
}

const FlexModsContainer: React.FC<FlexModsProps> = ({
  coursesList,
  // setChanges,
}) => {
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
              Flex Mod Friday (Read Only)
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
            ? coursesList[4].map((c, idx) => (
              <FlexMod course={c} index={idx}/>
              ))
            : [...Array(5)].map((_, idx) => (
                <FlexMod course={null} index={idx}/>
              ))}
        </Grid>
      </div>
    </>
  );
};

export default FlexModsContainer;
