import React from 'react';
import { IconButton, styled, TableCell, TableRow } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';
import { actionAreaModalEditArea } from '../../redux/actions/areaAction';

const RootStyle = styled(TableRow)(({ theme }) => ({
  background: theme.palette.white
}));
const Cell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold'
}));
const ImageArea = styled('img')(({ theme }) => ({
  width: '100px',
  height: '100px'
}));
const IconSeeInfo = styled(Icon)(({ theme }) => ({
  color: theme.palette.main
}));
AreaTableRow.prototype = {
  area: PropTypes.object,
  index: PropTypes.number
};
function AreaTableRow({ area, index }) {
  const dispatch = useDispatch();
  const chooseArea = () => {
    dispatch(
      actionAreaModalEditArea({
        status: true,
        area
      })
    );
  };
  return (
    <RootStyle sx={{ background: index % 2 !== 0 && 'lightgrey' }}>
      <Cell>{index + 1}</Cell>
      <Cell>
        <ImageArea src={area.hinhAnh} />
      </Cell>
      <Cell>{area.tenKhuVuc}</Cell>
      <TableCell>
        <IconButton onClick={chooseArea}>
          <IconSeeInfo icon="el:eye-open" />
        </IconButton>
      </TableCell>
    </RootStyle>
  );
}

export default AreaTableRow;
