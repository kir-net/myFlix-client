import React, { useState } from 'react';
import {Form, Button, Card, Container, Col, Row, CardGroup} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';

import './login-view.scss';

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const [ usernameErr, setUsernameErr ] = useState('');
    const [ passwordErr, setPasswordErr ] = useState('');

    const validate = () => {
        let isReq = true;
        if(!username){
            setUsernameErr('Username required');
            isReq = false;
        } else if(username.length < 5){
            setUsernameErr('Username must be at least 5 characters long');
            isReq = false;
        }
      
        if(!password){
            setPasswordErr('Password Required');
            isReq = false;
        } else if(password.length < 6){
            setPasswordErr('Password must be at least 6 characters long');
            isReq = false;
        }

        return isReq;
    }

    //Requests server for authentication
    //then calls props.onLoggedIn(username)
    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();

        if(isReq) {
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
        <Container id='login-view-container'>
            <Row>
                <Col>
                    <CardGroup>
                        <Card>
                            <Card.Title id='login-view-card-title'>
                                Welcome to myFlix!
                            </Card.Title>
                            <Card.Body>
                                <Form>
                                    <Form.Group controlId="formUsername">
                                        <Form.Label>Username: </Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                            placeholder="Enter your username" />
                                            {usernameErr && <p>{usernameErr}</p>}
                                    </Form.Group>

                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Password: </Form.Label>
                                        <Form.Control 
                                            type="password" 
                                            onChange={e => setPassword(e.target.value)}
                                            placeholder="Enter your username"
                                        />
                                        {passwordErr && <p>{passwordErr}</p>}
                                    </Form.Group>
                                    <br></br>
                                    <Button 
                                        id='login-view-submit-button'
                                        variant="primary" 
                                        type="submit" 
                                        onClick={handleSubmit}>Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                            
                            <Link to={`/register`}>
                                <Button variant="link">Sign-Up Here</Button>
                            </Link>
                            
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    )
}

LoginView.propTypes = {
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired
    }),
    onLoggedIn: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, { setUser })(LoginView);