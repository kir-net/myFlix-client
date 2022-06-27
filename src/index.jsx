import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'react-bootstrap';
import { legacy_createStore as createStore} from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';

import MainView from './components/main-view/main-view';

//Bundles index.scss
import './index.scss';

//Store
const store = createStore(moviesApp);

//Main component
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

//Finds root of app
const container = document.getElementsByClassName('app-container')[0];

//Tells React to render app in root of DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);