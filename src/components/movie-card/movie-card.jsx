import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';

import { Link } from "react-router-dom";

import './movie-card.scss';


export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        return (
            <Card className='cards'>
            <Card.Img className='cards-img' variant="top" src={movie.ImagePath} />
            <Card.Header>
                <Card.Title className='cards-title'>{movie.Title}</Card.Title>
            </Card.Header>
            <Card.Body>
                
                <Card.Text className="cards-description">{movie.Description.split(' ').slice(0, 25).join(' ') + ' [...]'}</Card.Text>
                <Link to={`/movies/${movie._id}`}>
                <Button variant="link">Open</Button>
                </Link>
            </Card.Body>
            </Card>
        );
    }
  }

/*  -- specify how MovieCard's props should look: -- */
MovieCard.propTypes = {
    movie: PropTypes.shape({
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
    }).isRequired
};