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
      path="/userDetail"
      exact
      render={routeProps =>
        createElement(
          Loadable({
            loader: () => import(/* webpackChunkName: "userDetail" */ '../containers/userManage/userDetail/index'),
            loading() {
              return <div />;
            },
          }),
          { ...routeProps },
        )
      }
    />

    <Route
      path="/integralList"
      exact
      render={routeProps =>
        createElement(
          Loadable({
            loader: () => import(/* webpackChunkName: "integralList" */ '../containers/userManage/integralList/index'),
            loading() {
              return <div />;
            },
          }),
          { ...routeProps },
        )
      }
    />
    <Route
      path="/balanceList"
      exact
      render={routeProps =>
        createElement(
          Loadable({
            loader: () => import(/* webpackChunkName: "balanceList" */ '../containers/userManage/balanceList/index'),
            loading() {
              return <div />;
            },
          }),
          { ...routeProps },
        )
      }
    />
    <Route
      path="/integralRatio"
      exact
      render={routeProps =>
        createElement(
          Loadable({
            loader: () => import(/* webpackChunkName: "integralRatio" */ '../containers/integralManage/integralRatio/index'),
            loading() {
              return <div />;
            },
          }),
          { ...routeProps },
        )
      }
    />
    <Route
      path="/integralExplain"
      exact
      render={routeProps =>
        createElement(
          Loadable({
            loader: () => import(/* webpackChunkName: "integralExplain" */ '../containers/integralManage/integralExplain/index'),
            loading() {
              return <div />;
            },
          }),
          { ...routeProps },
        )
      }
    />
    <Route
      path="/productList"
      exact
      render={routeProps =>
        createElement(
          Loadable({
            loader: () => import(/* webpackChunkName: "productList" */ '../containers/product/productList/index'),
            loading() {
              return <div />;
            },
          }),
          { ...routeProps },
        )
      }
    />
    <Route
      path="/addGoods"
      exact
      render={routeProps =>
        createElement(
          Loadable({
            loader: () => import(/* webpackChunkName: "addGoods" */ '../containers/product/addGoods/index'),
            loading() {
              return <div />;
            },
          }),
          { ...routeProps },
        )
      }
    />
    <Route
      path="/evaluate"
      exact
      render={routeProps =>
        createElement(
          Loadable({
            loader: () => import(/* webpackChunkName: "evaluate" */ '../containers/product/evaluate/index'),
            loading() {
              return <div />;
            },
          }),
          { ...routeProps },
        )
      }
    />
    <Route
      path="/menulist"
      exact
      render={routeProps =>
        createElement(
          Loadable({
            loader: () => import(/* webpackChunkName: "menulist" */ '../containers/limitsManage/menuList/index'),
            loading() {
              return <div />;
            },
          }),
          { ...routeProps },
        )
      }
    />
    <Route
      path="/identitylist"
      exact
      render={routeProps =>
        createElement(
          Loadable({
            loader: () => import(/* webpackChunkName: "identitylist" */ '../containers/limitsManage/identityList/index'),
            loading() {
              return <div />;
            },
          }),
          { ...routeProps },
        )
      }
    />
    <Route
      path="/managelist"
      exact
      render={routeProps =>
        createElement(
          Loadable({
            loader: () => import(/* webpackChunkName: "managelist" */ '../containers/limitsManage/manageList/index'),
            loading() {
              return <div />;
            },
          }),
          { ...routeProps },
        )
      }
    />
    <Route
      path="/operateRecord"
      exact
      render={routeProps =>
        createElement(
          Loadable({
            loader: () => import(/* webpackChunkName: "operateRecord" */ '../containers/limitsManage/operateRecord/index'),
            loading() {
              return <div />;
            },
          }),
          { ...routeProps },
        )
      }
    />
    <Route
      path="/hotsearch"
      exact
      render={routeProps =>
        createElement(
          Loadable({
            loader: () => import(/* webpackChunkName: "hotsearch" */ '../containers/product/hotSearchSet/index'),
            loading() {
              return <div />;
            },
          }),
          { ...routeProps },
        )
      }
    />
    <Route
      path="/addhot"
      exact
      render={routeProps =>
        createElement(
          Loadable({
            loader: () => import(/* webpackChunkName: "addhot" */ '../containers/product/addhot/index'),
            loading() {
              return <div />;
            },
          }),
          { ...routeProps },
        )
      }
    />
    <Route
      path="/orderlist"
      exact
      render={routeProps =>
        createElement(
          Loadable({
            loader: () => import(/* webpackChunkName: "orderlist" */ '../containers/orderManage/orderList/index'),
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
