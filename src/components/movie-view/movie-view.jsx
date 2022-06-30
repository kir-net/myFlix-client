import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import {Card, Button} from 'react-bootstrap';

import './movie-view.scss';

/*MovieView: display details about a movie clicked by user*/
export class MovieView extends React.Component {

    // Add Favorite movie 
    addToFavs(movieId) {
        const currentUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        axios
        .post(`https://flix-db-823.herokuapp.com/users/${currentUser}/movies/${movieId}`, 
        {},
        {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then((response) => {
          console.log(response.data)
        })
        .catch(error => console.error(error))
    }

    render() {
        const { movie, onBackClick } = this.props;

        
        return (
        
            <Card className="indiv-view  movie-view">
            <Card.Img className="indiv-img" variant="top" src={movie.ImagePath}  />
            <Card.Header>
                <Card.Title className="indiv-title">{movie.Title}</Card.Title>
            </Card.Header>
            <Card.Body>            
                <Card.Text>{movie.Description}</Card.Text>
                <Card.Text><strong>Director: </strong>{movie.Director.Name}</Card.Text>
                <Card.Text><strong>Starring: </strong>{movie.Actors.join(', ')}</Card.Text>
                <Link to={`/directors/${movie.Director.Name}`}>
                    <Button className="button" variant="outline-primary">Director</Button>
                </Link>
                <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button className="button" variant="outline-primary">Genre</Button>
                </Link>
                <Button className="button" onClick={() => { onBackClick(null); }} >Back</Button>               
                <Button 
                    className="button button-add-favs"
                    variant="outline-success"
                    title="Add to My Favorites"                      
                    onClick={() => this.addToFavs(movie._id) }>&#x2764;                      
                </Button> 
                                   
            </Card.Body>           
            </Card>
       
        );
        
    }
}

/*  -- specify how MovieView's props should look: -- */
MovieView.propTypes = {
    movie:  PropTypes.shape({
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

