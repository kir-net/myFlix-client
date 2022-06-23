import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import {Card, Button} from 'react-bootstrap';

import './movie-view.scss';

/*MovieView: display details about a movie clicked by user*/
export class MovieView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            email: null,
            birthday: null,
            FavoriteMovies: [],
        };
    }

    getUser(token) {
        let user = localStorage.getItem("user");
        axios.get(`https://flix-db-823.herokuapp.com/users/${user}`, {
            headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
            //assign the result to the state
            this.setState({
                username: response.data.username,
                password: response.data.password,
                email: response.data.email,
                birthday: response.data.birthday,
                FavoriteMovies: response.data.FavoriteMovies,
            });
            })
            .catch((e) => console.log(e));
    }
        
    componentDidMount() {
        const accessToken = localStorage.getItem("token");
        this.getUser(accessToken);
    }
    

    // Add Favorite movie 
    addFavMovie = () => {
        let token = localStorage.getItem("token");
        let user = localStorage.getItem("user");
        let userFavMovies = this.state.FavoriteMovies;
        let isFav = userFavMovies.includes(this.props.movie._id);
        if (!isFav) {
            axios.post(`https://flix-db-823.herokuapp.com/users/${user}/movies/${this.props.movie._id}`, {},
            {
                headers: {
                Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                console.log(response.data);
                alert(`${this.props.movie.Title} has been added to your list of movies`);
                window.open(`/movies/${this.props.movie._id}`, "_self");
            })
            .catch(e => {
                console.log('Error')
            });
        } else if (isFav) {
            alert(`${this.props.movie.Title} is already present in your list of movies`);
        }
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
                <Card.Text>Director: {movie.Director.Name}</Card.Text>
                <Card.Text>Starring: {movie.Actors.join(', ')}</Card.Text>
                <Link to={`/directors/${movie.Director.Name}`}>
                    <Button variant="link">Director</Button>
                </Link>
                <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button variant="link">Genre</Button>
                </Link>
                <Button className="button" onClick={this.addFavMovie}>Add to my Favs</Button>
                <Button className="button" onClick={() => { onBackClick(null); }} >Back</Button>               
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

