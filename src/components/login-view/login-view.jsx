import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap/';

import './login-view.scss';

export function LoginView(props) {
    // useState() creates a local state and preserves it between the render cycles
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    // Declare hook for each input
    const [ usernameErr, setUsernameErr ] = useState('');
    const [ passwordErr, setPasswordErr ] = useState('');

    // validate user inputs
    const validate = () => {
        let isReq = true;
        if(!username){
            setUsernameErr('Username Required');
            isReq = false;
        }else if(username.length < 2){
            setUsernameErr('Username must be 2 characters long');
            isReq = false;
        }
        if(!password){
            setPasswordErr('Password Required');
            isReq = false;
        }else if(password.length < 6){
        setPassword('Password must be 6 characters long');
        isReq = false;
        }
        return isReq;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if(isReq) {
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
        };

    return (
        <Form>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter username" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                />
                {/* display validation error */} 
                {usernameErr && <p>{usernameErr}</p>}
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                />
                {/* display validation error */} 
                {passwordErr && <p>{passwordErr}</p>}
            </Form.Group>
            <Button 
                variant="primary" 
                type="submit" 
                onClick={handleSubmit}
            >Submit</Button>
        </Form>
        )
    }
}

/*  -- specifyPropTypes: -- */
LoginView.propTypes = {
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
    })
}