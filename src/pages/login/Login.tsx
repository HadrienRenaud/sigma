import React, {useContext, useState} from 'react';
import LoginLayout from "./components/LoginLayout";
import LoginForm, {Credentials} from "./components/LoginForm";
import {API_URL} from "../../constants/config";
import UserContext from '../../components/UserContext/context';

export interface LoginProps {
    onLoggedIn?: (uid: string) => void,
}

function LoginSubmitter({onLoggedIn}: LoginProps) {
    const [error, setError] = useState<Error>();
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = (credentials: Credentials) => {
        setLoading(true);
        const loginRequest = fetch(API_URL + '/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials),
            credentials: 'include',
        });
        loginRequest
            .then(data => data.json())
            .then((data) => {
                console.log("Answer :", data.message);
                if (data.authSucceeded && onLoggedIn) {
                    onLoggedIn(credentials.username);
                } else {
                    setError(data.message);
                    setLoading(false);
                }
            });
    };

    return (
        <LoginLayout>
            <LoginForm loading={loading} error={error} handleSubmit={handleSubmit}/>
        </LoginLayout>
    );
}

function Login() {
    const {setUid} = useContext(UserContext);

    return (
        <LoginSubmitter
            onLoggedIn={(uid) => {
                setUid && setUid(uid);
            }}
        />
    )
}

export default Login;
