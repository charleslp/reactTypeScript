
import React, { Component } from 'react';
import Root from './router/router';
import 'antd/dist/antd.css';
import './App.less';
import Layout from './layouts/layout';
import SubHead from './layouts/SubHead/index';

class App extends Component{
  render(){
    return (<div><Root/></div>);
  }
}
export default App;