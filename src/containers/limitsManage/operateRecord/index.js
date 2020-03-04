import React from 'react';
import "./index.less";
import { message,DatePicker,Input } from 'antd';
import CommonTable from '../../../components/CommonTable';
const { RangePicker } = DatePicker;
const { Search } = Input;
const recordData = [
  {
    time:'234324',
    account:'收入',
    identity:'收到发',
    operate:'就开始看得见附加扣水电费',
  }
]
class OperateRecord extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate:'', // 开始日期
      endDate:'', // 结束日期
      isFetching:false,
    }
  }

  componentDidMount() {
    message.config({
      top: 300,
    });
  }
  searchFn=(value)=>{
      console.log(value,'===va==')
  }
  changeData=(value, dateString)=>{
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString,dateString);
    this.setState({startDate:dateString[0],endDate:dateString[1]})
  }
  onOk = ()=>{
    
  }
  // 时间戳转日期
  timestampToTime = (timestamp) => {
    let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    return Y + M + D + h + m + s;
  }
  
  render() {
    const { isFetching } = this.state;
    
    const tableHead = ['操作时间', '操作账号', '身份名称', '操作内容'];
    return (
      <div className="operate-record-container">
        <RangePicker style={{width:'380px',marginRight:'10px'}} showTime={{ format: 'HH:mm:ss' }} format="YYYY-MM-DD HH:mm:ss" onChange={this.changeData} onOk={this.onOk}/>
        <Search
            placeholder="请输入账号"
            onSearch={this.searchFn}
            style={{ width: 200 }}
            />
        <div style={{marginTop:'36px'}}>
          {recordData.length > 0 && <CommonTable
            head={tableHead}
            isFetching={isFetching}
            body={recordData.map((item,index) => (
              <tr key={index}>
                <td className='max-width'>{item.time}</td>
                <td className='max-width'>{item.account}</td>
                <td className='max-width'>{item.identity}</td>
                <td className='max-width'>{item.operate}</td>
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

export default OperateRecord;
