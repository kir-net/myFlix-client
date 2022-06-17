import React from 'react';
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