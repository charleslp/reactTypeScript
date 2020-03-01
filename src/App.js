
import React, { Component } from 'react';
import Root from './router/router';
import 'antd/dist/antd.css';
import './App.less';
import Layout from './layouts/layout';

class App extends Component{
  render(){
    return (<Layout/>);
  }
}
export default App;