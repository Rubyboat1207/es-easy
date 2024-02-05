import { Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import FlexModCard from "./FlexModCard";
import React from "react";
import { ScheduleView } from "../../types";

interface FlexModProperties {
  course: ScheduleView | null
  index: number
}

const FlexMod: React.FC<FlexModProperties> = ({course, index}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      elevation={1}
      sx={{
        padding: "0px 20px 10px 20px",
        width: isSmallScreen ? undefined : "15%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        // marginTop: isSmallScreen,
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
        title={course?.courseName || "not scheduled"}
        room={course?.courseRoom || ""}
      />
    </Paper>
  );
};

export default FlexMod;