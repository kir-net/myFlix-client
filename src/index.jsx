import React           from 'react';
import ReactDOM        from 'react-dom';
import { createStore } from 'redux'; // replaced by configureStore
import {configureStore } from 'redux';
import { Provider }    from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

// import {MainView} from './components/main-view/main-view';
// here without curly braces because in main-view.jsx, "default" keyword is used for exporting
import MainView  from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';

import './index.scss';

// const store = createStore(moviesApp, devToolsEnhancer());
const store = configureStore(moviesApp, devToolsEnhancer());


// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Container>
                    <MainView />
                </Container>
            </Provider>
           
        );
    }
}

// Find root of app
const container = document.getElementsByClassName('app-container')[0];

// Tell React to render app in root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
