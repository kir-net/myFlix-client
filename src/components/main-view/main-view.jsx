import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


class MainView extends React.Component {

    constructor(){
        super();
        this.state = { 
            movies: [],
            // initial value is null (no movie card clicked yet)
            selectedMovie: null
        };
    }


    componentDidMount(){
        axios.get('https://flix-db-823.herokuapp.com/movies')
        .then(response => {
            this.setState({
            movies: response.data
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    render() {
        const { movies, selectedMovie } = this.state;
        if (movies.length === 0) return <div className="main-view" />;
        return (
            <div className="main-view">
                {selectedMovie
                    // if user clicked a movie, show its movie view
                    ?   <MovieView 
                            movie={selectedMovie} 
                            onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}
                        />
                    // else, show all movie cards
                    :   movies.map(movie => (
                            <MovieCard 
                                key={movie._id} 
                                movie={movie} 
                                onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}
                                // prevously:
                                // onMovieClick={(movie) => { this.setSelectedMovie(movie) }}
                            />
                    ))
                }
            </div>
        );
    }

}

// adding the "default" keyword enables importing (here in index.jsx) without curly braces
export default MainView;