import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import addContactReducer from "./store/reducers/addContactReducer";
import thunkMiddleware from 'redux-thunk';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import contactsReducer from "./store/reducers/contactsReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers( {
  addContact: addContactReducer,
  contacts: contactsReducer,
});

const store = createStore (
    rootReducer,
    composeEnhancers(applyMiddleware(thunkMiddleware ))
);
const app = (
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
);


ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
