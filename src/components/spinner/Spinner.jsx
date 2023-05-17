import React from 'react';
import { Space, Spin } from 'antd';

const Spinner = ({ isLoading, key }) => {
  return (
    <div key={key}>
      {isLoading && (
        <Space
          direction="vertical"
          style={{
            width: '100%',
          }}
        >
          <Spin tip="Loading" size="small">
            <div className="content" />
          </Spin>
        </Space>
      )}
    </div>
  );
};

export default Spinner;
