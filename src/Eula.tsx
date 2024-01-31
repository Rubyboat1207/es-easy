import { Button, Paper, Typography } from "@mui/material";
import Heading from "./components/Heading";
import { useNavigate } from "react-router-dom";

const EulaPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Heading />
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Paper sx={{ width: "80vw", padding: "15px 15px 15px 15px" }}>
          <Typography
            variant="h4"
            component={"h1"}
            sx={{ textAlign: "center" }}
          >
            ES-Easy Privacy Policy
          </Typography>
          <br />
          <Typography variant="h5" component={"h1"} sx={{ marginBottom: 2 }}>
            1. Disclaimers
          </Typography>
          <Typography>
            ES-Easy is not affiliated with Enriching Students or Interval
            Technologies.
          </Typography>
          <Typography  sx={{ marginBottom: 2, marginTop: 2 }}>
            THIS SOFTWARE IS PROVIDED 'AS-IS', WITHOUT ANY EXPRESS OR IMPLIED
            WARRANTY.  IN NO EVENT WILL THE AUTHORS BE HELD LIABLE FOR ANY DAMAGES
            ARISING FROM THE USE OF THIS SOFTWARE.
          </Typography>
          <Typography>
            I am doing this for the sole purpose of making enriching students
            easier for Plano ISD Academy High School and nowhere else as of this
            moment. This system is not designed as a replacement for enriching
            students, it is designed to suppliment the services provided by
            Enriching Students or Interval Technologies.
          </Typography>
          <Typography>
            If you have a problem with what im doing please contact me at{" "}
            <a href="mailto:rudy@rudysoliz.com">rudy@rudysoliz.com</a>
          </Typography>
          <Typography
            variant="h5"
            component={"h1"}
            sx={{ marginBottom: 2, marginTop: 2 }}
          >
            2. Data Storage
          </Typography>
          <Typography>
            We do not intentionally store any data or logs about our users. All
            data is stored locally on the user's computer. If a third party
            requests information, none can or will be given because we dont
            store anything. Information stored locally, such as authentication,
            are removed after each session, however customization settings are
            stored between sessions.
          </Typography>
          <Typography>
            If unitentioanl data storage occurs, the data will be deleted
            immediately upon discovery. Then the data storage system will be
            removed and no additional data will be stored using this method.
          </Typography>
        </Paper>
        <Button
          onClick={() => navigate("/")}
          sx={{ marginTop: 5 }}
          variant="contained"
        >
          Back to Login
        </Button>
      </div>
    </>
  );
};

export default EulaPage;
