import React from 'react';
import PropTypes from 'prop-types';

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

/*  -- specify how MovieCard's props should look: -- */
MovieCard.propTypes = {
    movieProps: PropTypes.shape({
                Title:              PropTypes.string.isRequired,
                Description:        PropTypes.string.isRequired,
                Genre: PropTypes.shape({
                    Name:           PropTypes.string.isRequired                  
                }).isRequired,
                Director: PropTypes.shape({
                    Name:           PropTypes.string.isRequired
                }).isRequired,
                Actors:             PropTypes.arrayOf(PropTypes.string).isRequired,
                ImagePath:          PropTypes.string.isRequired,
                Featured:           PropTypes.bool.isRequired
            }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};