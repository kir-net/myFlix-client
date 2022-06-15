import React from 'react';
import PropTypes from 'prop-types';

/*MovieView: display details about a movie clicked by user*/
export class MovieView extends React.Component {

    
    render() {
        const { movieProps, onBackClick } = this.props;

        return (
        <div className="movie-view">

            <div className="movie-poster">
                <img src={movieProps.ImagePath} alt='poster' />
            </div>
           
            <div className="movie-title">
                <span className="label">Title: </span>
                <span className="value">{movieProps.Title}</span>
            </div>

            <div className="movie-description">
                <span className="label">Description: </span>
                <span className="value">{movieProps.Description}</span>
            </div>

            <div className="movie-director">
                <span className="label">Directed by: </span>
                <span className="value">{movieProps.Director.Name}</span>
            </div>

            <div className="movie-actors">
                <span className="label">Starring: </span>
                <span className="value">{movieProps.Actors.join(', ')}</span>
            </div>
                       
            <button onClick={() => { onBackClick(null); }}>Back</button>
            
        </div>
        );
    }
}

/*  -- specify how MovieView's props should look: -- */
MovieCard.propTypes = {
    movieProps:  PropTypes.shape({
                Title:              PropTypes.string.isRequired,
                Description:        PropTypes.string.isRequired,
                Genre: PropTypes.shape({
                    Name:           PropTypes.string.isRequired,
                    Description:    PropTypes.string.isRequired
                }).isRequired,
                Director: PropTypes.shape({
                    Name:           PropTypes.string.isRequired,
                    Bio:            PropTypes.string.isRequired, 
                    Birth:          PropTypes.string.isRequired,
                    Death:          PropTypes.string
                }).isRequired,
                Actors:             PropTypes.arrayOf(PropTypes.string).isRequired,
                ImagePath:          PropTypes.string.isRequired,
                Featured:           PropTypes.bool.isRequired
            }).isRequired,
    onBackClick: PropTypes.func.isRequired
};