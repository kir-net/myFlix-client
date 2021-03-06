import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './login-view.scss';
import axios from 'axios';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // Declare hook for each input
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    

    // Validate user inputs
    const validate = () => {
        let isReq = true;
        if (!username) {
        setUsernameErr('Username Required');
        isReq = false;
        } else if (username.length < 2) {
        setUsernameErr('Username must be at least 5 characters long');
        isReq = false;
        }
        if (!password) {
        setPasswordErr('Password Required');
        isReq = false;
        } else if (password.length < 6) {
        setPasswordErr('Password must be at least 6 characters long');
        isReq = false;
        }
        return isReq; 
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
        /* Send a request to the server for authentication */
        axios.post('https://flix-db-823.herokuapp.com/login', {
            Username: username,
            Password: password
        })
            .then(response => {
            const data = response.data;
            props.onLoggedIn(data);
            })
            .catch(e => {
            console.log('no such user')
            });
        }
    };

    return (
        <Form className="login-form">
            <Form.Group className="mb-4" controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
                {/* code added here to display validation error */}
                {usernameErr && <p>{usernameErr}</p>}
            </Form.Group>

            <Form.Group className="mb-5" controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                {/* code added here to display validation error */}
                {passwordErr && <p>{passwordErr}</p>}
            </Form.Group>
            <Button variant="warning" type="submit" onClick={handleSubmit}>
                Log In
            </Button>
        </Form>
    );
}