import React from 'react';
const envName = process.env.NODE_ENV;
class List extends React.Component{
  constructor(props){
    super(props)
    this.state={}
  }
  componentDidMount(){
    console.log(process,'环境变量');
  }
  render(){
    return (
      <div>
        <p>List 页面  {envName}</p>
        <div onClick={()=>{this.props.history.push('/detail')}}>返回详情页面</div>
      </div>
    )
  }
}
export default List;