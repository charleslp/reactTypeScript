import { connect } from 'react-redux';
import { getLoginInfo, getStatus } from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import "./index.less";
import CommonTable from '../../../components/CommonTable';
import React, { useState } from 'react';
import { Tree, Button } from 'antd';
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
      goodsName:'', //商品名称
      autoExpandParent:true,
      expandedKeys:[],
      checkedKeys:[],
      selectedKeys:[],
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
    const tableHead = ['菜单名称', '菜单url', '菜单等级', '上级菜单', '操作'];
    return (
      <div className="menu-list-container">
        <Button type="primary" onClick={this.addMenu} >添加菜单</Button>
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
