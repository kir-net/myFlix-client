import React from 'react';
import PropTypes from 'prop-types';
import {Card, Button} from 'react-bootstrap';

import './movie-view.scss';

/*MovieView: display details about a movie clicked by user*/
export class MovieView extends React.Component {

    render() {
        const { movieProps, onBackClick } = this.props;

        return (
        
            <Card className="indiv-view  movie-view">
            <Card.Img className="indiv-img" variant="top" src={movieProps.ImagePath}  />
            <Card.Header>
                <Card.Title className="indiv-title">{movieProps.Title}</Card.Title>
            </Card.Header>
            <Card.Body>            
                <Card.Text>{movieProps.Description}</Card.Text>
                <Card.Text>Director: {movieProps.Director.Name}</Card.Text>
                <Card.Text>Starring: {movieProps.Actors.join(', ')}</Card.Text>
                <Button variant="outline-primary" onClick={() => { onBackClick(null); }} >Back</Button>
            </Card.Body>           
            </Card>
       
        );
    }
}

/*  -- specify how MovieView's props should look: -- */
MovieView.propTypes = {
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

