import { Grid, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import FlexModCard from "./FlexModCard";
import React from "react";
import { CourseChange } from "../Rotationcard";
import { useJSONTheme } from "../../contexts/ThemeContext";

interface FlexModProperties {
  courseName: string,
  courseRoom: string,
  periodId: number,
  formatted_date: string,
  index: number,
  setChanges: React.Dispatch<React.SetStateAction<CourseChange[]>>,
  highlighted?: boolean
}

const FlexMod: React.FC<FlexModProperties> = ({courseName, courseRoom, periodId, formatted_date, index, setChanges, highlighted}) => {

  return (
    <Grid item xs={12} sm={5} md={true} >
    <Paper
      elevation={1}
      sx={{
        padding: "0px 20px 10px 20px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        sx={{ textAlign: "center", mb: 2 }}
      >
        Flex Mod {index + 1}
      </Typography>
      <FlexModCard
        title={courseName || "not scheduled"}
        room={courseRoom || ""}
        periodid={periodId || -1}
        formatted_date={formatted_date || ''}
        setChanges={setChanges}
        highlighted={highlighted}
      />
    </Paper>
    </Grid>
  );
};

export default FlexMod;