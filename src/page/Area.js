import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  Grid,
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
import {
  actionAreaModalAdd,
  actionGetAllAreas,
  actionGetAreasByName
} from '../redux/actions/areaAction';
import ModalAddArea from '../components/area/ModalAddArea';
import { actionUserBackdrop, actionUserSnackbar } from '../redux/actions/userAction';
import { storage } from '../firebase-config';
import api from '../assets/api/api';
import AreaTableRow from '../components/area/AreaTableRow';
import ModalEditArea from '../components/area/ModalEditArea';
import AreaItemGrid from '../components/area/AreaItemGrid';

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
const ButtonOptionChosen = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '10px',
  background: theme.palette.main,
  color: theme.palette.white,
  marginRight: '10px',
  cursor: 'pointer'
}));
const ButtonOptionDontChoose = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '10px',
  background: theme.palette.white,
  color: theme.palette.main,
  border: `1px solid ${theme.palette.main}`,
  marginRight: '10px',
  cursor: 'pointer'
}));
const IconOption = styled(Icon)(({ theme }) => ({
  width: '30px',
  height: '30px'
}));
function Area() {
  const user = useSelector((state) => state.user.user);
  const modalAddArea = useSelector((state) => state.area.modalAddArea);
  const modalEditArea = useSelector((state) => state.area.modalEditArea);
  const allAreas = useSelector((state) => state.area.areasByName);
  // const areasByName = useSelector((state) => state.area.areasByName);
  const [view, setView] = useState('grid');
  const [page, setPage] = useState(0);
  const [areas, setAreas] = useState([]);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const getAreasByPage = (page) => {
    const start = page * 5;
    const end = start + 5;
    const data = [];
    for (let i = 0; i < allAreas.length; i += 1) {
      if (i >= start && i < end) {
        data.push(allAreas.at(i));
      }
    }
    setAreas(data.sort((a, b) => Date.parse(b.createAt) - Date.parse(a.createAt)));
  };
  useEffect(() => {
    getAreasByPage(0);
    setPage(0);
    return function () {
      return null;
    };
  }, [allAreas]);
  const searchArea = (text) => {
    setSearch(text);
    dispatch(actionGetAreasByName(text));
  };
  const header = [
    {
      name: '',
      width: '10%'
    },
    {
      name: 'STT',
      width: '10%'
    },
    {
      name: 'Hình ảnh',
      width: '20%'
    },
    {
      name: 'Tên khu vực',
      width: '20%'
    },
    {
      name: 'Số lượng bàn',
      width: '20%'
    },
    {
      name: 'Xem thông tin',
      width: '10%'
    }
  ];
  const handleAddArea = (image, name, description) => {
    dispatch(
      actionUserBackdrop({
        status: true,
        content: 'Thêm khu vực'
      })
    );
    const storageRef = ref(storage, `area/${name}.${new Date().getTime()}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          axios
            .post(
              `${api}khuVuc/create`,
              {
                hinhAnh: downloadURL,
                moTa: description,
                nguoiQuanLy: {
                  ...user
                },
                tenKhuVuc: name
              },
              {
                headers: {
                  Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
              }
            )
            .then(() => {
              dispatch(actionGetAllAreas());
              dispatch(
                actionUserBackdrop({
                  status: false,
                  content: 'Thêm khu vực'
                })
              );
              dispatch(
                actionUserSnackbar({
                  status: true,
                  content: 'Thêm khu vực thành công',
                  type: 'success'
                })
              );
            });
        });
      }
    );
  };
  const handleEditArea = (image, name, description) => {
    dispatch(
      actionUserBackdrop({
        status: true,
        content: 'Sửa thông tin khu vực'
      })
    );
    if (image === undefined) {
      const areaNew = {
        ...modalEditArea.area,
        tenKhuVuc: name,
        moTa: description
      };
      axios
        .put(`${api}khuVuc/edit`, areaNew, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        })
        .then(() => {
          dispatch(actionGetAllAreas());
          dispatch(
            actionUserBackdrop({
              status: false,
              content: 'Sửa thông tin khu vực'
            })
          );
          dispatch(
            actionUserSnackbar({
              status: true,
              content: 'Sửa thông tin khu vực thành công',
              type: 'success'
            })
          );
        });
    } else {
      const storageRef = ref(storage, `area/${name}.${new Date().getTime()}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        'state_changed',
        (snapshot) => {},
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const areaNew = {
              ...modalEditArea.area,
              tenKhuVuc: name,
              moTa: description,
              hinhAnh: downloadURL
            };
            axios
              .put(`${api}khuVuc/edit`, areaNew, {
                headers: {
                  Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
              })
              .then(() => {
                dispatch(actionGetAllAreas());
                dispatch(
                  actionUserBackdrop({
                    status: false,
                    content: 'Sửa thông tin khu vực'
                  })
                );
                dispatch(
                  actionUserSnackbar({
                    status: true,
                    content: 'Sửa khu vực thành công',
                    type: 'success'
                  })
                );
              });
          });
        }
      );
    }
  };
  const handleChangePage = (event, newValue) => {
    setPage(newValue);
    getAreasByPage(newValue);
  };
  const goToStartTable = () => {
    setPage(0);
    getAreasByPage(0);
  };
  const goToEndTable = () => {
    const page = ((allAreas.length - 1) / 5)
      .toString()
      .substring(0, ((allAreas.length - 1) / 5).toFixed(1).toString().indexOf('.'));
    setPage(parseInt(page, 10));
    getAreasByPage(parseInt(page, 10));
  };
  const handleNext = () => {
    if (
      ((allAreas.length - 1) / 5)
        .toString()
        .substring(0, ((allAreas.length - 1) / 5).toFixed(1).toString().indexOf('.')) !== `${page}`
    ) {
      getAreasByPage(page + 1);
      setPage(page + 1);
    }
  };
  const handlePrev = () => {
    if (page > 0) {
      getAreasByPage(page - 1);
      setPage(page - 1);
    }
  };
  const handleChooseView = (view) => {
    setView(view);
  };
  return (
    <RootStyle>
      <Scrollbar alwaysShowTracks>
        <BoxSearch>
          <InputBase
            value={search}
            onChange={(e) => searchArea(e.target.value)}
            fullWidth
            placeholder="Tìm kiếm khu vực..."
          />
          <BoxButtonSearch>
            <Icon
              style={{ width: '30px', height: '30px', color: '#fff' }}
              icon="system-uicons:search"
            />
          </BoxButtonSearch>
        </BoxSearch>
        <Box sx={{ marginTop: '20px' }}>
          <BoxListFood>
            <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>Danh sách khu vực</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {view === 'grid' ? (
                <ButtonOptionChosen>
                  <IconOption icon="fluent:grid-16-filled" />
                </ButtonOptionChosen>
              ) : (
                <ButtonOptionDontChoose onClick={() => handleChooseView('grid')}>
                  <IconOption icon="fluent:grid-16-regular" />
                </ButtonOptionDontChoose>
              )}
              {view === 'table' ? (
                <ButtonOptionChosen>
                  <IconOption icon="fluent:table-freeze-row-16-filled" />
                </ButtonOptionChosen>
              ) : (
                <ButtonOptionDontChoose onClick={() => handleChooseView('table')}>
                  <IconOption icon="fluent:table-freeze-row-16-regular" />
                </ButtonOptionDontChoose>
              )}
              <ButtonOrder onClick={() => dispatch(actionAreaModalAdd(true))}>
                Thêm khu vực
              </ButtonOrder>
            </Box>
          </BoxListFood>
        </Box>
        <Box sx={{ width: '100%', padding: '0px 10px', marginTop: '10px' }}>
          {view === 'grid' ? (
            <>
              <Grid sx={{ width: '100%' }} container>
                {areas.map((item, index) => (
                  <AreaItemGrid index={index + page * 5} key={item.id} area={item} />
                ))}
              </Grid>
              <BoxPage>
                <CountPage>{page * 5 + 1}</CountPage>
                <Typography sx={{ fontWeight: 'bold', fontSize: '13px' }}>-</Typography>
                <CountPage>
                  {page * 5 + 5 >= allAreas.length ? allAreas.length : page * 5 + 5}
                </CountPage>
                <Typography sx={{ fontWeight: 'bold', fontSize: '13px' }}>/</Typography>
                <CountPage>{allAreas.length}</CountPage>
                <ButtonChangePage
                  sx={{ background: page === 0 && 'red', marginRight: '10px' }}
                  onClick={goToStartTable}
                >
                  {page === 0 ? (
                    <Icon style={{ width: '25px', height: '25px', color: '#fff' }} icon="bx:x" />
                  ) : (
                    <Icon style={{ width: '25px', height: '25px' }} icon="bx:arrow-to-left" />
                  )}
                </ButtonChangePage>
                <ButtonChangePage sx={{ background: page === 0 && 'red' }} onClick={handlePrev}>
                  {page === 0 ? (
                    <Icon style={{ width: '25px', height: '25px', color: '#fff' }} icon="bx:x" />
                  ) : (
                    <Icon style={{ width: '25px', height: '25px' }} icon="bx:chevron-left" />
                  )}
                </ButtonChangePage>
                <QuantityPage>{page + 1}</QuantityPage>
                <ButtonChangePage
                  sx={{
                    background:
                      ((allAreas.length - 1) / 5)
                        .toString()
                        .substring(
                          0,
                          ((allAreas.length - 1) / 5).toFixed(1).toString().indexOf('.')
                        ) === `${page}` && 'red'
                  }}
                  onClick={handleNext}
                >
                  {((allAreas.length - 1) / 5)
                    .toString()
                    .substring(
                      0,
                      ((allAreas.length - 1) / 5).toFixed(1).toString().indexOf('.')
                    ) === `${page}` ? (
                    <Icon style={{ width: '25px', height: '25px', color: '#fff' }} icon="bx:x" />
                  ) : (
                    <Icon style={{ width: '25px', height: '25px' }} icon="bx:chevron-right" />
                  )}
                </ButtonChangePage>
                <ButtonChangePage
                  sx={{
                    background:
                      ((allAreas.length - 1) / 5)
                        .toString()
                        .substring(
                          0,
                          ((allAreas.length - 1) / 5).toFixed(1).toString().indexOf('.')
                        ) === `${page}` && 'red',
                    marginLeft: '10px'
                  }}
                  onClick={goToEndTable}
                >
                  {((allAreas.length - 1) / 5)
                    .toString()
                    .substring(
                      0,
                      ((allAreas.length - 1) / 5).toFixed(1).toString().indexOf('.')
                    ) === `${page}` ? (
                    <Icon style={{ width: '25px', height: '25px', color: '#fff' }} icon="bx:x" />
                  ) : (
                    <Icon style={{ width: '25px', height: '25px' }} icon="bx:arrow-from-left" />
                  )}
                </ButtonChangePage>
              </BoxPage>
            </>
          ) : (
            <TableContainer sx={{ borderRadius: '10px' }}>
              <Table sx={{ background: '#fff' }}>
                <TableHead>
                  <TableRow>
                    {header.map((item, index) => (
                      <TableCell
                        key={index}
                        sx={{ width: item.width, color: '#000', fontWeight: 'bold' }}
                      >
                        {item.name}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {areas.map((item, index) => (
                    <AreaTableRow key={index} index={index + page * 5} area={item} />
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={7}>
                      <BoxPage>
                        <CountPage>{page * 5 + 1}</CountPage>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '13px' }}>-</Typography>
                        <CountPage>
                          {page * 5 + 5 >= allAreas.length ? allAreas.length : page * 5 + 5}
                        </CountPage>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '13px' }}>/</Typography>
                        <CountPage>{allAreas.length}</CountPage>
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
                            <Icon
                              style={{ width: '25px', height: '25px' }}
                              icon="bx:arrow-to-left"
                            />
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
                            <Icon
                              style={{ width: '25px', height: '25px' }}
                              icon="bx:chevron-left"
                            />
                          )}
                        </ButtonChangePage>
                        <QuantityPage>{page + 1}</QuantityPage>
                        <ButtonChangePage
                          sx={{
                            background:
                              ((allAreas.length - 1) / 5)
                                .toString()
                                .substring(
                                  0,
                                  ((allAreas.length - 1) / 5).toFixed(1).toString().indexOf('.')
                                ) === `${page}` && 'red'
                          }}
                          onClick={handleNext}
                        >
                          {((allAreas.length - 1) / 5)
                            .toString()
                            .substring(
                              0,
                              ((allAreas.length - 1) / 5).toFixed(1).toString().indexOf('.')
                            ) === `${page}` ? (
                            <Icon
                              style={{ width: '25px', height: '25px', color: '#fff' }}
                              icon="bx:x"
                            />
                          ) : (
                            <Icon
                              style={{ width: '25px', height: '25px' }}
                              icon="bx:chevron-right"
                            />
                          )}
                        </ButtonChangePage>
                        <ButtonChangePage
                          sx={{
                            background:
                              ((allAreas.length - 1) / 5)
                                .toString()
                                .substring(
                                  0,
                                  ((allAreas.length - 1) / 5).toFixed(1).toString().indexOf('.')
                                ) === `${page}` && 'red',
                            marginLeft: '10px'
                          }}
                          onClick={goToEndTable}
                        >
                          {((allAreas.length - 1) / 5)
                            .toString()
                            .substring(
                              0,
                              ((allAreas.length - 1) / 5).toFixed(1).toString().indexOf('.')
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
          )}

          {/* <TablePagination
            rowsPerPageOptions
            component="div"
            count={allAreas.length}
            rowsPerPage={5}
            page={page}
            onPageChange={handleChangePage}
          /> */}
        </Box>
      </Scrollbar>
      {modalAddArea && <ModalAddArea click={handleAddArea} />}
      {modalEditArea.status && <ModalEditArea click={handleEditArea} />}
    </RootStyle>
  );
}

export default Area;
