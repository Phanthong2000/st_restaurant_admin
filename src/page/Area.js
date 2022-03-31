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
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Scrollbar } from 'smooth-scrollbar-react';
import axios from 'axios';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { actionAreaModalAdd, actionGetAllAreas } from '../redux/actions/areaAction';
import ModalAddArea from '../components/area/ModalAddArea';
import { actionUserBackdrop, actionUserSnackbar } from '../redux/actions/userAction';
import { storage } from '../firebase-config';
import api from '../assets/api/api';
import AreaTableRow from '../components/area/AreaTableRow';
import ModalEditArea from '../components/area/ModalEditArea';

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
function Area() {
  const user = useSelector((state) => state.user.user);
  const modalAddArea = useSelector((state) => state.area.modalAddArea);
  const modalEditArea = useSelector((state) => state.area.modalEditArea);
  const allAreas = useSelector((state) => state.area.allAreas);
  const dispatch = useDispatch();
  const header = [
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
            .post(`${api}khuVuc/create`, {
              hinhAnh: downloadURL,
              moTa: description,
              nguoiQuanLy: {
                ...user
              },
              tenKhuVuc: name
            })
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
      axios.put(`${api}khuVuc/edit`, areaNew).then(() => {
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
            axios.put(`${api}khuVuc/edit`, areaNew).then(() => {
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
  return (
    <RootStyle>
      <Scrollbar alwaysShowTracks>
        <BoxSearch>
          <InputBase fullWidth placeholder="Tìm kiếm khu vực..." />
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
            <ButtonOrder onClick={() => dispatch(actionAreaModalAdd(true))}>
              Thêm khu vực
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
                      sx={{ width: item.width, color: '#fff', fontWeight: 'bold' }}
                    >
                      {item.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {allAreas.map((item, index) => (
                  <AreaTableRow key={index} index={index} area={item} />
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={11}>
                    <Tooltip title="Về đầu bảng">
                      <IconButton>
                        <Icon icon="bi:skip-start-fill" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Đến cuối bảng">
                      <IconButton>
                        <Icon icon="bi:skip-end-fill" />
                      </IconButton>
                    </Tooltip>
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
      {modalAddArea && <ModalAddArea click={handleAddArea} />}
      {modalEditArea.status && <ModalEditArea click={handleEditArea} />}
    </RootStyle>
  );
}

export default Area;
