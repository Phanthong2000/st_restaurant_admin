import React from 'react';
import { Avatar, Box, styled, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { keyframes } from '@emotion/react';

const anim = keyframes`
from  { 
    transform: scale(0)
}
to   { 
    transform: scale(1)
}`;
const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  background: theme.palette.lightgrey,
  borderRadius: '10px',
  padding: '10px 0px 10px 10px',
  marginBottom: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  height: '100px'
}));
const AvatarEmployee = styled(Avatar)(({ theme }) => ({
  width: '50px',
  height: '50px'
}));
const BoxInfo = styled(Box)(({ theme }) => ({
  marginLeft: '10px'
}));
const Username = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontFamily: theme.typography.fontFamily.primary,
  textTransform: 'capitalize',
  fontWeight: 'bold'
}));
const Phone = styled(Typography)(({ theme }) => ({
  color: theme.palette.gray,
  fontSize: '12px',
  fontWeight: 'bold',
  fontFamily: theme.typography.fontFamily.primary
}));
const Status = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '12px',
  fontFamily: theme.typography.fontFamily.primary,
  color: theme.palette.main
}));
const LineChosen = styled(Box)(({ theme }) => ({
  minWidth: '1px',
  minHeight: '100px ',
  background: theme.palette.main,
  color: theme.palette.main,
  fontSize: '15px',
  borderTopRightRadius: '20px',
  borderBottomRightRadius: '20px',
  animation: `${anim} 0.5s ease`
}));
ChooseEmployee.prototype = {
  employee: PropTypes.object,
  handleChooseEmployee: PropTypes.func,
  chosen: PropTypes.object
};
function ChooseEmployee({ employee, handleChooseEmployee, chosen }) {
  const handleChoose = () => {
    handleChooseEmployee(employee);
  };
  return (
    <RootStyle onClick={handleChoose}>
      <Box sx={{ display: 'flex' }}>
        <AvatarEmployee src={employee.anhDaiDien} />
        <BoxInfo>
          <Username>{employee.hoTen}</Username>
          <Phone>SĐT: {employee.soDienThoai}</Phone>
          {employee.taiKhoan.trangThai === 'Đã nghỉ' ? (
            <Status sx={{ color: 'red' }}>{employee.taiKhoan.trangThai}</Status>
          ) : (
            <Status>Đang làm</Status>
          )}
        </BoxInfo>
      </Box>
      {chosen && chosen.id === employee.id && <LineChosen> s</LineChosen>}
    </RootStyle>
  );
}

export default ChooseEmployee;
