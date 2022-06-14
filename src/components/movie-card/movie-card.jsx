import React from 'react';

export class MovieCard extends React.Component {
  render() {
    const { movieProps, onMovieClick } = this.props;
    return <div 
            className="movie-card" 
            onClick = {() => { 
                onMovieClick(movieProps); 
            }}>
                {movieProps.Title}
            </div>;
  }
}