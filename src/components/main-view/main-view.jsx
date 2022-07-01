import   React                  from 'react';
import   axios                  from 'axios';
import { connect }              from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { MovieView }            from '../movie-view/movie-view';
import { LoginView }            from '../login-view/login-view';
import { RegistrationView }     from '../registration-view/registration-view';
import { Menubar }              from '../navbar/navbar';
import { DirectorView }         from '../director-view/director-view';
import { GenreView }            from '../genre-view/genre-view';
import { ProfileView }          from '../profile-view/profile-view';
import { Col, Row }             from 'react-bootstrap';
import { setMovies, setUser }   from '../../actions/actions';
import   MoviesList             from '../movies-list/movies-list';

import './main-view.scss';

class MainView extends React.Component {

    constructor() {
        super();
    }


    getMovies(token) {
        axios.get('https://flix-db-823.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}`}
        })
       .then(response => {
            // #4
            this.props.setMovies(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }  
    
    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.getMovies(accessToken);
            this.props.setUser(localStorage.getItem('user'));
        }
    }
   
    onLoggedIn(authData) {
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        const { setUser } = this.props;
        setUser(authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.props.setUser('');
    }
  
    render() {
        let { user, movies } = this.props;

        return (
            <Router>
                <Menubar user={user} />
                
                <Row className="main-view justify-content-md-center">
                    
                    <Route exact path="/" render={() => {
                        if (!user) return 
                            <Col>
                                <LoginView onLoggedIn={(user)=>this.onLoggedIn(user)} />
                            </Col>
                        if (movies.length===0) return <div className="main-view"/>;
                        return <MoviesList movies={movies}/>;
                    }} />

                    /*
                    <Route  
                        path="/login" 
                        render={() => {
                            if (user) return <Redirect to="/" />
                            return <Col md={8}>
                                <LoginView onLoggedIn={(user)=>this.onLoggedIn(user)}/>
                            </Col>
                    }} /> 
                    */                      

                    <Route  
                        path="/register" 
                        render={() => {
                            //if (user) return <Redirect to="/" />
                            return <Col md={8}>
                                <RegistrationView />
                            </Col>
                    }} />

                    <Route  
                        path="/movies/:movieId" 
                        render={({ match, history }) => {
                          if (!user) return <Col>
                                    <LoginView 
                                        onLoggedIn={user => this.onLoggedIn(user)} 
                                    />
                                </Col>          
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                                <MovieView 
                                    movie={movies.find(m => m._id === match.params.movieId)} 
                                    onBackClick={() => history.goBack()} 
                                />
                            </Col>
                    }} />

                    <Route  
                        path="/users/:username" 
                        render={({ match, history }) => {
                        if (!user) return 
                            <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        if (!user) return <Redirect to="/" />
                        return <Col md={8}>
                                <ProfileView 
                                    movies={movies} 
                                    user={user === match.params.username} 
                                    onBackClick={() => history.goBack()} 
                                />
                            </Col>
                    }} />

                    <Route  
                        path="/directors/:name" 
                        render={({ match, history }) => {
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                                <DirectorView 
                                    director={movies.find(m => m.Director.Name === match.params.name).Director} 
                                    onBackClick={() => history.goBack()} 
                                />
                            </Col>
                    }} />

                    <Route 
                        path="/genres/:name" 
                        render={({ match, history }) => {
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                                <GenreView 
                                    genre={movies.find(m => m.Genre.Name === match.params.name).Genre} 
                                    onBackClick={() => history.goBack()} 
                                />
                            </Col>
                    }} />

                </Row>
            </Router>
        );
    }
}

// #7
let mapStateToProps = state => {
    return { 
        movies: state.movies,
        user: state.user 
    }
}
  
// #8
export default connect(mapStateToProps, {setMovies, setUser} )(MainView);