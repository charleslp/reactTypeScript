import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {  Button } from 'antd';
import "./index.less";
import Editor from '../../../components/editor';
@withRouter
class IntegralExplain extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  componentDidMount() {
    
  }
  onMessage = (content) => {
    console.log(content,'富文本返回的内容')
  }
  render() {
    const { userInfo } = this.props;
    return (
      <div className="integral-explain-container">
        <p className="font-style">积分说明</p>
        <Editor onMessage={this.onMessage} />
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

export default connect(mapStateToProps, mapDispatchToProps)(IntegralExplain);
