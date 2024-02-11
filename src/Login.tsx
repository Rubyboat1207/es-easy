import {
  Button,
  Card,
  CardContent,
  Grid,
  Link,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { CredValidation, StudentCredValidation } from "./types";
import { useLogin } from "./contexts/LoginContext";
import { useNavigate } from "react-router-dom";
import Heading from "./components/Heading";
import { useNotification } from "./contexts/NotificationContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [keyProgress, setKeyProgress] = useState(0);
  const [remember, setRemember] = useState<boolean>(localStorage.getItem('remember') === 'true');

  const { setToken } = useLogin();

  const navigate = useNavigate();
  const notifs = useNotification();

  useEffect(() => {
    localStorage.setItem('remember', remember + '');
    if(remember) {
      const passwd = localStorage.getItem('password');
      const usr = localStorage.getItem('username');
      if(passwd) {
        setPassword(passwd)
      }
      if(usr) {
        setUsername(usr);
      }

      if(usr && passwd) {
        login(usr, passwd);
      }
    }
    
  }, [remember])

  async function login(username: string, password: string) {
    setIsLoggingIn(true);
    const res: CredValidation = (
      await axios.post("https://titanschedule.com:8533/api", {
        url: "https://loginapi.enrichingstudents.com/v1.0/login/validatecredential",
        payload: {
          emailAddress: username,
          passwordFromClient: password,
        },
      })
    ).data[0];

    if (res.loginStatus == 2) {
      // 	https://studentsapi.enrichingstudents.com/v1.0/login/validatetoken
      const validate: StudentCredValidation = (
        await axios.post("https://titanschedule.com:8533/api", {
          url: "https://studentsapi.enrichingstudents.com/v1.0/login/validatetoken",
          payload: {
            stringValue: res.validationToken,
          },
        })
      ).data;
      setToken(validate.authToken);

      if(remember) {
        localStorage.setItem('password', password);
        localStorage.setItem('username', username);
      }

      navigate("/app");
    }else {
      const fail_notif = notifs.addNotification({text: 'Login was unsucessful. Username or password may be wrong.', btnText: 'OK', color: 'error'});

      setTimeout(() => {
        notifs.removeNotification(fail_notif);
      }, 10000)
    }
    setIsLoggingIn(false);
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    console.log(keyProgress)
    if (keyProgress <= 1) {
      if (event.key === "ArrowUp") {
        setKeyProgress(keyProgress + 1);
      } else setKeyProgress(0);
    } else if (keyProgress <= 3) {
      if (event.key === "ArrowDown") {
        setKeyProgress(keyProgress + 1);
      } else setKeyProgress(0);
    } else if (keyProgress === 4 || keyProgress === 6) {
      if (event.key === "ArrowLeft") {
        setKeyProgress(keyProgress + 1);
      } else setKeyProgress(0);
    } else if (keyProgress === 5 || keyProgress === 7) {
      if (event.key === "ArrowRight") {
        setKeyProgress(keyProgress + 1);
      } else setKeyProgress(0);
    } else if (keyProgress === 8) {
      if (event.key === "b") {
        setKeyProgress(keyProgress + 1);
      } else setKeyProgress(0);
    } else if (keyProgress === 9) {
      if (event.key === "a") {
        setKeyProgress(-1);
        window.localStorage.setItem('winner', 'yes');
        alert('you have unlocked developer mode! use the new developer mode menu in the top right.')
        location.reload();
      } else setKeyProgress(0);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    // Removing the event listener on cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [keyProgress]);

  return (
    <>
      <Heading />
      <div
        style={{
          width: "100vw",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          marginTop: 100
        }}
      >
        <Card sx={{ maxWidth: 600 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Enriching Students Easy
            </Typography>
            <Link
              color={"secondary"}
              sx={{ fontSize: "11px", cursor: "pointer" }}
              component={"a"}
              onClick={() => navigate("/eula")}
              gutterBottom
            >
              View our Privacy Policy
            </Link>
            <Typography variant="subtitle1" gutterBottom>
              written by Rudy Soliz, a 3rd Year learner
            </Typography>
            <TextField
              label="username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  login(username, password);
                }
              }}
            />
            <Grid container flexDirection={'row'} alignItems={'center'}>
            <Switch value={remember} onChange={() => setRemember(rem => !rem)}/>
            <Typography>Remember Me</Typography>
            </Grid>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Typography>
                Data is not stored at any time during use.
              </Typography>
            </div>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                login(username, password);
              }}
              disabled={isLoggingIn}
            >
              login
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
