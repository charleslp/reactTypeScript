import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import "./index.less";
import { Input } from 'antd';
@withRouter
class IntegralRatio extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      oneNeed:'', // 每抵扣1元所需积分
    }
  }

  componentDidMount() {
    
  }
  
  render() {
    const { userInfo } = this.props;
    return (
      <div className="integral-ratio-container">
        <p>积分规则设置</p>
        <div>
          <label> 每抵扣1元所需</label><Input className="input-style" placeholder="请输入积分" onClick={(e)=>{this.setState({oneNeed:e.target.value})}}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(IntegralRatio);
