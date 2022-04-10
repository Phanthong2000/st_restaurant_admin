import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from 'antd';
import { Typography } from '@mui/material';

PopoverAntd.prototype = {
  children: PropTypes.node
};

function PopoverAntd({ children, content, visible, handleVisibleChange }) {
  return (
    <Popover
      content={<Typography>{content}</Typography>}
      title="Nhắc nhở"
      visible={visible}
      trigger="click"
      onVisibleChange={handleVisibleChange}
    >
      {children}
    </Popover>
  );
}

export default PopoverAntd;
