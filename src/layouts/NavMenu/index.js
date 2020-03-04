import React from 'react';
import { Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
const { SubMenu } = Menu;

// import navigationUrl from "../../../constants/navigationUrl.json";

import './index.less';
const navs = [
    {
        name:'用户管理',
        key:'1',
        children:[
            {
                name:'用户详情',
                link:'/detail'
            },
            {
              name:'用户信息',
              link:'/home'
            },
            {
              name:'用户列表',
              link:'/userlist'
            },
            {
              name:'用户详情',
              link:'/userDetail'
            },
            {
              name:'积分明细',
              link:'/integralList'
            },
            {
              name:'余额明细',
              link:'/balanceList'
            }
        ]
    },
    {
        name:'积分管理',
        key:'2',
        children:[
            {
                name:'积分比例设置',
                link:'/integralRatio'
            },
            {
              name:'积分说明设置',
              link:'/integralExplain'
            },
            {
              name:'商品列表',
              link:'/productList'
            },
            {
              name:'菜单管理',
              link:'/menulist'
            },
            {
              name:'身份管理',
              link:'/identitylist'
            },
            {
              name:'管理员列表',
              link:'/managelist'
            }
        ]
    }
]
class NavMenu extends React.Component{
    constructor(props){
        super(props)
        this.state={
          openFirstMenu:[],
          openSecondMenu:[],
        }
    }
    componentDidMount() {
      console.log(this.props.location.pathname,'路由信息')
      const path = this.props.location.pathname;
      navs.forEach(element => {
        element.children.forEach(item=>{
          if(item.link == path){
            this.setState({openFirstMenu:[element.key]},()=>{
              // console.log(this.state.list,'---current')
            })
          }
        })
      });
      
    }
    menuHandleClick = (item) => {
      console.log(item,'item--')
      this.setState({openFirstMenu:item})
    }
render(){
    const clientHeight = document.documentElement.clientHeight;
    const {openFirstMenu, openSecondMenu} = this.state;
    console.log(openFirstMenu,'导航数据')
    const path = this.props.location.pathname;
    console.log(this.props,'this.props.location.pathname')
  return (
    <div className='nav-menu-container' style={{height: `${clientHeight}px`}}>
      <Menu theme="dark" 
        // defaultOpenKeys={['师傅订单']}
        // defaultSelectedKeys={['/list']}
        mode="inline"
        onOpenChange={this.menuHandleClick}
        openKeys={openFirstMenu}
        selectedKeys={[path]}>
        
      { Array.isArray(navs) &&navs.map((item,index) => {
              return (
                <SubMenu
                  key={item.key}
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
                          <Menu.Item key={subChild.link}>
                          <Link
                            to={subChild.link}
                          >{subChild.name}</Link>
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
export default withRouter(NavMenu);
// export default NavMenu;
