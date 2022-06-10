import React from 'react';

/*MovieView: display details about a selected movie once its movie card is clicked*/
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

            <button onClick={() => { onBackClick(null); }}>Back</button>
            
        </div>
        );
    }

}