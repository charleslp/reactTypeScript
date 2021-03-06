import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/index'
import SubHead from './layouts/SubHead/index';
// import App from './App';

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
  document.getElementById('root')
);


