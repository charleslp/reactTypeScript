import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import "./index.less";
import { Input, Button } from 'antd';
@withRouter
class IntegralRatio extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      oneNeed:'', // 每抵扣1元所需积分
      oneGet:'',  //每消费1元可获得积分
      signGet:'', //签到可获得积分
      infoGet:'', // 完善个人资料可获得积分
      shareGet:'', // 每分享1篇资讯可获得积分
      goodsGet:'', //每分享1个商品可获得积分
    }
  }

  componentDidMount() {
    
  }
  
  render() {
    const { userInfo } = this.props;
    return (
      <div className="integral-ratio-container">
        <p className="font-style">积分规则设置</p>
        <div className="font-top">
          <label className='font-right' style={{marginRight:'116px'}}> 每抵扣1元所需</label><Input className="input-style" placeholder="请输入积分" onClick={(e)=>{this.setState({oneNeed:e.target.value})}}/>
        </div>
        <div className="font-top">
          <label className='font-right' style={{marginRight:'96px'}}> 每消费1元可获得</label><Input className="input-style" placeholder="请输入积分" onClick={(e)=>{this.setState({oneGet:e.target.value})}}/>
        </div>
        <div className="font-top">
          <label className='font-right' style={{marginRight:'145px'}}> 签到可获得</label><Input className="input-style" placeholder="请输入积分" onClick={(e)=>{this.setState({signGet:e.target.value})}}/>
        </div>
        <div className="font-top">
          <label className='font-right' style={{marginRight:'66px'}}> 完善个人资料可获得</label><Input className="input-style" placeholder="请输入积分" onClick={(e)=>{this.setState({infoGet:e.target.value})}}/>
        </div>
        <div className="font-top">
          <label className='font-right'> 每分享1篇资讯可获得<br/><span>(多次分享1篇资讯仅可获得1次积分)</span></label><Input className="input-style input-spc" placeholder="请输入积分" onClick={(e)=>{this.setState({shareGet:e.target.value})}}/>
        </div>
        <div className="font-top">
          <label className='font-right'> 每分享1个商品可获得<br/><span>(多次分享1个商品仅可获得1次积分)</span></label><Input className="input-style input-spc" placeholder="请输入积分" onClick={(e)=>{this.setState({goodsGet:e.target.value})}}/>
        </div>
      <div style={{marginTop:'60px'}}><Button type="primary" className="keep-btn">保存</Button></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(IntegralRatio);
