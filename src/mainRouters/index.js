import React, { createElement } from 'react';
import { Route, Switch, Redirect, BrowserRouter, HashRouter } from 'react-router-dom';
import App from '../App';
import Home from '../containers/home/index.js';
import Detail from '../containers/detail';
import Loadable from "react-loadable";
import List from '../containers/list';
import DefaultLayout from "../layouts/layout";
const loading = (errer) => {
  if (errer) {
    return <div>loding</div>
  } else {
    return null
  }
}
const MainRoot = () => (
  // eslint-disable-next-line no-unused-expressions
  <Switch>
    {/* <Route path="/detail" component={Detail} />
      <Route path="/list" component={List} />
      <Route path="/" component={Home} /> */}



    <Route
      path="/detail"
      exact
      render={routeProps =>
        createElement(
          Loadable({
            loader: () => import(/* webpackChunkName: "detail" */ '../containers/detail'),
            loading() {
              return <div />;
            },
          }),
          { ...routeProps },
        )
      }
    />


    <Route
      path="/list"
      exact
      render={routeProps =>
        createElement(
          Loadable({
            loader: () => import(/* webpackChunkName: "list" */ '../containers/list'),
            loading() {
              return <div />;
            },
          }),
          { ...routeProps },
        )
      }
    />
    <Route
      path="/userlist"
      exact
      render={routeProps =>
        createElement(
          Loadable({
            loader: () => import(/* webpackChunkName: "userlist" */ '../containers/userManage/userList/index'),
            loading() {
              return <div />;
            },
          }),
          { ...routeProps },
        )
      }
    />

    <Route
      path="/home"
      exact
      render={routeProps =>
        createElement(
          Loadable({
            loader: () => import(/* webpackChunkName: "home" */ '../containers/home'),
            loading() {
              return <div />;
            },
          }),
          { ...routeProps },
        )
      }
    />

    <Redirect from="/home" to="/" />
  </Switch>
);
export default MainRoot;