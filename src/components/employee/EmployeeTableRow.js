import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, IconButton, styled, TableCell, TableRow } from '@mui/material';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { actionEmployeeModalEditEmployee } from '../../redux/actions/employeeAction';

const RootStyle = styled(TableRow)(({ theme }) => ({
  width: '100%'
}));
const IconSeeInfo = styled(Icon)(({ theme }) => ({
  color: theme.palette.main
}));
const Cell = styled(TableCell)(() => ({
  fontWeight: 'bold'
}));
EmployeeTableRow.prototype = {
  customer: PropTypes.object,
  index: PropTypes.number
};
function EmployeeTableRow({ employee, index }) {
  const dispatch = useDispatch();
  return (
    <RootStyle sx={{ background: index % 2 === 0 ? '#fff' : 'lightgrey' }}>
      <Cell>{index + 1}</Cell>
      <Cell>
        <Avatar src={employee.anhDaiDien} />
      </Cell>
      <Cell>{employee.hoTen}</Cell>
      <Cell>{employee.soDienThoai}</Cell>
      <Cell>{employee.gioiTinh}</Cell>
      <Cell>{employee.taiKhoan.trangThai}</Cell>
      <Cell>
        <IconButton
          onClick={() =>
            dispatch(
              actionEmployeeModalEditEmployee({
                status: true,
                employee
              })
            )
          }
        >
          <IconSeeInfo icon="el:eye-open" />
        </IconButton>
      </Cell>
    </RootStyle>
  );
}

export default EmployeeTableRow;
