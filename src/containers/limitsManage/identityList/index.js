import { connect } from 'react-redux';
import { getLoginInfo, getStatus } from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import "./index.less";
import CommonTable from '../../../components/CommonTable';
import React, { useState } from 'react';
import { Tree, Button, Input } from 'antd';
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
const identityData = [
  {
    identity:'超级管理员',
    range:'是打发斯蒂芬',
  },
]
@withRouter
class IdentityList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      autoExpandParent:true,
      expandedKeys:[],
      checkedKeys:[],
      selectedKeys:[],
      identityName:'',
    }
  }

  componentDidMount() {
    
  }
  onExpand = (expandedKeys) => {
    this.setState({expandedKeys:expandedKeys,autoExpandParent:false})
  }
  onCheck = (checkedKeys) => {
    console.log(checkedKeys,'checkedKeys----');
    this.setState({checkedKeys:checkedKeys})
  }
  onSelect = (selectedKeys) => {
    console.log(selectedKeys,'selectedKeys是多少----');
    this.setState({selectedKeys:selectedKeys})
  }
  addGoods=()=>{
    this.props.push('/addGoods')
  }
  
  render() {
    const { userInfo } = this.props;
    const { isFetching } = this.state;
    const tableHead = ['管理员身份', '管理模块', '操作'];
    return (
      <div className="identity-list-container">
        <Button type="primary" onClick={this.addIdentity} >新建身份</Button>
        <div style={{marginTop:'36px'}}>
          {identityData.length > 0 && <CommonTable
            head={tableHead}
            body={identityData.map((item,index) => (
              <tr key={index}>
                <td className='max-width'>{item.identity}</td>
                <td className='max-width'>{item.range}</td>
                <td className='operate-container'>
                    <span data-goodid={item.index} onClick={this.editIdentity} className='delete-store'>编辑</span><br />
                    <span data-goodid={item.index} onClick={this.cancelIdentity} className='delete-store'>删除</span><br />
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
            <p style={{fontSize:'16px',fontWeight:900}}>编辑/添加身份</p>
            <div className="font-top">
              <label className='font-right' style={{ marginRight: '96px' }}> 身份名称</label><Input className="input-style" placeholder="
请输入管理员姓名" onClick={(e) => { this.setState({ identityName: e.target.value }) }} />
            </div>
            <Tree
              checkable
              onExpand={this.onExpand}
              expandedKeys={this.state.expandedKeys}
              autoExpandParent={this.state.autoExpandParent}
              onCheck={this.onCheck}
              checkedKeys={this.state.checkedKeys}
              onSelect={this.onSelect}
              selectedKeys={this.state.selectedKeys}
              treeData={treeData}
            />
            <div className="font-top">
              <Button type="primary" onClick={this.submitIdentity} >确定</Button>
              <Button style={{marginLeft:'16px'}} onClick={this.cancalIdentity} >取消</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(IdentityList);
