import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { CredValidation, StudentCredValidation } from "./types";
import { useLogin } from "./contexts/LoginContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { setToken } = useLogin();

    const navigate = useNavigate();



    async function login() {
        console.log('eee')
        const res: CredValidation = (await axios.post('https://titanschedule.com:8533/api', {
            url: 'https://loginapi.enrichingstudents.com/v1.0/login/validatecredential',
            payload: {
                emailAddress: username,
                passwordFromClient: password
            }
        })).data[0]

        console.log(res);

        if (res.loginStatus == 2) {
            // 	https://studentsapi.enrichingstudents.com/v1.0/login/validatetoken
            const validate: StudentCredValidation = (await axios.post('https://titanschedule.com:8533/api', {
                url: "https://studentsapi.enrichingstudents.com/v1.0/login/validatetoken",
                payload: {
                    "stringValue": res.validationToken
                }
            })).data
            setToken(validate.authToken);

            navigate('/app')
        }
    }


    return (
        <div style={{ width: '100vw', height: '100vh', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Enriching Students Easy
                    </Typography>
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
                    />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
			I do not store your data.                        
                    </div>
                    <Button variant="contained" color="primary" fullWidth onClick={() => { login() }}>
                        login
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
