import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


class MainView extends React.Component {

    constructor(){
        super();
        // initial state
        this.state = { 
            movies: [],
            selectedMovie: null,
            user: null
        };
    }

    componentDidMount(){
        axios
        .get('https://flix-db-823.herokuapp.com/movies')
        .then(response => {
            this.setState({movies: response.data});
        })
        .catch(error => {
            console.log(error);
        });
    }

    /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    render() {
        const { movies, selectedMovie, user } = this.state;

        /* If there is no user, the LoginView is rendered. 
        If there is a user logged in, the user details are *passed as a prop to the LoginView*/
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
        
        // Before the movies have been loaded
        if (movies.length === 0) return <div className="main-view" />;
        return (
            <div className="main-view">
                {selectedMovie
                    // if user clicked a movie, show its movie view
                    ?   <MovieView 
                            movieProps={selectedMovie} 
                            onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}
                        />
                    // else, show all movie cards
                    :   movies.map(movie => (
                            <MovieCard 
                                key={movie._id} 
                                movieProps={movie} 
                                // new ex 3.4:
                                onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}
                            />
                    ))
                }
            </div>
        );
    }
}

// adding the "default" keyword enables importing (here in index.jsx) without curly braces
export default MainView;
