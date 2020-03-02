import React, { Component } from 'react';
import SubHead from './SubHead/index';
import NavMenu from './NavMenu/index';
import MainRoot from '../mainRouters/index';

class Layout extends Component {
  render() {
    return (
      <div className="global-layout-container">
        <div className="global-layout-top">
          <SubHead/>
        </div>
        <div className="global-layout-botttom">
            <div className="global-layout-menu">
             <NavMenu />
            </div>
            <div className="global-layout-content">
            
                <div className="global-layout-inner">
                    <MainRoot />
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Layout;
