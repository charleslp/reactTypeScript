import React,{memo} from 'react';
import { Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
const { SubMenu } = Menu;
import { Breadcrumb } from 'antd';

// import navigationUrl from "../../../constants/navigationUrl.json";
const navs = [
  {
      name:'用户管理',
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
          name:'新增商品',
          link:'/addGoods'
        },
        {
          name:'查看评价',
          link:'/evaluate'
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
          name:'操作日志',
          link:'/operateRecord'
        },
        
      ]
  }
]
import './index.less';
class SubHead extends React.Component{
    constructor(props){
        super(props)
        this.state={
          list:[],
        }
    }
    componentDidMount() {
      console.log(this.props.location.pathname,'路由信息')
      const path = this.props.location.pathname;
      navs.forEach(element => {
        element.children.forEach(item=>{
          if(item.link == path){
            this.setState({list:[element.name,item.name]},()=>{
              // console.log(this.state.list,'---current')
            })
          }
        })
      });
      
    }
    componentWillReceiveProps (nextProps) {
      if(nextProps.location.pathname != this.props.location.pathname){
        const path = nextProps.location.pathname;
        navs.forEach(element => {
          element.children.forEach(item=>{
            if(item.link == path){
              this.setState({list:[element.name,item.name]},()=>{
                // console.log(this.state.list,'---current')
              })
            }
          })
        });
      }
    }
    
render(){
  const path = this.props.location.pathname;
  console.log(this.props,'最新的路由')
    
  return (
    <div className='breadcrumb-box'>
      <Breadcrumb>
      {this.state.list.length>1 && this.state.list.map((item,index)=>{
          return (<Breadcrumb.Item href="" key={index}>
            <span>{item}</span>
          </Breadcrumb.Item>)
        })}
      </Breadcrumb>
    </div>
  )};
}
export default withRouter(memo(SubHead));
