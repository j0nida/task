import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';

import registerServiceWorker from './registerServiceWorker';
import App, { rootReducer } from './App';
//import {routes} from './Router'

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/css/bootstrap-grid.min.css';

import 'react-virtualized/styles.css';
import './react-table.css';
import './index.css';
import './global.css';

import { Provider as RightProvider } from './common/rights';
import { LiveHmsDB as DB } from './common/db';

const middleware = [thunk, promise];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}

const getRights = async () => {
    try {
        let username = (await DB.getSession()).userCtx.name;
        console.log(username);
       // username = 'admin';
        if (username !== null) {
            const user = (await DB.find({ selector: { username } })).docs[0];
            const role = await DB.get(user.roles_id);

            return role.permissions;
        }
    } catch (e) {
        console.log(e);
    }

    return {};
};

/*
const reRender = (component) => {
    ReactDOM.render(
        <Provider store={store}>
            <App route={component}/>
        </Provider>,
        document.getElementById('root')
    );
}
reRender();
routes(reRender);
*/

const renderApp = async () => {
    const permissions = await getRights();
    const store = createStore(rootReducer, applyMiddleware(...middleware));

    ReactDOM.render(
        <Provider store={store}>
            <RightProvider rights={permissions}>
                <App />
            </RightProvider>
        </Provider >,
        document.getElementById('root')
    );
};

renderApp();
registerServiceWorker();
