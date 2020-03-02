import React, { createElement } from 'react';
import { Route, Switch, Redirect, BrowserRouter, HashRouter } from 'react-router-dom';
import App from '../App';
import Home from '../containers/home/index.js';
import Login from '../containers/login/index.js';
import Detail from '../containers/detail';
import List from '../containers/list';
import Loadable from "react-loadable";
import SubHead from '../layouts/SubHead/index';
import DefaultLayout from "../layouts/layout";
const loading = (errer) => {
  if (errer) {
    return <div>loding</div>
  } else {
    return null
  }
}
const Root = () => (
  <React.Fragment>
    <BrowserRouter>
      <Switch>
      <Route
          path="/login"
          render={({ location }) =>
            createElement(Login, { location })
          }
        />
        <Route
          path="/"
          render={({ location }) =>
            createElement(DefaultLayout, { location })
          }
        />
      </Switch>
    </BrowserRouter>
  </React.Fragment>
);
export default Root;
