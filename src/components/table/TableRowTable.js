import React from 'react';
import { IconButton, styled, TableCell, TableRow } from '@mui/material';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import {
  actionTableModalEditTable,
  actionTableModalChangeArea
} from '../../redux/actions/tableActions';

const RootStyle = styled(TableRow)(({ theme }) => ({
  width: '100%'
}));
const Cell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  textAlign: 'center'
}));
const IconSeeInfo = styled(Icon)(({ theme }) => ({
  color: theme.palette.main
}));
TableRowTable.prototype = {
  table: PropTypes.object,
  index: PropTypes.number
};
function TableRowTable({ table, index }) {
  const dispatch = useDispatch();
  return (
    <RootStyle sx={{ background: index % 2 === 0 ? '#fff' : 'lightgrey' }}>
      <Cell>{index + 1}</Cell>
      <Cell>{table.tenBan}</Cell>
      <Cell>{table.soNguoiToiThieu}</Cell>
      <Cell>{table.soNguoiToiDa}</Cell>
      <Cell>{table.khuVuc.tenKhuVuc}</Cell>
      <Cell>
        <IconButton
          onClick={() =>
            dispatch(
              actionTableModalChangeArea({
                status: true,
                table
              })
            )
          }
        >
          <IconSeeInfo style={{ color: 'green' }} icon="fa:edit" />
        </IconButton>
      </Cell>
      <Cell>
        <IconButton
          onClick={() =>
            dispatch(
              actionTableModalEditTable({
                status: true,
                table
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

export default TableRowTable;
