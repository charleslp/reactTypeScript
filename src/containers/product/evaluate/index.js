import React from 'react';
import { connect } from 'react-redux';
import { getLoginInfo, getStatus } from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import "./index.less";
import { message,Button,DatePicker } from 'antd';
import CommonTable from '../../../components/CommonTable';
const evaluateData = [
  {
    time:'这个一条备注',
    name:'收入',
    content:100,
    pic:'ddd',
    rank:2
  },
]
@withRouter
class Evaluate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      goodsName:"商品名称"
    }
  }

  componentDidMount() {
    message.config({
      top: 300,
    });
  }
  render() {
    const { userInfo } = this.props;
    const { goodsName } = this.state;
    
    const tableHead = ['评论时间', '用户名称', '评论文字', '评论图片', '评论星级','操作'];
    return (
      <div className="evaluate-container">
        <p className='page-title'>{goodsName}</p>        
        <div style={{marginTop:'36px'}}>
          {evaluateData.length > 0 && <CommonTable
            head={tableHead}
            body={evaluateData.map(item => (
              <tr key={item.serialId}>
                <td className='max-width'>{item.time}</td>
                <td className='max-width'>{item.name}</td>
                <td className='max-width'>{item.content}</td>
                <td className='max-width'>{item.pic}</td>
                <td className='max-width'>{item.rank}</td>
                <td className='operate-container'>
                  <span data-goodid={item.index} onClick={this.soldOut} className='delete-store'>展示</span><br />
                  <span data-goodid={item.index} onClick={this.checkEvaluate} className='delete-store'>删除</span><br />
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

export default connect(mapStateToProps, mapDispatchToProps)(Evaluate);
