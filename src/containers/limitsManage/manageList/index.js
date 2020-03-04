import { connect } from 'react-redux';
import { getLoginInfo, getStatus } from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import "./index.less";
import CommonTable from '../../../components/CommonTable';
import React, { useState } from 'react';
import { Tree, Button, Input, Select  } from 'antd';
const { Option } = Select;
const treeData = [
  {
    title: '权限管理',
    key: '1',
    children: [
      {
        title: '管理员列表',
        key: '0-1',
        children: [
          { title: '超级', key: '0-1-0' },
          { title: '中级', key: '0-1-1' },
          { title: '普通', key: '0-1-2' },
        ],
      },
      {
        title: '身份管理',
        key: '0-2',
        children: [
          { title: '查看', key: '0-2-0' },
          { title: '修改', key: '0-2-1' },
          { title: '添加', key: '0-2-2' },
          { title: '删除', key: '0-2-3' },
        ],
      }
    ],
  },
];
const manageData = [
  {
    id: '超级管理员',
    name: '蒂芬',
    phone: 18688888888,
    account: 'sddrdd',
    identity: '超级',
  },
]
@withRouter
class ManageList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      goodsName: '', //商品名称
      manageName:'',
      phone:'',
      account:'',
      password:'',
      role:'',
    }
  }

  componentDidMount() {

  }
  changeType=(value)=>{
    this.setState({role:value})
  }
  addGoods = () => {
    this.props.push('/addGoods')
  }

  render() {
    const { userInfo } = this.props;
    const { isFetching } = this.state;
    const tableHead = ['id', '管理员姓名', '手机号码', '账号', '管理员身份', '操作'];
    return (
      <div className="manage-list-container">
        <Button type="primary" onClick={this.addManage} >添加管理员</Button>
        <div style={{ marginTop: '36px' }}>
          {manageData.length > 0 && <CommonTable
            head={tableHead}
            body={manageData.map((item, index) => (
              <tr key={index}>
                <td className='max-width'>{item.id}</td>
                <td className='max-width'>{item.name}</td>
                <td className='max-width'>{item.phone}</td>
                <td className='max-width'>{item.account}</td>
                <td className='max-width'>{item.account}</td>
                <td className='operate-container'>
                  <span data-goodid={item.index} onClick={this.editManage} className='delete-store'>编辑</span><br />
                  <span data-goodid={item.index} onClick={this.cancelManage} className='delete-store'>删除</span><br />
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
            <p style={{fontSize:'16px',fontWeight:900}}>编辑/添加管理员</p>
            <div className="font-top">
              <label className='font-right' style={{ marginRight: '96px' }}> 管理员姓名</label><Input className="input-style" placeholder="
请输入管理员姓名" onClick={(e) => { this.setState({ manageName: e.target.value }) }} />
            </div>
            <div className="font-top">
              <label className='font-right' style={{ marginRight: '108px' }}> 手机号码</label><Input className="input-style" placeholder="请输入联系方式" onClick={(e) => { this.setState({ phone: e.target.value }) }} />
            </div>
            <div className="font-top">
              <label className='font-right' style={{ marginRight: '96px' }}> 管理员账号</label><Input className="input-style" placeholder="请输入管理员账号" onClick={(e) => { this.setState({ account: e.target.value }) }} />
            </div>
            <div className="font-top">
              <label className='font-right' style={{ marginRight: '96px' }}> 管理员密码</label><Input className="input-style" placeholder="请输入管理员密码" onClick={(e) => { this.setState({ password: e.target.value }) }} />
            </div>
            <div className="font-top">
              <label className='font-right' style={{ marginRight: '96px' }}> 管理员身份</label>
              <Select
                style={{ width: 300 }}
                placeholder="请选择管理员身份"
                onChange={this.changeType}          
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
              </Select>
            </div>
            <div className="font-top">
              <Button type="primary" onClick={this.addManage} >添加</Button>
              <Button style={{marginLeft:'16px'}} onClick={this.cancalManage} >取消</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageList);
