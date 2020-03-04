import { connect } from 'react-redux';
import { getLoginInfo, getStatus } from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import "./index.less";
import CommonTable from '../../../components/CommonTable';
import React, { useState } from 'react';
import { Tree, Button, Input, Select  } from 'antd';
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
    }
  }

  componentDidMount() {
    
  }
  changeRank = (value) => {
    this.setState({rank:value})
  }
  changeParent = (value) => {
    this.setState({parent:value})
  }
  
  render() {
    const { userInfo } = this.props;
    const { isFetching } = this.state;
    const tableHead = ['菜单名称', '菜单url', '菜单等级', '上级菜单', '操作'];
    return (
      <div className="menu-list-container">
        <Button type="primary" onClick={this.addMenu} >添加菜单</Button>
        <div style={{marginTop:'36px'}}>
          {goodsData.length > 0 && <CommonTable
            head={tableHead}
            body={goodsData.map((item,index) => (
              <tr key={index}>
                <td className='max-width'>{item.name}</td>
                <td className='max-width'>{item.url}</td>
                <td className='max-width'>{item.rank}</td>
                <td className='max-width'>{item.parentMenu}</td>
                <td className='operate-container'>
                    <span data-goodid={item.index} onClick={this.editMenu} className='delete-store'>编辑</span><br />
                    <span data-goodid={item.index} onClick={this.cancelMenu} className='delete-store'>删除</span><br />
                  </td>
              </tr>
            ))
            }
          // current={pageNum}
          // total={total}
          // onChange={this.nextPageHandle}
          />}
        </div>
        <div className="panle-box">
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
        </div>
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
