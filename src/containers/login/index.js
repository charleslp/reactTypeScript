import React from 'react';
import { connect } from 'react-redux';
import { getLoginInfo, getStatus } from '../../store/actions';
import { withRouter } from 'react-router-dom';
import "./index.less";
import { message } from 'antd';

// import { Hello } from "../components/Hello.tsx";
@withRouter
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName:'', //账号
      password:'', //密码
      captchaCode:'', //验证码
      captchaImage: 'common/imagecode/get',
      captchaWidth: '60',
      captchaHeight: '20',
      captchaSize: '4',
      timestamp: 0,
    }
  }
  
  componentDidMount () {
    message.config({
      top: 300,
    });
    console.log(process.env.NODE_ENV, 'NODE_ENV');
    let captchaImage = this.state.captchaImage;
    this.setState({
        captchaImage: `${captchaImage}/num/${this.state.captchaSize}/w/${this.state.captchaWidth}/h/${this.state.captchaHeight}`
    });
  }
  updateCaptcha = () => {
    // const ele = ReactDOM.findDOMNode(this._child);
    // console.log(this, '----ele-----');
    // ele.src = `${this.state.captchaImage}?v=` + Date.now();
    console.log(111)
    this.setState({
        timestamp: +new Date()
    });
  }
  userNameChanged = (event) => {
    this.setState({
        userName: event.target.value
    });
  }
  passwordChanged = (event) => {
    this.setState({
        password: event.target.value
    });
  }
  captchaChanged = (event) => {
    this.setState({captchaCode: event.target.value});
  }
  goDetail() {
    this.props.history.push('/detail', { id: 123456 })
  }
  loginFn = () => {
    message.info('用户名错误');
    this.props.history.push('/home', { id: 123456 })
  }
  render() {
    const { userInfo } = this.props;
    return (
      <div className="login-container">
      <div className="logo-box">
        <div className='logo-pic' src="http://img2.imgtn.bdimg.com/it/u=4134324637,50714887&fm=26&gp=0.jpg" />
      </div>
      <div className="login-box">
        <p className="box-title">管理后台登录</p>
        <div className='input-group'>
          <span className='login-title'>账号：</span><input className='info-box' type='text' maxLength='20' placeholder='请输入账号' onChange={this.userNameChanged}  />
        </div>
        <div className='input-group'>
          <span className='login-title'>密码：</span><input className='info-box' type='password' maxLength='20' placeholder='请输入密码' onChange={this.passwordChanged} />
        </div>
        {/* 验证码部分 */}
        <div className="code-box">
          <span className='captcha-textbox' style={{float: 'left'}}>
              <input type='info-box' maxLength='4' placeholder='输入验证码' onChange={this.captchaChanged} />
          </span>
          <span className='captcha-image'>
              <img ref={child => this._child = child} src={`${this.state.captchaImage}?v=${this.state.timestamp}`} alt='图片验证码' />
          </span>
          <span className='captcha-action' style={{float: 'right'}}>
              <a href='javascript:;' onClick={this.updateCaptcha}> 看不清？换一张</a>
          </span>
        </div>
        <div className="login-btn" onClick={this.loginFn}>登录</div>
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
