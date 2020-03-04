import React from 'react';
import { connect } from 'react-redux';
import { getLoginInfo, getStatus } from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import "./index.less";
import { message } from 'antd';
import { Input, Button, Select   } from 'antd';
import CommonTable from '../../../components/CommonTable';
import { getMenuList } from "../../../service/index"


const data = [
  {
    type:'用户总数',
    count:200
  },
  {
    type:'今日新增用户数',
    count:200
  },
  {
    type:'今日预约用户数',
    count:200
  },
  {
    type:'今日诊疗次数',
    count:200
  },
  {
    type:'今日商城下单用户数',
    count:200
  }
]
const tableData = [
  {
    id:1,
    pic:1,
    name:'tom',
    type:"普通",
    conut:2,
    storeCount:6,
    onlineCount:10,
    time:'2020-3-2',
    registerTime:'2020-2-2'
  },
  {
    id:1,
    pic:1,
    name:'tom',
    type:"普通",
    storeCount:6,
    onlineCount:10,
    time:'2020-3-2',
    registerTime:'2020-2-2'
  }
]
@withRouter
class UserList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keyWord:'', //搜索词
      isFetching:false,
    }
  }
  
  componentDidMount () {
    message.config({
      top: 300,
    });
    getMenuList({page_index:1,page_size:10})
      .then(res => {
        const {data} = res
        if (+data.status == 1) {
          this.setState({storeOriginList:data.data.list,total:data.data.total})
        } else {
          errorTip(data.msg);
        }
      })
      .catch(err => {
        errorTip("服务器出错了!!!");
      })
  }
  ChangeWord = (event) => {
    console.log(111)
    this.setState({
        keyWord: event.target.value
    });
  }
  changeType = (value) => {
    console.log(value)
  }
   // 时间戳转日期
   timestampToTime = (timestamp) => {
    let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()) + ':';
    let s = (date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds())
    return Y+M+D+h+m+s;
  }
  checkDetail = (e) => {
    const id = e.target.getAttribute('data-userid');
    this.props.history.push('/userDetail', { id: id })
  }
  checkNtegral = (e) => {
    const id = e.target.getAttribute('data-userid');
    this.props.history.push('/userDetail', { id: id })
  }
  
  render() {
    const { userInfo } = this.props;
    const {isFetching} = this.state;
    const tableHead=['id','头像','名称', '用户类型','门店预约次数', '线上诊疗次数','最近诊疗时间','注册时间', '操作']
    return (
      <div className="user-list-container">
        <div className="data-list-box">
          {data.length>0 && data.map((item,index)=>{
            return(
              <div className="data-box" key={index}>
                <p>{item.type}</p>
                <p>{item.count}</p>
              </div>
            )
          })
          }
        </div>
        
        <Input className='word-input' size="small" placeholder="请输入昵称或姓名进行搜索" onChange={this.ChangeWord}/>
        <Button type="primary" className="search-btn" onClick={this.searchFn}>搜索</Button>
        <label>用户筛选类型</label>
        <Select
          style={{ width: 200,marginLeft:'10px' }}
          placeholder="请选择用户类型"
          onChange={this.changeType}          
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="tom">Tom</Option>
        </Select>
        <Button type="primary" style={{marginLeft:'120px'}} className="search-btn" onClick={this.getExcel}>导出excel</Button>
        {tableData.length > 0 && <CommonTable
          head={tableHead}
          isFetching={isFetching}
          body={tableData.map(item => (
            <tr key={item.id}>
              <td className='max-width'>{item.id}</td>
              <td style={{color: '#666'}} className='max-width'>{item.pic}</td>
              <td className='max-width'>{item.name}</td>
              <td className='max-width'>{item.type}</td>
              <td className='max-width'>{item.storeCount}</td>
              <td className='max-width'>{item.onlineCount}</td>
              <td className='max-width'>{item.time}</td>
              <td className='max-width'>{item.registerTime}</td>
              {/* <td className={`${item.status == 1? 'able-status':'disable-status'} `}>{item.status ==1 ? "正常":"停用"}</td> */}
              <td className='operate-container'>
                <span data-userid={item.id} onClick={this.checkDetail} className='edit-store'>查看详情</span><br />
                {/* <span data-roleid={item.id} onClick={this.operateStoreHandle} className='operate-store'>启用</span> */}
                <span data-userid={item.id} onClick={this.checkNtegral} className='delete-store'>积分明细</span>
              </td>
            </tr>
          ))

          }
          // current={pageNum}
          // total={total}
          // onChange={this.nextPageHandle}
        />}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
