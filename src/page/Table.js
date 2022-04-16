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
  display: 'flex',
  background: '#f0f4f5'
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
const BoxPage = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'end'
}));
const ButtonChangePage = styled(Box)(({ theme }) => ({
  width: '35px',
  height: '35px',
  color: theme.palette.white,
  background: theme.palette.main,
  borderRadius: '35px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer'
}));
const QuantityPage = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '16px',
  color: theme.palette.main,
  fontFamily: theme.typography.fontFamily.primary,
  width: '50px',
  textAlign: 'center'
}));
const CountPage = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '13px',
  color: theme.palette.main,
  fontFamily: theme.typography.fontFamily.primary,
  width: '30px',
  textAlign: 'center'
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
      name: 'Số người tối đa',
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
  const goToStartTable = () => {
    setPage(0);
    getTablesByPage(0);
  };
  const goToEndTable = () => {
    const page = ((allTables.length - 1) / 5)
      .toString()
      .substring(0, ((allTables.length - 1) / 5).toFixed(1).toString().indexOf('.'));
    setPage(parseInt(page, 10));
    getTablesByPage(parseInt(page, 10));
  };
  const handleNext = () => {
    if (
      ((allTables.length - 1) / 5)
        .toString()
        .substring(0, ((allTables.length - 1) / 5).toFixed(1).toString().indexOf('.')) !== `${page}`
    ) {
      getTablesByPage(page + 1);
      setPage(page + 1);
    }
  };
  const handlePrev = () => {
    if (page > 0) {
      getTablesByPage(page - 1);
      setPage(page - 1);
    }
  };
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
            <Table sx={{ background: '#fff' }}>
              <TableHead>
                <TableRow>
                  {header.map((item, index) => (
                    <TableCell
                      key={index}
                      sx={{
                        width: item.width,
                        color: '#000',
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
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={7}>
                    <BoxPage>
                      <CountPage>{page * 5 + 1}</CountPage>
                      <Typography sx={{ fontWeight: 'bold', fontSize: '13px' }}>-</Typography>
                      <CountPage>
                        {page * 5 + 5 >= allTables.length ? allTables.length : page * 5 + 5}
                      </CountPage>
                      <Typography sx={{ fontWeight: 'bold', fontSize: '13px' }}>/</Typography>
                      <CountPage>{allTables.length}</CountPage>
                      <ButtonChangePage
                        sx={{ background: page === 0 && 'red', marginRight: '10px' }}
                        onClick={goToStartTable}
                      >
                        {page === 0 ? (
                          <Icon
                            style={{ width: '25px', height: '25px', color: '#fff' }}
                            icon="bx:x"
                          />
                        ) : (
                          <Icon style={{ width: '25px', height: '25px' }} icon="bx:arrow-to-left" />
                        )}
                      </ButtonChangePage>
                      <ButtonChangePage
                        sx={{ background: page === 0 && 'red' }}
                        onClick={handlePrev}
                      >
                        {page === 0 ? (
                          <Icon
                            style={{ width: '25px', height: '25px', color: '#fff' }}
                            icon="bx:x"
                          />
                        ) : (
                          <Icon style={{ width: '25px', height: '25px' }} icon="bx:chevron-left" />
                        )}
                      </ButtonChangePage>
                      <QuantityPage>{page + 1}</QuantityPage>
                      <ButtonChangePage
                        sx={{
                          background:
                            ((allTables.length - 1) / 5)
                              .toString()
                              .substring(
                                0,
                                ((allTables.length - 1) / 5).toFixed(1).toString().indexOf('.')
                              ) === `${page}` && 'red'
                        }}
                        onClick={handleNext}
                      >
                        {((allTables.length - 1) / 5)
                          .toString()
                          .substring(
                            0,
                            ((allTables.length - 1) / 5).toFixed(1).toString().indexOf('.')
                          ) === `${page}` ? (
                          <Icon
                            style={{ width: '25px', height: '25px', color: '#fff' }}
                            icon="bx:x"
                          />
                        ) : (
                          <Icon style={{ width: '25px', height: '25px' }} icon="bx:chevron-right" />
                        )}
                      </ButtonChangePage>
                      <ButtonChangePage
                        sx={{
                          background:
                            ((allTables.length - 1) / 5)
                              .toString()
                              .substring(
                                0,
                                ((allTables.length - 1) / 5).toFixed(1).toString().indexOf('.')
                              ) === `${page}` && 'red',
                          marginLeft: '10px'
                        }}
                        onClick={goToEndTable}
                      >
                        {((allTables.length - 1) / 5)
                          .toString()
                          .substring(
                            0,
                            ((allTables.length - 1) / 5).toFixed(1).toString().indexOf('.')
                          ) === `${page}` ? (
                          <Icon
                            style={{ width: '25px', height: '25px', color: '#fff' }}
                            icon="bx:x"
                          />
                        ) : (
                          <Icon
                            style={{ width: '25px', height: '25px' }}
                            icon="bx:arrow-from-left"
                          />
                        )}
                      </ButtonChangePage>
                    </BoxPage>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
          {/* <TablePagination
            rowsPerPageOptions
            component="div"
            count={quantity}
            rowsPerPage={5}
            page={page}
            onPageChange={handleChangePage}
          /> */}
        </Box>
      </Scrollbar>
      {modalAddTable && <ModalAddTable add={addTable} />}
      {modalEditTable.status && <ModalEditTable edit={handleEdit} />}
      {modalChangeArea.status && <ModalChangeArea change={handleChangeArea} />}
    </RootStyle>
  );
}

export default TablePage;
