import React,{createElement} from 'react';
import {Route, Switch, Redirect,BrowserRouter,HashRouter} from 'react-router-dom';
import App from '../App';
import Home from '../containers/home';
import Detail from '../containers/detail';
import List from '../containers/list';
import Loadable from "react-loadable";
const loading = (errer)=>{
 if(errer){
  return <div>loding</div>
 }else{
   return null
 }
}
const Root = () => (
  // eslint-disable-next-line no-unused-expressions
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/home" exact render={routeProps =>
              createElement(Loadable({
                loader: () =>
                  import(/* webpackChunkName: "register.company" */ "../containers/home.js"),
                  loading:loading,
              }))
            }/>
      <Route path="/detail" component={Detail} />
      <Route path="/list" component={List} />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  </BrowserRouter>
);
export default Root;
