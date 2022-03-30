import { Icon } from '@iconify/react';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  createFilterOptions,
  IconButton,
  styled,
  TextField,
  Typography
} from '@mui/material';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import axios from 'axios';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';
import { actionUserSnackbar } from '../../redux/actions/userAction';
import api from '../../assets/api/api';
import { actionGetAllFoods, actionGetAllFoodsByName } from '../../redux/actions/foodAction';
import { storage } from '../../firebase-config';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between'
}));
const BoxTitle = styled(Box)(({ theme }) => ({
  width: '30%'
}));
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '30px',
  fontFamily: theme.typography.fontFamily.primary
}));
const BoxContent = styled(Box)(({ theme }) => ({
  width: '60%'
}));
const InputFood = styled(TextField)(({ theme }) => ({
  marginTop: '20px',
  fontSize: '20px'
}));
const BoxImages = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: '20px',
  alignItems: 'center'
}));
const BoxButtonAddImage = styled(Box)(({ theme }) => ({
  width: '100px',
  height: '100px',
  border: `2px dashed ${theme.palette.main}`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  marginLeft: '10px',
  [theme.breakpoints.down('md')]: {
    width: '50px',
    height: '50px'
  }
}));
const IconAddImage = styled(Icon)(({ theme }) => ({
  width: '50px',
  height: '50px',
  color: theme.palette.main
}));
const ButtonAddFood = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 3),
  textTransform: 'none',
  color: theme.palette.white,
  background: theme.palette.main,
  fontWeight: 'bold',
  marginTop: '20px',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
const ImagePreview = styled('img')(({ theme }) => ({
  width: '100%',
  height: '400px',
  marginTop: '20px',
  [theme.breakpoints.down('md')]: {
    height: '200px'
  }
}));
function ImageChosen({ image, click }) {
  const Image = styled('img')(({ theme }) => ({
    width: '100px',
    height: '100px',
    marginRight: '10px',
    [theme.breakpoints.down('md')]: {
      width: '50px',
      height: '50px'
    }
  }));
  const ButtonRemoveImage = styled(Icon)(({ theme }) => ({
    width: '30px',
    height: '30px',
    position: 'absolute',
    top: 0,
    right: 0,
    color: theme.palette.black,
    zIndex: 3,
    cursor: 'pointer'
  }));
  return (
    <IconButton>
      <Image src={URL.createObjectURL(image)} />
      <ButtonRemoveImage onClick={click} icon="ep:close-bold" />
    </IconButton>
  );
}
function CreateFoods() {
  const typefoods = useSelector((state) => state.food.typefoods);
  const fileRef = useRef();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState({});
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option.tenLoaiMonAn
  });
  const onChangeFile = (files) => {
    if (files && files[0]) {
      if (files[0].size < 2097152) {
        setImages([...images, files[0]]);
      } else {
        dispatch(
          actionUserSnackbar({
            status: true,
            content: 'Hình món ăn phải nhỏ hơn 2MB',
            type: 'error'
          })
        );
      }
    }
  };
  const addFood = () => {
    if (name === '') setError('Vui lòng nhập tên món ăn');
    else if (price === '' || !validator.isNumeric(price) || parseFloat(price) <= 0)
      setError('Đơn giá không hợp lệ');
    else if (type.id === undefined) setError('Vui lòng chọn loại món ăn');
    else if (description === '') setError('Vui lòng nhập mô tả');
    else {
      setError('');
      const hinhAnh = [];
      images.forEach((img) => {
        const storageRef = ref(storage, `food/${new Date().getTime()}`);
        const uploadTask = uploadBytesResumable(storageRef, img);
        uploadTask.on(
          'state_changed',
          (snapshot) => {},
          (error) => {},
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              hinhAnh.push(downloadURL);
              if (hinhAnh.length === images.length) {
                const food = {
                  tenMonAn: name,
                  donGia: parseFloat(price),
                  moTa: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  hinhAnh,
                  trangThai: 'Đang bán',
                  loaiMonAn: {
                    id: type.id
                  },
                  nguoiQuanLy: {
                    id: user.id
                  }
                };
                axios
                  .get(`${api}monAn/detail/tenMonAn`, {
                    params: {
                      tenMonAn: name
                    }
                  })
                  .then((res) => {
                    setError('Tên món ăn đã tồn tại');
                  })
                  .catch((err) => {
                    axios
                      .post(`${api}monAn/create`, food)
                      .then((res) => {
                        dispatch(actionGetAllFoodsByName(''));
                        dispatch(
                          actionUserSnackbar({
                            status: true,
                            content: 'Thêm món ăn thành công',
                            type: 'success'
                          })
                        );
                      })
                      .then(() => navigate('/home/food'))
                      .catch((err) => console.log(err));
                  });
              }
            });
          }
        );
      });
    }
  };
  return (
    <RootStyle>
      <BoxTitle>
        <Title>Thêm món ăn</Title>
        <Box>{images.length > 0 && <ImagePreview src={URL.createObjectURL(images.at(0))} />}</Box>
      </BoxTitle>
      <BoxContent>
        <InputFood
          error={error === 'Vui lòng nhập tên món ăn'}
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          label="Tên món ăn"
        />
        <InputFood
          error={error === 'Đơn giá không hợp lệ'}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          label="Đơn giá"
        />
        <Autocomplete
          sx={{ marginTop: '20px', zIndex: 4 }}
          disablePortal
          onChange={(event, newValue) => setType(newValue)}
          options={typefoods}
          getOptionLabel={(option) => option.tenLoaiMonAn}
          filterOptions={filterOptions}
          renderInput={(params) => (
            <TextField
              error={error === 'Vui lòng chọn loại món ăn'}
              sx={{ color: '#fff' }}
              {...params}
              label="Loại món ăn"
            />
          )}
          renderOption={(params, option) => (
            <Box sx={{ background: '#fff' }} {...params}>
              {option.tenLoaiMonAn}
            </Box>
          )}
        />
        <BoxImages>
          {images.map((item, index) => {
            const removeImage = () => {
              setImages([...images.filter((image, i) => i !== index)]);
            };
            return <ImageChosen key={index} click={removeImage} image={item} />;
          })}
          <BoxButtonAddImage onClick={() => fileRef.current.click()}>
            <IconAddImage icon="ant-design:plus-circle-outlined" />
          </BoxButtonAddImage>
        </BoxImages>
        <InputFood
          value={description}
          error={error === 'Vui lòng nhập mô tả'}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          maxRows={5}
          minRows={5}
          label="Mô tả"
          fullWidth
        />
        <Typography sx={{ marginTop: '20px', color: 'red' }}>{error}</Typography>
        <ButtonAddFood onClick={addFood}>Thêm món ăn</ButtonAddFood>
      </BoxContent>
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
    </RootStyle>
  );
}

export default CreateFoods;
