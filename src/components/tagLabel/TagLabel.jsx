import React from 'react';
import { Tag } from 'antd';

const TagLabel = ({ style, color, label, content }) => {
  return (
    <Tag style={style} color={color}>
      {label} : {content}
    </Tag>
  );
};

export default TagLabel;
