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
EmployeeTableRow.prototype = {
  customer: PropTypes.object,
  index: PropTypes.number
};
function EmployeeTableRow({ employee, index }) {
  const dispatch = useDispatch();
  return (
    <RootStyle sx={{ background: index % 2 === 0 ? '#fff' : 'lightgrey' }}>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <Avatar src={employee.anhDaiDien} />
      </TableCell>
      <TableCell>{employee.hoTen}</TableCell>
      <TableCell>{employee.soDienThoai}</TableCell>
      <TableCell>{employee.gioiTinh}</TableCell>
      <TableCell>{employee.taiKhoan.trangThai}</TableCell>
      <TableCell>
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
      </TableCell>
    </RootStyle>
  );
}

export default EmployeeTableRow;
