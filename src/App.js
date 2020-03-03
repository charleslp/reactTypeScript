
import React, { Component } from 'react';
import Root from './router/router';
import 'antd/dist/antd.css';
import './App.less';
import Layout from './layouts/layout';
import SubHead from './layouts/SubHead/index';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

class App extends Component{
  render(){
    return (<ConfigProvider locale={zhCN}><div><Root/></div></ConfigProvider>);
  }
}
export default App;