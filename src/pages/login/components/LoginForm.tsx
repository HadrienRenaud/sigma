import React, {useState} from "react";
import {Form, Message} from "semantic-ui-react";

export interface Credentials {
    username: string,
    password: string
}

interface LoginFormProps {
    handleSubmit: (_: Credentials) => void,
    loading: boolean,
    error?: Error,
}

function LoginForm({handleSubmit, error, loading}: LoginFormProps) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <Form size='large' onSubmit={() => handleSubmit({username, password})} error={!!error}>
            <Message
                error
                header="Error"
                content={error}
            />
            <Form.Input
                fluid
                icon='user' iconPosition='left'
                placeholder='Username'
                type='text' name='userInput'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Input
                fluid
                icon='lock' iconPosition='left'
                placeholder='Mot de passe'
                type='password' name='passwordInput'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Button fluid color='blue' size='large' content="Login" loading={loading}/>
        </Form>
    )
}

export default LoginForm;
