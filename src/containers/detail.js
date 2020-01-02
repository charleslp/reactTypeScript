import React from 'react';
import { connect } from 'react-redux';
class Detail extends React.Component{
  constructor(props){
    super(props)
    this.state={
      name:'',
      say:'',
      like:'',
      stauts:0,
      id:(props.location.state && props.location.state.id) || 2
    }
  }
  componentDidMount() {
    const {userInfo,status} = this.props;
    this.setState({
      name:userInfo.name,
      say:userInfo.say,
      like:userInfo.like,
      stauts:status,
    })
  }
  goList(){
    this.props.history.push('/list')
  }
  render(){
    const {name,say,like,stauts,id} = this.state;
    console.log(this.props,'---props---');
    return (
      <div>
        <div>详情页面</div>
        <div>{name}</div>
        <div>{say}</div>
        <div>{like}</div>
        <div>{stauts}</div>
        <div>{id}</div>
        <div onClick={()=>{this.props.history.push('/home')}}>返回主页</div>
        <div onClick={this.goList.bind(this)}>跳转到列表页</div>
      </div>
    )
  }
}

const mapStateToProps = (state)=>({
  userInfo: state.loginInfo,
  status: state.statusCount
})
export default connect(mapStateToProps)(Detail);