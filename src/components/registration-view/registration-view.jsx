import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Row, Col, Button, Container, Form } from 'react-bootstrap/';

import './registration-view.scss';

export function RegistrationView(props) {
    // useState() creates a local state and preserves it between the render cycles
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [email, setEmail]         = useState('');
    const [birthday, setBirthday]   = useState('');
    // Declare hook for each input
    const [values, setValues] = useState({
        usernameErr: '',
        passwordErr: '',
        emailErr:    '',
    });

    // validate user inputs
    const validate = () => {
        let isReq = true;
        if (!username) {
            setValues({ ...values, usernameErr: 'Username required' });
            isReq = false;
        } else if (username.length < 2) {
            setValues({...values, usernameErr: 'Username must be at least 2 characters long'});
            isReq = false;
        }
        if (!password) {
            setValues({ ...values, passwordErr: 'Password required' });
            isReq = false;
        } else if (password.length < 6) {
            setValues({...values, passwordErr: 'Password must be at least 6 characters long'});
            isReq = false;
        }
        if (!email) {
            setValues({ ...values, emailErr: 'Email required' });
            isReq = false;
        } else if (email.indexOf('@')===-1) {
            setValues({ ...values, emailErr: 'Enter valid email' });
            isReq = false;
        }
        return isReq;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if(isReq) {
            /* Send a request to the server for authentication */
            axios.post('https://flix-db-823.herokuapp.com/users', {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday
            })
            .then(response => {
                const data = response.data;
                console.log(data);
                alert("Registration successful, please login.")
                // '_self' makes the page open in the current tab
                window.open('/', '_self');
            })
            .catch(response => {
                console.error(response);
                alert('unable to register');
            });
        };

        //  HIER WEITERMACHEN =================================

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
RegistrationView.propTypes = {
    register: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email:    PropTypes.string.isRequired,
        Birthday: PropTypes.string,
    })
}