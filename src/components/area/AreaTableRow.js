import React, { useEffect, useState } from 'react';
import {
  Box,
  Collapse,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';
import { actionAreaModalEditArea } from '../../redux/actions/areaAction';
import api from '../../assets/api/api';
import TableRowTable from '../table/TableRowTable';

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
const CellTable = styled(TableCell)(({ theme }) => ({
  textAlign: 'center'
}));
AreaTableRow.prototype = {
  area: PropTypes.object,
  index: PropTypes.number
};
function AreaTableRow({ area, index }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(-1);
  const getQuantityTableInArea = async () => {
    const res = await axios.get(`${api}ban/list/khuVuc/${area.id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    setQuantity(res.data);
  };
  useEffect(() => {
    getQuantityTableInArea();
    return function () {
      return null;
    };
  }, []);
  const chooseArea = () => {
    dispatch(
      actionAreaModalEditArea({
        status: true,
        area
      })
    );
  };
  const header = [
    {
      name: 'STT',
      width: '10%'
    },
    {
      name: 'Tên bàn',
      width: '20%'
    },
    {
      name: 'Số lượng tối đa',
      width: '20%'
    }
  ];
  if (quantity === -1) return null;
  return (
    <>
      <RootStyle sx={{ background: index % 2 !== 0 && '#f0fafc' }}>
        <Cell>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <Icon icon="akar-icons:chevron-down" /> : <Icon icon="akar-icons:chevron-up" />}
          </IconButton>
        </Cell>
        <Cell>{index + 1}</Cell>
        <Cell>
          <ImageArea src={area.hinhAnh} />
        </Cell>
        <Cell>{area.tenKhuVuc}</Cell>
        <Cell>{quantity.length >= 0 && quantity.length}</Cell>
        <TableCell>
          <IconButton onClick={chooseArea}>
            <IconSeeInfo icon="el:eye-open" />
          </IconButton>
        </TableCell>
      </RootStyle>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>Danh sách bàn</Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {header.map((item, index) => (
                      <CellTable key={index} sx={{ width: item.width }}>
                        {item.name}
                      </CellTable>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {quantity.map((item, index) => (
                    <TableRow key={index}>
                      <CellTable>{index + 1}</CellTable>
                      <CellTable>{item.tenBan}</CellTable>
                      <CellTable>{item.soNguoiToiDa}</CellTable>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default AreaTableRow;
