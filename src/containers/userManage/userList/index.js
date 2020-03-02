import React from 'react';
import { connect } from 'react-redux';
import { getLoginInfo, getStatus } from '../../store/actions';
import { withRouter } from 'react-router-dom';
import "./index.less";
import { message } from 'antd';

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
@withRouter
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  
  componentDidMount () {
    message.config({
      top: 300,
    });
  }
  userNameChanged = (event) => {
    this.setState({
        userName: event.target.value
    });
  }
  
  
  render() {
    const { userInfo } = this.props;
    return (
      <div className="user-list-container">
        <div className="data-list-box">
          {data.length>0 && data.map((item)=>{
            return(
              <div className="data-box">d</div>
            )
          })

          }
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
