  import React from 'react';
  import RenderPagination from '../RenderPagination';
  import PropTypes from 'prop-types';
  import { Spin } from 'antd';
  import './index.less';
  
  const CommonTable = (props) => {
    if (props.isFetching) {
      return <Spin loading />;
    };
    return (
      <div>
        <table className='common-table-container user-list-table'>
          <thead className='common-table-head'>
            <tr>
              {props.head.map((item, key) => (
                <th key={key}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody className='common-table-body'>
            { !props.isFetching && props.body.length == 0 ?
              <tr><td colSpan={props.head.length}><Empty /></td></tr> :
              props.body
            }
          </tbody>
        </table>
        {
          props.total > 10 && 
          <RenderPagination
            total={parseInt(props.total)}
            current={parseInt(props.current)}
            onChange={props.onChange}
          />
        }
      </div>
    );
  };
  
  CommonTable.defaultProps = {
    head: [],
    body: <tr><td></td></tr>,
    total: 0,
    current: 0,
    onChange: () => {}
  };
  
  CommonTable.propTypes = {
    head: PropTypes.array.isRequired,
    body: PropTypes.oneOfType([
      PropTypes.element, PropTypes.array
    ]).isRequired,
    total: PropTypes.number,
    current: PropTypes.number,
    onChange: PropTypes.func
  };
  
  export default CommonTable;
  