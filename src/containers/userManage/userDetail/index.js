import React from 'react';
import { connect } from 'react-redux';
import { getLoginInfo, getStatus } from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import "./index.less";
import { message } from 'antd';
import { Input, Button, Select } from 'antd';
import CommonTable from '../../../components/CommonTable';

const treatData = [
  {
    treatTime: 13232,
    firstSymptom: '头疼',
    secondSymptom: '鼻涕',
    isPay: "是",
  },
  {
    treatTime: 13232,
    firstSymptom: '头疼',
    secondSymptom: '鼻涕',
    isPay: "是",
  }
]
const appointmentData = [
  {
    orderId: 1233,
    orderTime: '202020',
    name: '呢哼',
    phone: 1853483483,
    doctor: '南山',
    appointTime: '323233',
    appointStroe: '缤纷店',
    paySum: 32323,
    appointStatus: '待支付',
  },
]
const annualCardData = [
  {
    serialId:122321312,
    buyTime:233333,
    validityTime:232323,
    specification:30,
    paySum:100.00
  },
  {
    serialId:122321312,
    buyTime:233333,
    validityTime:232323,
    specification:30,
    paySum:100.00
  }
]
const consumeData = [
  {
    orderTime:123131,
    orderNumber:21213,
    userName:'赵云',
    consignee:'刘备',
    phone:187663663,
    discounts:'使用了一些优惠券',
    paySum:1000,
    orderStatus:1,
    afterSale:3,
  },
  {
    orderTime:123131,
    orderNumber:21213,
    userName:'赵云',
    consignee:'刘备',
    phone:187663663,
    discounts:'使用了一些优惠券',
    paySum:1000,
    orderStatus:1,
    afterSale:3,
  }
]
const courseData = [
  {
    payTime:322332,
    title:'这是一个标题',
    pic:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3568668377,3428421758&fm=26&gp=0.jpg',
    label:'热情',
    price:100.00
  }
]
@withRouter
class UserList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keyWord: '', //搜索词
      isFetching: false,
      tabIndex: 0,
      showRecharge:true,
      chargeCount:'', // 充值金额
      presentCount:'', // 赠送金额
    }
  }

  componentDidMount() {
    message.config({
      top: 300,
    });
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
  checkDetail = (e) => {
    const id = e.target.getAttribute('data-userid');
    this.props.history.push('/listDetail', { id: id })
  }
  checkNtegral = (e) => {
    const id = e.target.getAttribute('data-userid');
    this.props.history.push('/listDetail', { id: id })
  }
  changeSum = (e)=>{
    this.setState({chargeCount:e.target.value})
  }
  changePresent = (e)=>{
    this.setState({presentCount:e.target.value})
  }
  render() {
    const { userInfo } = this.props;
    const { isFetching, tabIndex } = this.state;
    const appointmentHead = ['订单号', '下单时间', '姓名', '手机号', '预约医师', '预约时间', '预约门店', '支付金额', '状态', '操作']
    const annualCarHead = ['流水号','购买时间','有效期(天)','规格(次)','支付金额']
    const treatHead = ['诊疗时间','一级症状','二级症状', '是否支付','操作']
    const consumeHead = ['下单时间','订单编号','用户昵称','收货人姓名','手机号码','使用优惠','支付金额','订单状态','是否申请售后','操作']
    const courseHead = ['购买时间','标题','封面图','标签','价格']
    const labList = ['预约记录', '年卡购买记录', '诊疗记录', '订到消费记录', '付费课程记录'];
    return (
      <div className="user-detail-container">
        <div className="user-info-box">
          <div className="user-info-header">
            <span className="user-info-title">用户信息</span>
            <Button type="primary" style={{ float: 'right' }} className="integral-btn" onClick={this.getExcel}>积分明细</Button>
            <Button type="primary" style={{ marginRight: '20px', float: 'right' }} className="balance-btn" onClick={this.getExcel}>余额明细</Button>
          </div>
          <div>
            <label>头像：</label><img className="user-portrait" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3568668377,3428421758&fm=26&gp=0.jpg" />
            <label style={{ marginLeft: '80px' }}>用户类型：</label><span className="info-text">普通用户</span>
            <label style={{ marginLeft: '60px' }}>积分余额：</label><span>199</span>
          </div>
          <div style={{ marginTop: '30px' }}>
            <label>用户昵称：</label><span className="info-text">那你呢</span>
            <label style={{ marginLeft: '10px' }}>注册时间：</label><span className="info-text">普通用户</span>
            <label style={{ marginLeft: '60px' }}>钱包余额</label><span className="info-text">199</span> <span className="recharge-auto" onClick={this.rechargeFn}>手动充值</span>
          </div>
        </div>
        <div className="user-info-box" style={{ marginTop: '20px', height: '200px' }}>
          <div className="user-info-header">
            <span className="user-info-title">年卡信息</span>
          </div>
          <p>暂无年卡</p>
          <div>
            <label>剩余次数：</label><span className="info-text">普通用户</span>
            <label style={{ marginLeft: '60px' }}>剩余有效期：</label><span>199</span>
          </div>
          <div style={{ marginTop: '40px' }}>
            <label>已使用次数：</label><span className="info-text">那你呢</span>
            <label style={{ marginLeft: '46px' }}>购买时间：</label><span className="info-text">普通用户</span>
          </div>
        </div>
        <div className="user-info-box" style={{ marginTop: '20px', height: '200px' }}>
          <div className="user-info-header">
            <span className="user-info-title">健康档案信息</span>
          </div>
          <div>
            <label>真实姓名：</label><span className="info-text">普通用户</span>
            <label style={{ marginLeft: '60px' }}>年龄：</label><span>199</span>
          </div>
          <div style={{ marginTop: '40px' }}>
            <label>性别：</label><span className="info-text">那你呢</span>
            <label style={{ marginLeft: '86px' }}>手机号：</label><span className="info-text">普通用户</span>
          </div>
        </div>
        <div className="table-list-box">
          <div className="tab-list-box">
            {labList.map((item, index) => {
              return (
                <p key={index} onClick={() => { this.setState({ tabIndex: index }) }} className={`tab-default ${tabIndex === index && 'tab-current'}`}>{item}</p>
              )
            })}
          </div>
          {appointmentData.length > 0 && tabIndex == 0 && <CommonTable
              head={appointmentHead}
              isFetching={isFetching}
              body={appointmentData.map(item => (
                <tr key={item.orderId}>
                  <td className='max-width'>{item.orderId}</td>
                  <td className='max-width'>{item.orderTime}</td>
                  <td className='max-width'>{item.name}</td>
                  <td className='max-width'>{item.phone}</td>
                  <td className='max-width'>{item.doctor}</td>
                  <td className='max-width'>{item.appointTime}</td>
                  <td className='max-width'>{item.appointStroe}</td>
                  <td className='max-width'>{item.paySum}</td>
                  <td className='max-width'>{item.appointStatus}</td>
                  {/* <td className={`${item.status == 1? 'able-status':'disable-status'} `}>{item.status ==1 ? "正常":"停用"}</td> */}
                  <td className='operate-container'>
                    <span data-orderid={item.orderId} onClick={this.checkOrder} className='delete-store'>核销</span><br />
                    <span data-orderid={item.orderId} onClick={this.cancleOrder} className='edit-store'>取消订单</span><br />
                    <span data-orderid={item.orderId} onClick={this.checkDetail} className='edit-store'>查看详情</span>
                  </td>
                </tr>
              ))
              }
            // current={pageNum}
            // total={total}
            // onChange={this.nextPageHandle}
            />}
          {annualCardData.length > 0 && tabIndex === 1 && <CommonTable
            head={annualCarHead}
            isFetching={isFetching}
            body={annualCardData.map(item => (
              <tr key={item.serialId}>
                <td className='max-width'>{item.serialId}</td>
                <td className='max-width'>{item.buyTime}</td>
                <td className='max-width'>{item.validityTime}</td>
                <td className='max-width'>{item.specification}</td>
                <td className='max-width'>{item.paySum}</td>
              </tr>
            ))
            }
          // current={pageNum}
          // total={total}
          // onChange={this.nextPageHandle}
          />}
          {treatData.length > 0 && tabIndex == 2 && <CommonTable
              head={treatHead}
              isFetching={isFetching}
              body={treatData.map(item => (
                <tr key={item.treatTime}>
                  <td className='max-width'>{item.treatTime}</td>
                  <td className='max-width'>{item.firstSymptom}</td>
                  <td className='max-width'>{item.secondSymptom}</td>
                  <td className='max-width'>{item.isPay}</td>
                  <td className='operate-container'>
                    <span data-orderid={item.orderId} onClick={this.checkSymptom} className='delete-store'>查看详情</span><br />
                  </td>
                </tr>
              ))
              }
            // current={pageNum}
            // total={total}
            // onChange={this.nextPageHandle}
            />}
            {consumeData.length > 0 && tabIndex == 3 && <CommonTable
              head={consumeHead}
              isFetching={isFetching}
              body={consumeData.map(item => (
                <tr key={item.orderNumber}>
                  <td className='max-width'>{item.orderTime}</td>
                  <td className='max-width'>{item.orderNumber}</td>
                  <td className='max-width'>{item.userName}</td>
                  <td className='max-width'>{item.consignee}</td>
                  <td className='max-width'>{item.phone}</td>
                  <td className='max-width'>{item.discounts}</td>
                  <td className='max-width'>{item.paySum}</td>
                  <td className='max-width'>{item.orderStatus}</td>
                  <td className='max-width'>{item.afterSale}</td>
                  <td className='operate-container'>
                    <span data-ordernum={item.orderNumber} onClick={this.checkConsume} className='delete-store'>查看详情</span><br />
                    <span data-ordernum={item.orderNumber} onClick={this.deliverFn} className='delete-store'>发货</span>
                  </td>
                </tr>
              ))
              }
            // current={pageNum}
            // total={total}
            // onChange={this.nextPageHandle}
            />}
            {courseData.length > 0 && tabIndex === 4 && <CommonTable
            head={courseHead}
            isFetching={isFetching}
            body={courseData.map(item => (
              <tr key={item.serialId}>
                <td className='max-width'>{item.payTime}</td>
                <td className='max-width'>{item.title}</td>
                <td className='max-width'><img className="course-pic" src={item.pic}/></td>
                <td className='max-width'>{item.label}</td>
                <td className='max-width'>{item.price}</td>
              </tr>
            ))
            }
          // current={pageNum}
          // total={total}
          // onChange={this.nextPageHandle}
          />}
        </div>
        {this.state.showRecharge && <div className="modal-panle">
          <div className='recharge-box'>
            <p className='recharge-box-title'>手动充值</p>
            <span className="recharge-tip-style">充值金额</span>
            <Input placeholder="请输入数值" onChange={this.changeSum} className="charge-input" />
            <span className="recharge-tip-style">赠送金额</span>
            <Input placeholder="请输入数值" onChange={this.changePresent} className="charge-input" />
            <Button type="primary" className="recharge-btn">充值</Button>
            <div className='recharge-close' onClick={()=>{this.setState({showRecharge:false})}}></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
