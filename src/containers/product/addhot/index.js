import React from 'react';
import { connect } from 'react-redux';
import { getLoginInfo, getStatus } from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import "./index.less";
import { message,Button,Select,Input } from 'antd';
import CommonTable from '../../../components/CommonTable';

@withRouter
class AddGoods extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        serial:'',
        hotword:'',
    }
  }

  componentDidMount() {
    message.config({
      top: 300,
    });
  }
  addGoods=()=>{
    this.props.push('/addGoods')
  }
  changeSymptom = (value) => {
    this.setState({relevanceSymptom:value})
  }
  render() {
    const { userInfo } = this.props;
    
    return (
      <div className="add-hot-container">
        <p className="user-info-title" style={{marginBottom:'30px'}}>编辑/添加热门搜索字段</p>
        <span className="recharge-tip-style">排序序号</span>
        <Input placeholder="请输入排序序号" onChange={(e)=>{this.setState({serial:e.target.value})}} className="charge-input" />
        <span className="recharge-tip-style">热门搜索字段</span>
        <Input placeholder="请输入热门搜索字段" onChange={(e)=>{this.setState({hotword:e.target.value})}} className="charge-input" />
        <div>
            <Button className="in-btn" style={{marginRight:'30px'}}>取消</Button>
            <Button type="primary" className="in-btn">保存</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddGoods);
