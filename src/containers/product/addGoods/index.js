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
      disPrice:'',
      goodsName:'',
      serial:'',
      payPrice:'',
      relevanceSymptom:'',
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
      <div className="add-goods-container">
        <p className="user-info-title" style={{marginBottom:'30px'}}>新增商品</p>
        <span className="recharge-tip-style">排序序号</span>
        <Input placeholder="请输入商品序号" onChange={(e)=>{this.setState({serial:e.target.value})}} className="charge-input" />
        <span className="recharge-tip-style">商品名称</span>
        <Input placeholder="请输入商品名称" onChange={(e)=>{this.setState({goodsName:e.target.value})}} className="charge-input" />
        <span className="recharge-tip-style">划线价格</span>
        <Input placeholder="请输入商品划线价格" onChange={(e)=>{this.setState({disPrice:e.target.value})}} className="charge-input" />
        <span className="recharge-tip-style">支付价格</span>
        <Input placeholder="请输入商品支付价格" onChange={(e)=>{this.setState({payPrice:e.target.value})}} className="charge-input" />
        <span className="recharge-tip-style">关联症状</span>
        <Select
          style={{ width: 300 }}
          placeholder="请选择症状"
          onChange={this.changeSymptom}          
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="tom">Tom</Option>
        </Select>
        <Button type="primary" className="recharge-btn">充值</Button>
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
