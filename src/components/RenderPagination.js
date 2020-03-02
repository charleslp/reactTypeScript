import React from 'react';
import { Pagination } from 'antd';


const itemRender = (current, type, originalElement) => {
  if (type === 'prev') {
    return <a>上一页</a>;
  }
  if (type === 'next') {
    return <a>下一页</a>;
  }
  return originalElement;
}

const RenderPagination = ({total, current, pageSize, onChange, ...rest }) => {

  if (Number(total) == 0 || !(Number(total))) return null;

  return (
    <div className="list-pagination" {...rest}>
      <Pagination
        total={total}
        current={current}
        pageSize={pageSize || 10}
        showQuickJumper
        itemRender={itemRender}
        onChange={onChange}
      />
    </div>
  );
};

export default RenderPagination;

