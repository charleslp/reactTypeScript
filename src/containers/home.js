import React from 'react';
import { connect } from 'react-redux';
import { getLoginInfo, getStatus } from '../store/actions';
import { withRouter } from 'react-router-dom';
// import { Hello } from "../components/Hello.tsx";

const userInfo = {
  name:'bill snow',
  say:'hello world,bill',
  like:'music'
}
@withRouter
class Home extends React.Component{
  constructor(props){
    super(props)
    this.state={

    }
  }
  componentDidMount() {
    console.log(process.env.NODE_ENV,'NODE_ENV');
    const {fetchUserInfo} = this.props;
    fetchUserInfo(userInfo)
  }
  goDetail(){
    console.log(this.props,'this.props====');
    this.props.history.push('/detail',{id:123456})
  }
  render(){
    const {userInfo} = this.props;
    return <div>
      <p>Home 页面 {userInfo.say}</p>
      {/* <Hello compiler="TypeScript" framework="React" />, */}
      <div onClick={this.goDetail.bind(this)}>跳转到详情页面</div>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
