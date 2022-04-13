import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  IconButton,
  InputBase,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Scrollbar } from 'smooth-scrollbar-react';
import axios from 'axios';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import ModalAddArea from '../components/area/ModalAddArea';
import { actionUserBackdrop, actionUserSnackbar } from '../redux/actions/userAction';
import { storage } from '../firebase-config';
import api from '../assets/api/api';
import ModalAddTable from '../components/table/ModalAddTable';
import { actionGetAllTables, actionTableModalAddTable } from '../redux/actions/tableActions';
import TableRowTable from '../components/table/TableRowTable';
import BoxSort from '../components/table/BoxSort';
import ModalEditTable from '../components/table/ModalEditTable';
import ModalChangeArea from '../components/table/ModalChangeArea';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex'
}));
const BoxSearch = styled(Box)(({ theme }) => ({
  width: '50%',
  marginLeft: '25%',
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${theme.palette.black}`,
  borderRadius: '20px',
  marginTop: '10px',
  paddingLeft: '15px'
}));
const BoxButtonSearch = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.palette.main,
  borderTopRightRadius: '20px',
  borderBottomRightRadius: '20px',
  marginRight: '1.5px',
  width: '50px',
  cursor: 'pointer',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
const BoxListFood = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0.5, 2)
}));
const ButtonOrder = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 3),
  textTransform: 'none',
  color: theme.palette.white,
  background: theme.palette.main,
  fontWeight: 'bold',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
function TablePage() {
  const user = useSelector((state) => state.user.user);
  const modalAddTable = useSelector((state) => state.table.modalAddTable);
  const allTables = useSelector((state) => state.table.allTables);
  const sortTable = useSelector((state) => state.table.sortTable);
  const modalEditTable = useSelector((state) => state.table.modalEditTable);
  const modalChangeArea = useSelector((state) => state.table.modalChangeArea);
  const [quantity, setQuantity] = useState(0);
  const [tables, setTables] = useState([]);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const getTablesByPage = (page) => {
    const notPages = [];
    allTables.forEach((table) => {
      if (sortTable === 'all') {
        notPages.push(table);
      } else if (table.khuVuc.tenKhuVuc === sortTable) {
        notPages.push(table);
      }
    });
    setQuantity(notPages.length);
    const start = page * 5;
    const end = start + 5;
    const data = [];
    for (let i = 0; i < notPages.length; i += 1) {
      if (i >= start && i < end) {
        data.push(notPages.at(i));
      }
    }
    setTables(data);
  };
  useEffect(() => {
    getTablesByPage(0);
    setPage(0);
    return function () {
      return null;
    };
  }, [sortTable, allTables]);
  const header = [
    {
      name: 'STT',
      width: '10%'
    },
    {
      name: 'Tên bàn',
      width: '15%'
    },
    {
      name: 'Số lượng tối thiểu',
      width: '15%'
    },
    {
      name: 'Số lượng tối đa',
      width: '15%'
    },
    {
      name: 'Khu vực',
      width: '10%'
    },
    {
      name: 'Cập nhật khu vực',
      width: '20%'
    },
    {
      name: 'Xem thông tin',
      width: '15%'
    }
  ];
  const addTable = (table) => {
    axios
      .post(
        `${api}ban/create`,
        { ...table },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        }
      )
      .then((res) => {
        dispatch(actionGetAllTables());
        dispatch(
          actionUserBackdrop({
            status: false,
            content: 'Thêm bàn'
          })
        );
        dispatch(
          actionUserSnackbar({
            status: true,
            content: 'Thêm bàn thành công',
            type: 'success'
          })
        );
      });
  };
  const handleEdit = (max, min) => {
    dispatch(
      actionUserBackdrop({
        status: true,
        content: 'Sửa thông tin bàn'
      })
    );
    axios
      .put(
        `${api}ban/edit`,
        {
          ...modalEditTable.table,
          soNguoiToiDa: max,
          soNguoiToiThieu: min
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        }
      )
      .then((res) => {
        dispatch(actionGetAllTables());
        dispatch(
          actionUserBackdrop({
            status: false,
            content: 'Sửa thông tin bàn'
          })
        );
        dispatch(
          actionUserSnackbar({
            status: true,
            content: 'Sửa thông tin bàn thành công',
            type: 'success'
          })
        );
      });
  };
  const handleChangePage = (event, newValue) => {
    setPage(newValue);
    getTablesByPage(newValue);
  };
  const handleChangeArea = (tableNew) => {
    dispatch(
      actionUserBackdrop({
        status: true,
        content: 'Thay đổi khu vực của bàn'
      })
    );
    axios
      .put(
        `${api}ban/edit`,
        { ...tableNew },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        }
      )
      .then((res) => {
        dispatch(actionGetAllTables());
        dispatch(
          actionUserBackdrop({
            status: false,
            content: 'Thay đổi khu vực của bàn'
          })
        );
        dispatch(
          actionUserSnackbar({
            status: true,
            content: 'Thay dổi khu vực của bàn thành công',
            type: 'success'
          })
        );
      });
  };
  //   const goToStartTable = () => {
  //     setPage(0);
  //     getAreasByPage(0);
  //   };
  //   const goToEndTable = () => {
  //     const page = ((allAreas.length - 1) / 5)
  //       .toString()
  //       .substring(0, ((allAreas.length - 1) / 5).toFixed(1).toString().indexOf('.'));
  //     setPage(parseInt(page, 10));
  //     getAreasByPage(parseInt(page, 10));
  //   };
  return (
    <RootStyle>
      <Scrollbar alwaysShowTracks>
        <BoxSearch>
          <InputBase fullWidth placeholder="Tìm kiếm bàn..." />
          <BoxButtonSearch>
            <Icon
              style={{ width: '30px', height: '30px', color: '#fff' }}
              icon="system-uicons:search"
            />
          </BoxButtonSearch>
        </BoxSearch>
        <BoxSort />
        <Box sx={{ marginTop: '20px' }}>
          <BoxListFood>
            <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>Danh sách bàn</Typography>
            <ButtonOrder onClick={() => dispatch(actionTableModalAddTable(true))}>
              Thêm bàn
            </ButtonOrder>
          </BoxListFood>
        </Box>
        <Box sx={{ width: '100%', padding: '0px 10px', marginTop: '10px' }}>
          <TableContainer sx={{ borderRadius: '10px' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: 'gray' }}>
                  {header.map((item, index) => (
                    <TableCell
                      key={index}
                      sx={{
                        width: item.width,
                        color: '#fff',
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }}
                    >
                      {item.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tables.map((item, index) => (
                  <TableRowTable key={index} index={index} table={item} />
                ))}
              </TableBody>
              {/* <TableFooter>
                <TableRow>
                  <TableCell colSpan={11}>
                    <Tooltip title="Về đầu bảng">
                      <IconButton onClick={goToStartTable} disabled={page === 0}>
                        <Icon icon="bi:skip-start-fill" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Đến cuối bảng">
                      <IconButton
                        disabled={
                          ((allAreas.length - 1) / 5)
                            .toString()
                            .substring(
                              0,
                              ((allAreas.length - 1) / 5).toFixed(1).toString().indexOf('.')
                            ) === `${page}`
                        }
                        onClick={goToEndTable}
                      >
                        <Icon icon="bi:skip-end-fill" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              </TableFooter> */}
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions
            component="div"
            count={quantity}
            rowsPerPage={5}
            page={page}
            onPageChange={handleChangePage}
          />
        </Box>
      </Scrollbar>
      {modalAddTable && <ModalAddTable add={addTable} />}
      {modalEditTable.status && <ModalEditTable edit={handleEdit} />}
      {modalChangeArea.status && <ModalChangeArea change={handleChangeArea} />}
    </RootStyle>
  );
}

export default TablePage;