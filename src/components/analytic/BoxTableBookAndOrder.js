import React, { useState } from 'react';
import { Box, styled, ToggleButton, ToggleButtonGroup } from '@mui/material';
import TableBook from './TableBook';
import TableOrder from './TableOrder';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '10px'
}));
const BoxContent = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  border: `1px solid lightgrey`,
  background: theme.palette.white,
  textAlign: 'center'
}));
function BoxTableBookAndOrder() {
  const [value, setValue] = useState('book');
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <RootStyle>
      <BoxContent>
        <ToggleButtonGroup color="primary" value={value} exclusive onChange={handleChange}>
          <ToggleButton value="book">Đơn đặt bàn</ToggleButton>
          <ToggleButton value="order">Hoá đơn</ToggleButton>
        </ToggleButtonGroup>
        {value === 'book' ? <TableBook /> : <TableOrder />}
      </BoxContent>
    </RootStyle>
  );
}

export default BoxTableBookAndOrder;
