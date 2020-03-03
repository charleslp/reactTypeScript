import React from 'react';
import { connect } from 'react-redux';
import { getLoginInfo, getStatus } from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import "./index.less";
import { message,Button,DatePicker } from 'antd';
import CommonTable from '../../../components/CommonTable';
const { RangePicker } = DatePicker;
const integralData = [
  {
    remark:'这个一条备注',
    type:'收入',
    integraCount:100,
    time:'2222222',
    integraLast:200
  },
  {
    remark:'这个一条备注',
    type:'收入',
    integraCount:100,
    time:'2222222',
    integraLast:200
  }
]
@withRouter
class IntegralList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate:'', // 开始日期
      endDate:'', // 结束日期
      isFetching:false,
    }
  }

  componentDidMount() {
    message.config({
      top: 300,
    });
  }
  changeData=(value, dateString)=>{
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString,dateString);
    this.setState({startDate:dateString[0],endDate:dateString[1]})
  }
  onOk = ()=>{
    
  }
  // 时间戳转日期
  timestampToTime = (timestamp) => {
    let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    return Y + M + D + h + m + s;
  }
  
  render() {
    const { userInfo } = this.props;
    const { isFetching } = this.state;
    
    const tableHead = ['备注', '收支类型', '积分', '时间', '积分余额'];
    return (
      <div className="integral-detail-container">
        <span className='page-title'>积分明细</span><label>选择日期</label>
        <RangePicker style={{width:'380px',marginLeft:'10px'}} showTime={{ format: 'HH:mm:ss' }} format="YYYY-MM-DD HH:mm:ss" onChange={this.changeData} onOk={this.onOk}/>
        <Button type="primary" className="get-excel" onClick={this.getExcel}>导出excel</Button>
        <div style={{marginTop:'36px'}}>
          {integralData.length > 0 && <CommonTable
            head={tableHead}
            isFetching={isFetching}
            body={integralData.map(item => (
              <tr key={item.serialId}>
                <td className='max-width'>{item.remark}</td>
                <td className='max-width'>{item.type}</td>
                <td className='max-width'>{item.integraCount}</td>
                <td className='max-width'>{item.time}</td>
                <td className='max-width'>{item.integraLast}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(IntegralList);
