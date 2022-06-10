import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


class MainView extends React.Component {

    constructor(){
        super();
        // create some hard-coded app content for now
        this.state = { movies: [
                { 
                    _id: 1, 
                    Title: "Three Billboards Outside Ebbing, Missouri", 
                    Description: "Three Billboards Outside Ebbing, Missouri is a 2017 crime drama film starring Frances McDormand as a Missouri woman who rents three roadside billboards to call attention to her daughter's unsolved rape and murder. ('Three Billboards Outside Ebbing, Missouri,' Wikipedia, The Free Encyclopedia)", 
                    ImagePath: "https://upload.wikimedia.org/wikipedia/en/c/c7/Three_Billboards_Outside_Ebbing%2C_Missouri_poster.png",
                    Director:{Name:"Martin McDonagh"},
                    Actors:["Frances McDormand","Woody Harrelson","Sam Rockwell"]
                },
                { 
                    _id: 2, 
                    Title: "I'm Not There", 
                    Description: "I'm Not There is a 2007 musical drama film. It is an unconventional biographical film inspired by the life and music of American singer-songwriter Bob Dylan.('I'm not there,'  Wikipedia, The Free Encyclopedia)", 
                    ImagePath:"https://upload.wikimedia.org/wikipedia/en/e/ec/I%27m_Not_There.jpg",
                    Director:{Name:"Todd Haynes"},
                    Actors:["Christian Bale","Cate Blanchett","Heath Ledger","Ben Whishaw","Richard Gere"]
                },
                { 
                    _id: 3, 
                    Title: "Local Hero", 
                    Description: "Local Hero is a 1983 Scottish comedy-drama film. Produced by David Puttnam, the film is about an American oil company representative who is sent to the fictional village of Ferness on the west coast of Scotland to purchase the town and surrounding property for his company. ('Local Hero (film),'  Wikipedia, The Free Encyclopedia)", 
                    ImagePath: "https://upload.wikimedia.org/wikipedia/en/6/6a/Local_Hero_Poster.jpg",
                    Director:{Name:"Bill Forsyth"},
                    Actors:["Burt Lancaster","Peter Rieger","Fulton Mackay"]
                }
            ],
            // initial value is null (no movie card clicked yet)
            selectedMovie: null
        };
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    render() {
        const { movies, selectedMovie } = this.state;     
        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;  
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
                                onMovieClick={(movie) => { this.setSelectedMovie(movie) }}
                            />
                        ))
                }
            </div>
        );
    }
}

// adding the "default" keyword enables importing (here in index.jsx) without curly braces
export default MainView;