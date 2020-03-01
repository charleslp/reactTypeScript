import React,{createElement} from 'react';
import {Route, Switch, Redirect,BrowserRouter,HashRouter} from 'react-router-dom';
import App from '../App';
import Home from '../containers/home/index.js';
import Detail from '../containers/detail';
import Loadable from "react-loadable";
import List from '../containers/list';
import DefaultLayout from "../layouts/layout";
const loading = (errer)=>{
 if(errer){
  return <div>loding</div>
 }else{
   return null
 }
}
const MainRoot = () => (
  // eslint-disable-next-line no-unused-expressions
  <BrowserRouter>
    <Switch>
      <Route path="/home" exact render={routeProps =>
              createElement(Loadable({
                loader: () =>
                  import(/* webpackChunkName: "register.company" */ "../containers/home/index.js"),
                  loading:loading,
              }))
            }/>
      <Route path="/detail" component={Detail} />
      <Route path="/list" component={List} />
      <Route path="/" exact component={Home} />
    </Switch>
  </BrowserRouter>
);
export default MainRoot;
