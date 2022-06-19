import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';

import './movie-card.scss';


export class MovieCard extends React.Component {
    render() {
    const { movieProps, onMovieClick } = this.props;

    return (
        <Card className='cards'>
        <Card.Img className='cards-img' variant="top" src={movieProps.ImagePath}  />
        <Card.Header>
            <Card.Title className='cards-title'>{movieProps.Title}</Card.Title>
        </Card.Header>
        <Card.Body>            
            <Card.Text className="cards-description">{movieProps.Description.split(' ').slice(0, 25).join(' ') + ' [...]'}</Card.Text>
            <Button variant="outline-primary" onClick={() => onMovieClick(movieProps)} >See more</Button>
        </Card.Body>
        </Card>
    );
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