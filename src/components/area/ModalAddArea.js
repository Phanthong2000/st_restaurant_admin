import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  Modal,
  styled,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { actionUserSnackbar, actionUserBackdrop } from '../../redux/actions/userAction';
import { actionAreaModalAdd } from '../../redux/actions/areaAction';

const BoxModal = styled(Card)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '600px',
  background: '#fff',
  padding: theme.spacing(2, 2, 2),
  display: 'block',
  [theme.breakpoints.down('sm')]: {
    width: '500px'
  }
}));
const BoxTitle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}));
const BoxContent = styled(Box)(({ theme }) => ({
  width: '60%',
  padding: '10px 0px 0px',
  marginLeft: '20%'
}));
const ImageArea = styled('img')(({ theme }) => ({
  width: '100%',
  height: '300px'
}));
const BoxInput = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: '10px'
}));
const ButtonAdd = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 'bold',
  color: theme.palette.white,
  background: theme.palette.main,
  ':hover': {
    background: theme.palette.mainHover
  }
}));

ModalAddArea.prototype = {
  click: PropTypes.func
};
function ModalAddArea({ click }) {
  const fileRef = useRef();
  const modalAddArea = useSelector((state) => state.area.modalAddArea);
  const [imageArea, setImageArea] = useState(null);
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [input, setInput] = useState('');
  const [description, setDescription] = useState('');
  const onChangeFile = (files) => {
    if (files && files[0]) {
      if (files[0].size < 2097152) {
        setImageArea(files[0]);
      } else {
        dispatch(
          actionUserSnackbar({
            status: true,
            content: 'Hình ảnh khu vực phải nhỏ hơn 2MB',
            type: 'error'
          })
        );
      }
    }
  };
  const handleClose = () => {
    dispatch(actionAreaModalAdd(false));
  };
  const addArea = () => {
    if (!imageArea) {
      setError('Vui lòng chọn hình ảnh');
    } else if (input === '') {
      setError('Vui lòng nhập tên khu vực');
    } else if (description === '') {
      setError('Vui lòng nhập mô tả khu vực');
    } else {
      click(imageArea, input, description);
      handleClose();
    }
  };
  return (
    <Modal open={modalAddArea} onClose={handleClose}>
      <BoxModal>
        <BoxTitle>
          <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Thêm loại khu vực</Typography>
          <IconButton onClick={handleClose}>
            <Icon icon="ep:close-bold" />
          </IconButton>
        </BoxTitle>
        <Divider />
        <BoxContent>
          {imageArea ? (
            <>
              <ImageArea src={URL.createObjectURL(imageArea)} />
              <Box sx={{ width: '100%', textAlign: 'center' }}>
                <IconButton onClick={() => setImageArea(null)}>
                  <Tooltip title="Bỏ chọn hình ảnh">
                    <Icon
                      style={{ color: 'red', width: '40px', height: '40px' }}
                      icon="ant-design:close-square-filled"
                    />
                  </Tooltip>
                </IconButton>
              </Box>
            </>
          ) : (
            <Box
              onClick={() => fileRef.current.click()}
              sx={{
                width: '100%',
                color: 'gray',
                outline: `2px solid gray`,
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                '&:hover': { background: 'lightgrey' }
              }}
            >
              <Box>
                <Icon style={{ width: '100px', height: '100px' }} icon="bx:image-add" />
                <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>Chọn hình ảnh</Typography>
              </Box>
            </Box>
          )}
          <BoxInput>
            <TextField
              value={input}
              onChange={(e) => setInput(e.target.value)}
              fullWidth
              label="Tên khu vực"
            />
            <TextField
              multiline
              fullWidth
              sx={{ marginTop: '10px' }}
              minRows={5}
              maxRows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              label="Mô tả"
            />
            <Typography sx={{ color: 'red', width: '100%', textAlign: 'center' }}>
              {error}
            </Typography>
          </BoxInput>
        </BoxContent>
        <Divider sx={{ margin: '10px 0px' }} />
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <ButtonAdd onClick={addArea}>Thêm khu vực</ButtonAdd>
        </Box>
        <input
          onClick={(e) => {
            e.target.value = null;
          }}
          accept=".png, .jpg, .jpeg"
          onChange={(e) => onChangeFile(e.target.files)}
          ref={fileRef}
          style={{ display: 'none' }}
          type="file"
        />
      </BoxModal>
    </Modal>
  );
}

export default ModalAddArea;
