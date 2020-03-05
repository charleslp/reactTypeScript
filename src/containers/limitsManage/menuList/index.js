import { connect } from 'react-redux';
import { getLoginInfo, getStatus } from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import "./index.less";
import CommonTable from '../../../components/CommonTable';
import React, { useState } from 'react';
import { Tree, Button, Input, Select, message, Modal} from 'antd';
import { getMenuList, addMenu,selectMenuList,deleteMenu } from "../../../service/index"

const { Option } = Select;
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
      selectList:[],
      isDisable:false,
      secondMenu:[],
      thirdMenu:[],
      visible:false,
      menuId:'',
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
      this.getSelectList()
  }
  getSelectList = () => {
    selectMenuList()
      .then(res => {
        const {data} = res
        console.log(data,'=====data===');
        this.setState({selectList:data.result})
      })
      .catch(err => {
        message.error("服务器出错了!!!");
      })
  }
  addMenu = () => {
    this.setState({showAdd:true})
  }
  changeRank = (value) => {
    console.log(value,'--等级');
    if(value == 1){
      this.setState({isDisable:true})
    }else if(value == 2){
      let secondMenu = this.state.selectList.filter((item)=>{return +item.type ==1})
      console.log(secondMenu,'加油')
      this.setState({secondMenu:secondMenu,isDisable:false})
    }else if(value == 3){
      let thirdMenu = this.state.selectList.filter((item)=>{return +item.type ==2})
      this.setState({thirdMenu:thirdMenu,isDisable:false})
    }
    this.setState({rank:value})
  }
  changeParent = (value) => {
    console.log(value,'--选择');
    this.setState({parent:value})
  }
  submitMenu = () => {
    
    let params = {
      menu_name:this.state.menuName,
      menu_url:this.state.menuUrl,
      fid:this.state.parent,
      type:this.state.rank,
    }
    console.log(params,'--params-s')
    addMenu(params)
    .then(res => {
      const {data} = res
      if(data.result){
        message.success("菜单添加成功");
        this.setState({showAdd:false})
      }
    })
    .catch(err => {
      message.error("服务器出错了!!!");
    })
  }
  cancalMenu=()=>{
    this.setState({showAdd:false})
  }
  changeUrl = (e) =>{
    this.setState({ menuUrl: e.target.value })
  }
  changeName = (e) =>{
    this.setState({ menuName: e.target.value })
  }
  cancelMenu = (e) => {
    console.log(e.target.getAttribute('data-menuid'))
    const menuId = e.target.getAttribute('data-menuid');
    this.setState({menuId:menuId,visible:true})
  }
  editMenu = (e) => {
    console.log(e.target.getAttribute('data-menuid'))
    const idx = e.target.getAttribute('data-menuid');
    this.setState({rank:this.state.menuList[idx].type,parent:this.state.menuList[idx].fid,menuUrl:this.state.menuList[idx].menu_url,menuName:this.state.menuList[idx].menu_name,showAdd:true})
    if(this.state.menuList[idx].type == 1){
      this.setState({isDisable:true})
    }else if(this.state.menuList[idx].type == 2){
      let secondMenu = this.state.selectList.filter((item)=>{return +item.type ==1})
      console.log(secondMenu,'加油')
      this.setState({secondMenu:secondMenu,isDisable:false})
    }else if(this.state.menuList[idx].type == 3){
      let thirdMenu = this.state.selectList.filter((item)=>{return +item.type ==2})
      this.setState({thirdMenu:thirdMenu,isDisable:false})
    }
  }
  deleteMenu=()=>{
    deleteMenu({id:this.state.menuId})
    .then(res => {
      const {data} = res
      this.setState({visible:false})
    })
    .catch(err => {
      message.error("服务器出错了!!!");
    })
  }
  hideModal=()=>{
    this.setState({visible:false})
  }
  render() {
    const { userInfo } = this.props;
    const { isFetching,menuList,rank } = this.state;
    let menuListArr = this.state.selectList;
    if(rank==1){
      menuListArr = this.state.selectList
    }else if(rank==2){
      menuListArr = this.state.secondMenu
    }else if(rank==3){
      menuListArr = this.state.thirdMenu
    }
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
                    <span data-menuid={index} onClick={this.editMenu} className='delete-store'>编辑</span><br />
                    <span data-menuid={item.id} onClick={this.cancelMenu} className='delete-store'>删除</span><br />
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
              <label className='font-right' style={{ marginRight: '96px' }}> 菜单名称</label><Input value={this.state.menuName} className="input-style" placeholder="
请输入菜单名称" onChange={this.changeName} />
            </div>
            <div className="font-top">
              <label className='font-right' style={{ marginRight: '108px' }}> 菜单url</label><Input value={this.state.menuUrl} className="input-style" placeholder="请输入菜单url" onChange={this.changeUrl} />
            </div>
            <div className="font-top">
              <label value={this.state.rank} className='font-right' style={{ marginRight: '96px' }}> 菜单等级</label>
              <Select
                value={this.state.rank}
                style={{ width: 300 }}
                placeholder="请选择菜单等级"
                onChange={this.changeRank}          
              >
                <Option value="1">一级菜单</Option>
                <Option value="2">二级菜单</Option>
                <Option value="3">三级菜单</Option>
              </Select>
            </div>
            <div className="font-top">
              <label className='font-right' style={{ marginRight: '96px' }}> 上级菜单</label>
              <Select
                value={this.state.parent}
                style={{ width: 300 }}
                placeholder="请选择上级菜单"
                onChange={this.changeParent}  
                disabled={this.state.isDisable}        
              >
              {menuListArr.length>0 && menuListArr.map((item,index)=>{
                return(
                  <Option key={index} value={item.type}>{item.menu_name}</Option>
                )
              })}
              </Select>
            </div>
            <div className="font-top">
              <Button type="primary" onClick={this.submitMenu} >确定</Button>
              <Button style={{marginLeft:'16px'}} onClick={this.cancalMenu} >取消</Button>
            </div>
          </div>
        </div>}
        <Modal
          title="删除"
          visible={this.state.visible}
          onOk={this.deleteMenu}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
        >
          <p>是否删除菜单？</p>
        </Modal>
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
