import React from 'react';
import { connect } from 'react-redux';
import { getLoginInfo, getStatus } from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import "./index.less";
import { message,Button,DatePicker } from 'antd';
import CommonTable from '../../../components/CommonTable';
const { RangePicker } = DatePicker;
const integralData = [
  {
    idx:1,
    keyword:'收入',
  }
]
@withRouter
class hotSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFetching:false,
    }
  }

  componentDidMount() {
    message.config({
      top: 300,
    });
  }
  
  render() {
    const { userInfo } = this.props;
    const { isFetching } = this.state;
    
    const tableHead = ['排列序号', '热门搜索字段', '操作'];
    return (
      <div className="hot-set-container">
        <Button type="primary" className="get-excel" onClick={this.addHotSearch}>新增热门搜索字段</Button>
        <div style={{marginTop:'36px'}}>
          {integralData.length > 0 && <CommonTable
            head={tableHead}
            isFetching={isFetching}
            body={integralData.map(item => (
              <tr key={item.idx}>
                <td className='max-width'>{item.idx}</td>
                <td className='max-width'>{item.keyword}</td>
                <td className='operate-container'>
                    <span data-id={item.idx} onClick={this.editSearch} className='delete-store'>编辑</span><br />
                    <span data-id={item.idx} onClick={this.delete} className='delete-store'>删除</span><br />
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

export default connect(mapStateToProps, mapDispatchToProps)(hotSearch);
