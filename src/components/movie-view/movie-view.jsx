import React from 'react';
import axios from 'axios';
import {Button, Card, Container, Row, Col} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './movie-view.scss';

export class MovieView extends React.Component {
    removeFromFavorite = (event) => {
        event.preventDefault()

        console.log('removing from favorites: ', this.props.movie, this.props.user)
    
        const username = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        console.log('remove auth', token)
    
        axios
        .delete(
        `https://flix-db-823.herokuapp.com/users/${username}/movies/${this.props.movie._id}`,
        {
            headers: { Authorization:`Bearer ${token}`}
        }
        )
        .then(() => {
        alert(`${this.props.movie.Title} was removed from your favorites list`);
        })
        .catch((err) => {
        console.log(err);
      })
    }

    addFavorite = (event) => {
        event.preventDefault()

        console.log('adding to favorites: ', this.props.movie, this.props.user)
    
        const username = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        console.log('add auth: ', token);
    
        axios
        .post(
        `https://flix-db-823.herokuapp.com/users/${username}/movies/${this.props.movie._id}`,
        {},
        {
            headers: { Authorization: `Bearer ${token}` }
        }
        )
        .then(() => {
        alert(`${this.props.movie.Title} was added to your favorites list`);
        })
        .catch((err) => {
        console.log(err);
        });
    }

    render () {
        if (!this.props?.user || !this.props.movie) return <div />
        const { movie } = this.props;
        const isMovieAFavorite = this.props.user.FavoriteMovies.includes(this.props.movie._id);
        console.log('single movie view: ', movie)

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