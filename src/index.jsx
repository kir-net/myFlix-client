import React    from 'react';
import ReactDOM from 'react-dom';
// import {MainView} from './components/main-view/main-view';
// here without curly braces because in main-view.jsx, "default" keyword is used for exporting
import MainView from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';

import './index.scss';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
render() {
    return (
        <Container>
            <MainView />
        </Container>
    );
}
}

// Find root of app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render app in root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
