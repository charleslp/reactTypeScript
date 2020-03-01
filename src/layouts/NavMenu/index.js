import React from 'react';
import { Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
const { SubMenu } = Menu;

// import navigationUrl from "../../../constants/navigationUrl.json";

import './index.less';
const navs = [
    {
        name:'用户管理',
        children:[
            {
                name:'用户详情',
                link:'/detail'
            },
            {
                name:'积分明细',
                link:'/detail'
            }
        ]
    },
    {
        name:'线上诊疗',
        children:[
            {
                name:'商品管理',
                link:'/list'
            },
            {
                name:'商城订单',
                link:'/list'
            }
        ]
    }
]
class NavMenu extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
render(){
    const clientHeight = document.documentElement.clientHeight;
  return (
    <div className='nav-menu-container' style={{height: `${clientHeight}px`}}>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        
      { Array.isArray(navs) &&navs.map((item,index) => {
              return (
                <SubMenu
                  key={index}
                  title={
                    <span>
                      <Icon type="mail" />
                      <span>{item.name}</span>
                    </span>
                  }
                >
                  { Array.isArray(item.children) &&
                    item.children.map(subChild => {
                        return (
                          <Menu.Item key={subChild.name}>
                          <a
                            href={subChild.link}
                          >{subChild.name}</a>
                          </Menu.Item>
                        )
                    })
                  }
                </SubMenu>
              )
          })}  
      </Menu>
    </div>
  )};
}
export default NavMenu;
