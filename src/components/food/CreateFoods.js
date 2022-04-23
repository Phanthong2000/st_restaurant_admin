// import { Icon } from '@iconify/react';
// import {
//   Autocomplete,
//   Box,
//   Button,
//   Card,
//   createFilterOptions,
//   IconButton,
//   styled,
//   TextField,
//   Typography
// } from '@mui/material';
// import React, { useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
// import axios from 'axios';
// import validator from 'validator';
// import { useNavigate } from 'react-router-dom';
// import { Scrollbar } from 'smooth-scrollbar-react';
// import { actionUserSnackbar } from '../../redux/actions/userAction';
// import api from '../../assets/api/api';
// import { actionGetAllFoods, actionGetAllFoodsByName } from '../../redux/actions/foodAction';
// import { storage } from '../../firebase-config';

// const RootStyle = styled(Box)(({ theme }) => ({
//   width: '100%',
//   display: 'flex',
//   justifyContent: 'space-between'
// }));
// const BoxTitle = styled(Box)(({ theme }) => ({
//   width: '30%'
// }));
// const Title = styled(Typography)(({ theme }) => ({
//   fontWeight: 'bold',
//   fontSize: '30px',
//   fontFamily: theme.typography.fontFamily.primary
// }));
// const BoxContent = styled(Box)(({ theme }) => ({
//   width: '60%'
// }));
// const InputFood = styled(TextField)(({ theme }) => ({
//   marginTop: '20px',
//   fontSize: '20px'
// }));
// const BoxImages = styled(Box)(({ theme }) => ({
//   width: '100%',
//   marginTop: '20px',
//   alignItems: 'center'
// }));
// const BoxButtonAddImage = styled(Box)(({ theme }) => ({
//   width: '100px',
//   height: '100px',
//   border: `2px dashed ${theme.palette.main}`,
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   cursor: 'pointer',
//   marginLeft: '10px',
//   [theme.breakpoints.down('md')]: {
//     width: '50px',
//     height: '50px'
//   }
// }));
// const IconAddImage = styled(Icon)(({ theme }) => ({
//   width: '50px',
//   height: '50px',
//   color: theme.palette.main
// }));
// const ButtonAddFood = styled(Button)(({ theme }) => ({
//   padding: theme.spacing(1, 3),
//   textTransform: 'none',
//   color: theme.palette.white,
//   background: theme.palette.main,
//   fontWeight: 'bold',
//   marginTop: '20px',
//   ':hover': {
//     background: theme.palette.mainHover
//   }
// }));
// const ImagePreview = styled('img')(({ theme }) => ({
//   width: '100%',
//   height: '400px',
//   marginTop: '20px',
//   [theme.breakpoints.down('md')]: {
//     height: '200px'
//   }
// }));
// function ImageChosen({ image, click }) {
//   const Image = styled('img')(({ theme }) => ({
//     width: '100px',
//     height: '100px',
//     marginRight: '10px',
//     [theme.breakpoints.down('md')]: {
//       width: '50px',
//       height: '50px'
//     }
//   }));
//   const ButtonRemoveImage = styled(Icon)(({ theme }) => ({
//     width: '20px',
//     height: '20px'
//   }));
//   const BoxButtonRemove = styled(Box)(({ theme }) => ({
//     width: '25px',
//     height: '25px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     color: theme.palette.white,
//     borderRadius: '30px',
//     background: 'red',
//     position: 'absolute',
//     top: 0,
//     right: 5,
//     zIndex: 3,
//     cursor: 'pointer'
//   }));
//   return (
//     <IconButton sx={{ cursor: 'pointer' }} disableFocusRipple disableRipple disableTouchRipple>
//       <Image src={URL.createObjectURL(image)} />
//       <BoxButtonRemove>
//         <ButtonRemoveImage onClick={click} icon="ep:close-bold" />
//       </BoxButtonRemove>
//     </IconButton>
//   );
// }
// function CreateFoods() {
//   const typefoods = useSelector((state) => state.food.typefoods);
//   const fileRef = useRef();
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [type, setType] = useState({});
//   const [images, setImages] = useState([]);
//   const [description, setDescription] = useState('');
//   const [error, setError] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.user.user);
//   const filterOptions = createFilterOptions({
//     matchFrom: 'start',
//     stringify: (option) => option.tenLoaiMonAn
//   });
//   const onChangeFile = (files) => {
//     if (files && files[0]) {
//       if (files[0].size < 2097152) {
//         setImages([...images, files[0]]);
//       } else {
//         dispatch(
//           actionUserSnackbar({
//             status: true,
//             content: 'Hình món ăn phải nhỏ hơn 2MB',
//             type: 'error'
//           })
//         );
//       }
//     }
//   };
//   const addFood = () => {
//     if (name === '') setError('Vui lòng nhập tên món ăn');
//     else if (price === '' || !validator.isNumeric(price) || parseFloat(price) <= 0)
//       setError('Đơn giá không hợp lệ');
//     else if (type.id === undefined) setError('Vui lòng chọn loại món ăn');
//     else if (description === '') setError('Vui lòng nhập mô tả');
//     else {
//       setError('');
//       const hinhAnh = [];
//       images.forEach((img) => {
//         const storageRef = ref(storage, `food/${new Date().getTime()}`);
//         const uploadTask = uploadBytesResumable(storageRef, img);
//         uploadTask.on(
//           'state_changed',
//           (snapshot) => {},
//           (error) => {},
//           () => {
//             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//               hinhAnh.push(downloadURL);
//               if (hinhAnh.length === images.length) {
//                 const food = {
//                   tenMonAn: name,
//                   donGia: parseFloat(price),
//                   moTa: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//                   hinhAnh,
//                   trangThai: 'Đang bán',
//                   loaiMonAn: {
//                     id: type.id
//                   },
//                   nguoiQuanLy: {
//                     id: user.id
//                   }
//                 };
//                 axios
//                   .get(`${api}monAn/detail/tenMonAn`, {
//                     params: {
//                       tenMonAn: name
//                     },
//                     headers: {
//                       Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
//                     }
//                   })
//                   .then((res) => {
//                     setError('Tên món ăn đã tồn tại');
//                   })
//                   .catch((err) => {
//                     axios
//                       .post(`${api}monAn/create`, food, {
//                         headers: {
//                           Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
//                         }
//                       })
//                       .then((res) => {
//                         dispatch(actionGetAllFoodsByName(''));
//                         dispatch(
//                           actionUserSnackbar({
//                             status: true,
//                             content: 'Thêm món ăn thành công',
//                             type: 'success'
//                           })
//                         );
//                       })
//                       .then(() => navigate('/home/food'))
//                       .catch((err) => console.log(err));
//                   });
//               }
//             });
//           }
//         );
//       });
//     }
//   };
//   return (
//     <RootStyle>
//       <Scrollbar style={{ padding: '10px' }} alwaysShowTracks>
//         <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
//           <BoxTitle>
//             <Title>Thêm món ăn</Title>
//             <Box sx={{ padding: '10px' }}>
//               {images.length > 0 && <ImagePreview src={URL.createObjectURL(images.at(0))} />}
//             </Box>
//           </BoxTitle>
//           <BoxContent>
//             <InputFood
//               error={error === 'Vui lòng nhập tên món ăn'}
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               fullWidth
//               label="Tên món ăn"
//             />
//             <InputFood
//               error={error === 'Đơn giá không hợp lệ'}
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               fullWidth
//               label="Đơn giá"
//             />
//             <Autocomplete
//               sx={{ marginTop: '20px', zIndex: 4 }}
//               disablePortal
//               onChange={(event, newValue) => setType(newValue)}
//               options={typefoods}
//               getOptionLabel={(option) => option.tenLoaiMonAn}
//               filterOptions={filterOptions}
//               renderInput={(params) => (
//                 <TextField
//                   error={error === 'Vui lòng chọn loại món ăn'}
//                   sx={{ color: '#fff' }}
//                   {...params}
//                   label="Loại món ăn"
//                 />
//               )}
//               renderOption={(params, option) => (
//                 <Box sx={{ background: '#fff' }} {...params}>
//                   {option.tenLoaiMonAn}
//                 </Box>
//               )}
//             />
//             <BoxImages>
//               {images.map((item, index) => {
//                 const removeImage = () => {
//                   setImages([...images.filter((image, i) => i !== index)]);
//                 };
//                 return <ImageChosen key={index} click={removeImage} image={item} />;
//               })}
//               <BoxButtonAddImage onClick={() => fileRef.current.click()}>
//                 <IconAddImage icon="ant-design:plus-circle-outlined" />
//               </BoxButtonAddImage>
//             </BoxImages>
//             <InputFood
//               value={description}
//               error={error === 'Vui lòng nhập mô tả'}
//               onChange={(e) => setDescription(e.target.value)}
//               multiline
//               maxRows={5}
//               minRows={5}
//               label="Mô tả"
//               fullWidth
//             />
//             <Typography sx={{ marginTop: '20px', color: 'red' }}>{error}</Typography>
//             <ButtonAddFood onClick={addFood}>Thêm món ăn</ButtonAddFood>
//           </BoxContent>
//           <input
//             onClick={(e) => {
//               e.target.value = null;
//             }}
//             accept=".png, .jpg, .jpeg"
//             onChange={(e) => onChangeFile(e.target.files)}
//             ref={fileRef}
//             style={{ display: 'none' }}
//             type="file"
//           />
//         </Box>
//         <Box> </Box>
//       </Scrollbar>
//     </RootStyle>
//   );
// }

// export default CreateFoods;

import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  styled,
  TextField,
  Typography
} from '@mui/material';
import { Scrollbar } from 'smooth-scrollbar-react';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { actionUserBackdrop, actionUserSnackbar } from '../../redux/actions/userAction';
import { actionGetAllFoodsByName } from '../../redux/actions/foodAction';
import api from '../../assets/api/api';

import { storage } from '../../firebase-config';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  background: '#f0f5f4'
}));
const BoxTitle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}));
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '20px',
  fontFamily: theme.typography.fontFamily.primary
}));
const TitleContent = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '16px',
  fontFamily: theme.typography.fontFamily.primary
}));
const ButtonClear = styled(Box)(({ theme }) => ({
  padding: '5px 10px',
  background: theme.palette.white,
  color: theme.palette.main,
  borderRadius: '10px',
  border: `1px solid ${theme.palette.main}`,
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  ':hover': {
    background: theme.palette.lightgrey
  }
}));
const BoxContent = styled(Grid)(({ theme }) => ({
  width: '100%'
}));
const BoxLeft = styled(Grid)(({ theme }) => ({
  width: '100%',
  padding: '10px'
}));
const WrapperLeft = styled(Card)(({ theme }) => ({
  width: ' 100%',
  background: theme.palette.white,
  padding: '10px'
}));
const BoxInput = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '10px'
}));
const TitleInput = styled(Box)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '13px',
  fontFamily: theme.typography.fontFamily.primary
}));
const InputFood = styled(TextField)(({ theme }) => ({
  width: '100%'
}));
const BoxArea = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  maxHeight: '150px',
  border: `1px solid lightgrey`,
  borderRadius: '10px',
  background: '#f0f5f4'
}));
const ButtonChooseImage = styled(Button)(({ theme }) => ({
  width: '100%',
  textTransform: 'none',
  background: theme.palette.main,
  color: theme.palette.white,
  fontWeight: 'bold',
  fontFamily: theme.typography.fontFamily.primary,
  display: 'flex',
  alignItems: 'center',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
const BoxRight = styled(Grid)(({ theme }) => ({
  width: '100%',
  padding: '10px',
  minHeight: '100%'
}));
const WrapperRight = styled(Card)(({ theme }) => ({
  width: '100%',
  padding: '10px',
  background: theme.palette.white,
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center'
}));
const BoxImages = styled(IconButton)(({ theme }) => ({
  width: '100%',
  height: '300px',
  border: `1px solid lightgrey`,
  borderRadius: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '5px',
  cursor: 'default'
}));
const ImageFood = styled('img')(({ theme }) => ({
  width: '100%',
  height: '290px'
}));
const ButtonChangePage = styled(Box)(({ theme }) => ({
  width: '35px',
  height: '35px',
  borderRadius: '35px',
  background: theme.palette.white,
  color: theme.palette.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${theme.palette.main}`,
  position: 'absolute',
  zIndex: 2,
  top: '133px',
  cursor: 'pointer'
}));
const ButtonDeleteImage = styled(Box)(({ theme }) => ({
  width: '35px',
  height: '35px',
  background: 'red',
  color: theme.palette.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  zIndex: 2,
  top: 5,
  right: 5,
  cursor: 'pointer',
  borderRadius: '35px'
}));
function TypeFood({ typefood, chosen, handleChooseTypefood }) {
  const BoxArea = styled(Grid)(({ theme }) => ({
    width: '100%',
    padding: '5px'
  }));
  const Wrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    border: `1px solid lightgrey`,
    borderRadius: '5px',
    background: theme.palette.white,
    cursor: 'pointer'
  }));
  const ImageTypeFood = styled('img')(({ theme }) => ({
    width: '100%',
    height: '100px',
    borderRadius: '5px'
  }));
  const TypeFoodName = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '14px',
    fontFamily: theme.typography.fontFamily.primary,
    textAlign: 'center'
  }));
  const BoxIconChoose = styled(Box)(({ theme }) => ({
    width: '30px',
    height: '30px',
    background: theme.palette.main,
    borderRadius: '30px',
    color: theme.palette.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 2
  }));
  const IconChoose = styled(Icon)(({ theme }) => ({
    width: '25px',
    height: '25px'
  }));
  return (
    <BoxArea item xs={6} sm={6} md={4} lg={3} xl={3}>
      <Wrapper onClick={() => handleChooseTypefood(typefood)}>
        <IconButton sx={{ minWidth: '100%' }} disableFocusRipple disableRipple disableTouchRipple>
          <Box>
            <ImageTypeFood src={typefood.hinhAnh} />
            <TypeFoodName>{typefood.tenLoaiMonAn}</TypeFoodName>
          </Box>
          {chosen && chosen.id === typefood.id && (
            <BoxIconChoose>
              <IconChoose icon="bi:check" />
            </BoxIconChoose>
          )}
        </IconButton>
      </Wrapper>
    </BoxArea>
  );
}
function CreateFoods() {
  const fileRef = useRef();
  const user = useSelector((state) => state.user.user);
  const typefoods = useSelector((state) => state.food.typefoods);
  const foods = useSelector((state) => state.food.foods);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [typefood, setTypefood] = useState();
  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleChooseTypefood = (typefood) => {
    setTypefood(typefood);
  };
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
  const handleChangePrevPage = () => {
    if (page === 0) {
      setPage(images.length - 1);
    } else {
      setPage(page - 1);
    }
  };
  const handleChangeNextPage = () => {
    if (page === images.length - 1) {
      setPage(0);
    } else {
      setPage(page + 1);
    }
  };
  const handleChangeName = (text) => {
    setName(text);
  };
  const handleChangePrice = (text) => {
    if (text.match(`^[0-9]{0,}$`)) {
      setPrice(text);
    }
  };
  const handleDeleteImage = () => {
    if (images.length === 1) {
      setPage(0);
      setImages([]);
    } else if (page === 0) {
      setImages(images.slice(1, images.length));
    } else if (page === images.length - 1) {
      setPage(page - 1);
      setImages(images.slice(0, images.length - 1));
    } else {
      setImages(images.slice(0, page).concat(images.slice(page + 1, images.length)));
    }
  };
  const addFood = () => {
    let flag = true;
    foods.forEach((food) => {
      if (food.tenMonAn === name) {
        flag = false;
      }
    });
    if (!flag) {
      setError('Tên món ăn đã tồn tại');
    } else {
      dispatch(
        actionUserBackdrop({
          status: true,
          content: 'Thêm món ăn mới'
        })
      );
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
                    id: typefood.id
                  },
                  nguoiQuanLy: {
                    id: user.id
                  }
                };
                axios
                  .post(
                    `${api}monAn/create`,
                    {
                      ...food
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                      }
                    }
                  )
                  .then((res) => {
                    console.log('fôd', res.data);
                    dispatch(actionGetAllFoodsByName(''));
                    dispatch(
                      actionUserBackdrop({
                        status: false,
                        content: 'Thêm món ăn mới'
                      })
                    );
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
              }
            });
          }
        );
      });
    }
  };
  return (
    <RootStyle>
      <Scrollbar style={{ padding: '10px' }} alwaysShowTracks>
        <BoxTitle>
          <Title>Thêm món ăn mới</Title>
        </BoxTitle>
        <BoxContent container>
          <BoxLeft item xs={12} sm={12} md={12} lg={6} xl={6}>
            <WrapperLeft>
              <TitleContent>THÔNG TIN MÓN ĂN</TitleContent>
              <Divider sx={{ margin: '10px 0px' }} />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <BoxInput>
                  <TitleInput>Tên món ăn</TitleInput>
                  <InputFood
                    helperText={<Typography sx={{ color: 'red' }}>{error}</Typography>}
                    value={name}
                    onChange={(e) => handleChangeName(e.target.value)}
                    size="small"
                    placeholder="Tên món ăn"
                  />
                </BoxInput>
                <BoxInput>
                  <TitleInput>Giá món ăn (vnđ)</TitleInput>
                  <InputFood
                    value={price}
                    onChange={(e) => handleChangePrice(e.target.value)}
                    size="small"
                    placeholder="Giá món ăn"
                  />
                </BoxInput>
              </Box>
              <BoxInput>
                <TitleInput>Mô tả</TitleInput>
                <InputFood
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Mô tả món ăn"
                  multiline
                  minRows={3}
                  maxRows={3}
                />
              </BoxInput>
              <Box sx={{ padding: '0px 10px' }}>
                <TitleInput>Chọn loại món ăn</TitleInput>
                <BoxArea>
                  <Scrollbar style={{ padding: '10px' }} alwaysShowTracks>
                    <Grid container>
                      {typefoods.map((item, index) => (
                        <TypeFood
                          chosen={typefood}
                          handleChooseTypefood={handleChooseTypefood}
                          key={item.id}
                          typefood={item}
                        />
                      ))}
                    </Grid>
                    <Box> </Box>
                  </Scrollbar>
                </BoxArea>
              </Box>
              <BoxInput>
                <TitleInput>Chọn hình ảnh món ăn</TitleInput>
                <ButtonChooseImage onClick={() => fileRef.current.click()}>
                  <Icon style={{ width: '25px', height: '25px' }} icon="bxs:image-add" />
                  <Typography sx={{ fontWeight: 'bold', fontSize: '14px', marginLeft: '10px' }}>
                    Chọn hình ảnh
                  </Typography>
                </ButtonChooseImage>
              </BoxInput>
            </WrapperLeft>
          </BoxLeft>
          <BoxRight item xs={12} sm={12} md={12} lg={6} xl={6}>
            <WrapperRight>
              <Box sx={{ width: '100%' }}>
                <TitleContent>MÓN ĂN</TitleContent>
                <Divider sx={{ margin: '10px 0px' }} />
                {images.length === 0 ? (
                  <>
                    <BoxImages disableFocusRipple disableRipple disableTouchRipple>
                      <Icon
                        style={{ width: '150px', height: '150px', color: 'gray' }}
                        icon="bx:image-add"
                      />
                    </BoxImages>
                    <Typography
                      sx={{
                        width: '100%',
                        textAlign: 'center',
                        marginTop: '5px',
                        color: 'red',
                        fontWeight: 'bold',
                        fontSize: '16px'
                      }}
                    >
                      Vui lòng chọn hình ảnh
                    </Typography>
                  </>
                ) : (
                  <>
                    <BoxImages disableFocusRipple disableRipple disableTouchRipple>
                      <ButtonChangePage onClick={handleChangePrevPage} sx={{ left: 5 }}>
                        <Icon icon="akar-icons:chevron-left" />
                      </ButtonChangePage>
                      <ImageFood src={URL.createObjectURL(images.at(page))} />
                      <ButtonChangePage onClick={handleChangeNextPage} sx={{ right: 5 }}>
                        <Icon icon="akar-icons:chevron-right" />
                      </ButtonChangePage>
                      <ButtonDeleteImage onClick={handleDeleteImage}>
                        <Icon style={{ width: '30px', height: '30px' }} icon="eva:close-outline" />
                      </ButtonDeleteImage>
                    </BoxImages>
                    <Typography
                      sx={{
                        width: '100%',
                        color: 'gray',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        fontFamily: 'san-serif',
                        textAlign: 'center',
                        marginTop: '5px'
                      }}
                    >
                      Hình ảnh: {page + 1} / {images.length}
                    </Typography>
                  </>
                )}
              </Box>
              <ButtonChooseImage
                onClick={addFood}
                disabled={Boolean(
                  name === '' ||
                    price === '' ||
                    description === '' ||
                    !typefood ||
                    images.length === 0
                )}
                sx={{ marginBottom: '10px' }}
              >
                Thêm món ăn
              </ButtonChooseImage>
            </WrapperRight>
          </BoxRight>
        </BoxContent>
      </Scrollbar>
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
