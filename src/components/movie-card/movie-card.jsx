import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';

import { Link } from "react-router-dom";

import './movie-card.scss';


export class MovieCard extends React.Component {
 
    // Remove Favorite movie 
    remFromFavs(movieId) {
        const currentUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        axios.delete(`https://flix-db-823.herokuapp.com/users/${currentUser}/movies/${movieId}`, 
        {},
        {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then((response) => {
          console.log(response.data)
          alert(`The movie was successfully removed from your list.`)
        }).
        catch(error => console.error(error))
    }


    render() {
        const { movie } = this.props;

        return (
            <Card className='cards'>
                <Link to={`/movies/${movie._id}`}>
                    <Card.Img className='cards-img' variant="top" src={movie.ImagePath} />
                </Link>
                <Card.Header>
                    <Card.Title className='cards-title'>{movie.Title}</Card.Title>
                                                                                                          
                </Card.Header>
                <Card.Body>                          
                    <Card.Text className="cards-description">
                        {movie.Description.split(' ').slice(0, 14).join(' ') + ' '}
                        <Link to={`/movies/${movie._id}`} className="text-link">
                            [...]
                        </Link>
                    </Card.Text>
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