import { connect } from 'react-redux';
import { getLoginInfo, getStatus } from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import "./index.less";
import CommonTable from '../../../components/CommonTable';
import React, { useState } from 'react';
import { Tree, Button, Input, Select, message} from 'antd';
import { getMenuList } from "../../../service/index"

const { Option } = Select;
const goodsData = [
  {
    name:'菜单名称',
    url:'https://www.baidu.com',
    rank:1,
    parentMenu:'sdfd',
  },
]
@withRouter
class MenuList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rank:'', 
      parent:'',
      menuUrl:'',
      menuName:'',
      showAdd:false,
      menuList:[], // 菜单合集
    }
  }

  componentDidMount() {
    getMenuList({page_index:1,page_size:10})
      .then(res => {
        const {data} = res
        const list  = Object.values(data.result)
        console.log(list,'--list')
        let MenuArr = [];
        list.forEach((item)=>{
          item.forEach((value)=>{
            MenuArr.push({
              id: value.id,
              menu_name: value.menu_name,
              menu_url: value.menu_url,
              create_time: value.create_time,
              fid: value.fid,
              type: value.type,
            })
          })
        })
        console.log(MenuArr,'菜单信息');
        this.setState({menuList:MenuArr})
      })
      .catch(err => {
        message.error("服务器出错了!!!");
      })
  }
  changeRank = (value) => {
    this.setState({rank:value})
  }
  changeParent = (value) => {
    this.setState({parent:value})
  }
  
  render() {
    const { userInfo } = this.props;
    const { isFetching,menuList } = this.state;
    const tableHead = ['菜单名称', '菜单url', '菜单等级', '上级菜单', '操作'];
    return (
      <div className="menu-list-container">
        <Button type="primary" onClick={this.addMenu} >添加菜单</Button>
        <div style={{marginTop:'36px'}}>
          {menuList.length > 0 && <CommonTable
            head={tableHead}
            body={menuList.map((item,index) => (
              <tr key={index}>
                <td className='max-width'>{item.menu_name}</td>
                <td className='max-width'>{item.menu_url}</td>
                <td className='max-width'>{item.type}</td>
                <td className='max-width'>{item.fid}</td>
                <td className='operate-container'>
                    <span data-menuid={item.id} onClick={this.editMenu} className='delete-store'>编辑</span><br />
                    <span data-menuid={item.index} onClick={this.cancelMenu} className='delete-store'>删除</span><br />
                  </td>
              </tr>
            ))
            }
          // current={pageNum}
          // total={total}
          // onChange={this.nextPageHandle}
          />}
        </div>
        {this.state.showAdd && <div className="panle-box">
          <div className="panle-container">
            <p style={{fontSize:'16px',fontWeight:900}}>编辑/添加菜单</p>
            <div className="font-top">
              <label className='font-right' style={{ marginRight: '96px' }}> 菜单名称</label><Input className="input-style" placeholder="
请输入管理员姓名" onClick={(e) => { this.setState({ menuName: e.target.value }) }} />
            </div>
            <div className="font-top">
              <label className='font-right' style={{ marginRight: '108px' }}> 菜单url</label><Input className="input-style" placeholder="请输入联系方式" onClick={(e) => { this.setState({ menuUrl: e.target.value }) }} />
            </div>
            <div className="font-top">
              <label className='font-right' style={{ marginRight: '96px' }}> 菜单等级</label>
              <Select
                style={{ width: 300 }}
                placeholder="请选择菜单等级"
                onChange={this.changeRank}          
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
              </Select>
            </div>
            <div className="font-top">
              <label className='font-right' style={{ marginRight: '96px' }}> 上级菜单</label>
              <Select
                style={{ width: 300 }}
                placeholder="请选择上级菜单"
                onChange={this.changeParent}          
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
              </Select>
            </div>
            <div className="font-top">
              <Button type="primary" onClick={this.submitMenu} >确定</Button>
              <Button style={{marginLeft:'16px'}} onClick={this.cancalMenu} >取消</Button>
            </div>
          </div>
        </div>}
      </div>)
  }
}
const mapStateToProps = (state) => ({
  userInfo: state.loginInfo,
  status: state.statusCount
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserInfo: (params) => {
    return dispatch(getLoginInfo(params));
  },
  fetchUserStatus: (params) => {
    return dispatch(getStatus(params));
  },

})

export default connect(mapStateToProps, mapDispatchToProps)(MenuList);
