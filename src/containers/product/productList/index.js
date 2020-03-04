import React from 'react';
import { connect } from 'react-redux';
import { getLoginInfo, getStatus } from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import "./index.less";
import { message,Button,DatePicker,Input } from 'antd';
import CommonTable from '../../../components/CommonTable';
const { RangePicker } = DatePicker;
const goodsData = [
  {
    index:1,
    name:'收入',
    pic:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1193383497,570559314&fm=26&gp=0.jpg',
    linkSymptom:'2222222',
    saled:200,
    price:300,
    last:100,
    status:1,
  },
]
@withRouter
class ProductList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      goodsName:'', //商品名称
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
  
  render() {
    const { userInfo } = this.props;
    const { isFetching } = this.state;
    
    const tableHead = ['排列序号', '商品名称', '封面图', '关联症状', '销量','价格（元）','剩余库存','状态','操作'];
    return (
      <div className="product-list-container">
        <Input placeholder="请输入商品名称搜索" onClick={(e)=>{this.setState({goodsName:e.target.value})}} style={{width:'200px',marginRight:'20px'}}/>
        <Button type="primary" className="get-excel" onClick={this.searchGoods}>搜索</Button>
        <Button type="primary" className="get-excel" onClick={this.addGoods} style={{float:'right',marginRight:'60px'}}>新增商品</Button>
        <div style={{marginTop:'36px'}}>
          {goodsData.length > 0 && <CommonTable
            head={tableHead}
            body={goodsData.map(item => (
              <tr key={item.index}>
                <td className='max-width'>{item.index}</td>
                <td className='max-width'>{item.name}</td>
                <td className='max-width'><img className="course-pic" src={item.pic}/></td>
                <td className='max-width'>{item.linkSymptom}</td>
                <td className='max-width'>{item.saled}</td>
                <td className='max-width'>{item.price}</td>
                <td className='max-width'>{item.last}</td>
                <td className='max-width'>{item.status}</td>
                <td className='operate-container'>
                    <span data-goodid={item.index} onClick={this.soldOut} className='delete-store'>下架</span><br />
                    <span data-goodid={item.index} onClick={this.checkEvaluate} className='delete-store'>查看评价</span><br />
                    <span data-goodid={item.index} onClick={this.editGood} className='delete-store'>编辑</span><br />
                    <span data-goodid={item.index} onClick={this.cancleGood} className='delete-store'>删除</span>
                  </td>
              </tr>
            ))
            }
          // current={pageNum}
          // total={total}
          // onChange={this.nextPageHandle}
          />}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
