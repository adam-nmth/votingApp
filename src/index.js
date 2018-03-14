import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import store from './store';

import App from './App';

ReactDOM.render(
    <App store={store}/>,
    document.getElementById('root')
);
