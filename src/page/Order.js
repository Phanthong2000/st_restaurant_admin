// import {
//   Autocomplete,
//   Box,
//   Button,
//   Card,
//   Input,
//   styled,
//   TextField,
//   Typography,
//   Popover,
//   ListItemButton,
//   IconButton,
//   Tooltip,
//   Modal,
//   Divider,
//   Radio,
//   InputBase,
//   FormHelperText
// } from '@mui/material';
// import React, { useEffect, useState, useRef, useMemo } from 'react';
// import DatePicker from 'react-datepicker';
// import { Icon } from '@iconify/react';
// import moment from 'moment';
// import { Scrollbar } from 'smooth-scrollbar-react';
// import 'react-datepicker/dist/react-datepicker.css';
// import 'antd/dist/antd.css';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import validator from 'validator';
// import backgroundOrder from '../assets/images/backgroundOrder.png';
// import {
//   actionOrderGetOrder,
//   actionOrderGetOrderMany,
//   actionOrderGetUser,
//   actionOrderSetFoodsMany
// } from '../redux/actions/orderAction';
// import PopoverAntd from '../components/PopoverAntd';
// import { actionUserSnackbar } from '../redux/actions/userAction';

// const RootStyle = styled(Box)(({ theme }) => ({
//   width: '100%',
//   display: 'flex'
// }));
// const BoxOrder = styled(Box)(({ theme }) => ({
//   width: '700px',
//   backgroundImage: `url(${backgroundOrder})`,
//   height: '900px',
//   backgroundSize: '100% 100%',
//   backgroundRepeat: 'no-repeat',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center'
// }));
// const BoxInput = styled(Box)(({ theme }) => ({
//   width: '100%',
//   height: '100%',
//   padding: '60px 100px',
//   [theme.breakpoints.down('sm')]: {
//     padding: '80px 50px'
//   }
// }));
// const Title = styled(Typography)(({ theme }) => ({
//   fontWeight: 'bold',
//   fontFamily: 'serif',
//   fontSize: '40px'
// }));
// const BoxWrapper = styled(Box)(({ theme }) => ({
//   width: '100%',
//   display: 'flex',
//   alignItems: 'center'
// }));
// const InputWapper = styled(Box)(({ theme }) => ({
//   width: '100%',
//   alignItems: 'center',
//   padding: theme.spacing(1, 2),
//   borderRadius: '20px'
// }));
// const InputInfo = styled(Input)(({ theme }) => ({
//   fontSize: '16px',
//   width: '100%'
// }));
// const ButtonOrder = styled(Button)(({ theme }) => ({
//   textTransform: 'none',
//   padding: theme.spacing(1, 5),
//   color: theme.palette.black,
//   background: theme.palette.white,
//   fontSize: '14px',
//   fontWeight: 'bold',
//   borderRadius: '20px',
//   border: `1px solid ${theme.palette.black}`,
//   ':hover': {
//     color: theme.palette.white,
//     background: theme.palette.black
//   }
// }));
// const BoxChooseHour = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   borderBottom: `1px solid gray`,
//   height: '30px',
//   cursor: `pointer`,
//   ':hover': {
//     borderBottom: `2px solid #000`
//   }
// }));
// const options = [
//   { name: '30p', value: 1800000 },
//   { name: '1h', value: 3600000 },
//   { name: '1h 30p', value: 5400000 },
//   { name: '2h', value: 7200000 },
//   { name: '2h 30p', value: 9000000 },
//   { name: '3h', value: 10800000 },
//   { name: '3h 30p', value: 12600000 }
// ];
// function Area({ area, choose }) {
//   const BoxArea = styled(ListItemButton)(({ theme }) => ({
//     width: '100%',
//     borderRadius: '5px'
//   }));
//   return (
//     <BoxArea
//       onClick={() => {
//         choose(area);
//       }}
//     >
//       <Typography>{area.tenKhuVuc}</Typography>
//     </BoxArea>
//   );
// }
// function ModalInformationArea({ area, handleClose, open }) {
//   const BoxModal = styled(Card)(({ theme }) => ({
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: '600px',
//     background: '#fff',
//     padding: theme.spacing(2, 2, 2),
//     display: 'block',
//     [theme.breakpoints.down('sm')]: {
//       width: '500px'
//     }
//   }));
//   const BoxTitle = styled(Box)(({ theme }) => ({
//     width: '100%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between'
//   }));
//   const BoxContent = styled(Box)(({ theme }) => ({
//     width: '100%',
//     display: 'flex'
//   }));
//   const ImageArea = styled('img')(({ theme }) => ({
//     width: '40%',
//     height: '250px'
//   }));
//   return (
//     <Modal open={open} onClose={handleClose}>
//       <BoxModal>
//         <BoxTitle>
//           <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Thông tin khu vực</Typography>
//           <IconButton onClick={handleClose}>
//             <Icon icon="ep:close-bold" />
//           </IconButton>
//         </BoxTitle>
//         <Divider sx={{ margin: '10px 0px' }} />
//         <BoxContent>
//           <ImageArea src={area.hinhAnh} />
//           <Box sx={{ width: '60%', padding: '0px 10px' }}>
//             <Typography sx={{ fontSize: '18px' }}>
//               Tên khu vực: <b>{area.tenKhuVuc}</b>
//             </Typography>
//             <Typography sx={{ textAlign: 'left' }}>
//               Mô tả: <b>{area.moTa}</b>
//             </Typography>
//           </Box>
//         </BoxContent>
//       </BoxModal>
//     </Modal>
//   );
// }
// const ButtonAdd = styled(Button)(({ theme }) => ({
//   padding: theme.spacing(0.5, 2),
//   textTransform: 'none',
//   color: theme.palette.white,
//   background: theme.palette.main,
//   marginTop: '1 0px',
//   fontWeight: 'bold',
//   ':hover': {
//     background: theme.palette.mainHover
//   }
// }));
// function BoxType({ type, index, types, handleDeleteType, handleChooseQuantity, quantityCustomer }) {
//   const quantityPerTableRef = useRef('');
//   const quantityTableRef = useRef('');
//   const [chosen, setChosen] = useState(false);
//   const [quantityPerTable, setQuantityPerTable] = useState('');
//   const [quantityTable, setQuantityTable] = useState('');
//   const [content, setContent] = useState('');
//   const [visible, setVisible] = useState(false);
//   const Wrapper = styled(Box)(({ theme }) => ({
//     width: '100%',
//     marginTop: '5px'
//   }));
//   const BoxInput = styled(Box)(({ theme }) => ({
//     border: `1px solid gray`,
//     marginLeft: '5px',
//     padding: '0px 5px',
//     width: '50px'
//   }));
//   const IconType = styled(Icon)(({ theme }) => ({
//     width: '30px',
//     height: '30px',
//     color: theme.palette.main,
//     cursor: 'pointer',
//     marginLeft: '20px'
//   }));
//   const ValueChosen = styled(Typography)(({ theme }) => ({
//     fontWeight: 'bold',
//     marginLeft: '5px'
//   }));
//   const handleChangePeoplePerTable = (text) => {
//     quantityPerTableRef.current = text;
//   };
//   const handleChangeQuantityTable = (text) => {
//     quantityTableRef.current = text;
//   };
//   const handleChoose = () => {
//     if (
//       types.filter(
//         (type) => parseInt(type.quantityPerTable, 10) === parseInt(quantityPerTableRef.current, 10)
//       ).length > 0
//     ) {
//       setContent('Số người mỗi bàn đã tồn tại');
//       setVisible(true);
//     } else if (
//       quantityPerTableRef.current.match('^[0-9]{0,}') &&
//       parseInt(quantityPerTableRef.current, 10) > 0 &&
//       quantityTableRef.current.match('^[0-9]{0,}') &&
//       parseInt(quantityTableRef.current, 10) > 0
//     ) {
//       let currentQuantity = 0;
//       types.forEach((type) => {
//         if (parseInt(type.quantityPerTable, 10) > 0) {
//           currentQuantity += parseInt(type.quantityPerTable, 10) * parseInt(type.quantityTable, 10);
//         }
//       });
//       const temp =
//         currentQuantity +
//         parseInt(quantityPerTableRef.current, 10) * parseInt(quantityTableRef.current, 10);
//       if (quantityCustomer < temp) {
//         setContent('Số người nhập đã lớn hơn số người sử dụng. Vui lòng nhập lại');
//         setVisible(true);
//       } else {
//         setQuantityPerTable(quantityPerTableRef.current);
//         setQuantityTable(quantityTableRef.current);
//         handleChooseQuantity(
//           parseInt(quantityPerTableRef.current, 10),
//           parseInt(quantityTableRef.current, 10),
//           index - 1
//         );
//         setChosen(true);
//       }
//     } else {
//       setContent('Thông tin nhập không hợp lệ');
//       setVisible(true);
//     }
//   };
//   const handleEdit = () => {
//     quantityPerTableRef.current = '';
//     quantityTableRef.current = '';
//     handleChooseQuantity(null, null, index - 1);
//     setChosen(false);
//   };
//   return (
//     <Wrapper>
//       <Typography sx={{ fontWeight: 'bold' }}>Loại {index}</Typography>
//       <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <Typography sx={{ fontSize: '14px' }}>Số người mỗi bàn:</Typography>
//           {chosen ? (
//             <ValueChosen>{quantityPerTable}</ValueChosen>
//           ) : (
//             <BoxInput>
//               <InputBase onChange={(e) => handleChangePeoplePerTable(e.target.value)} />
//             </BoxInput>
//           )}
//         </Box>
//         <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
//           <Typography sx={{ fontSize: '14px' }}>Số lượng bàn:</Typography>
//           {chosen ? (
//             <ValueChosen>{quantityTable}</ValueChosen>
//           ) : (
//             <BoxInput>
//               <InputBase onChange={(e) => handleChangeQuantityTable(e.target.value)} />
//             </BoxInput>
//           )}
//         </Box>
//         {chosen ? (
//           <Tooltip title="Thay đổi thông tin đã nhập">
//             <IconType onClick={handleEdit} icon="ri:edit-circle-fill" />
//           </Tooltip>
//         ) : (
//           <PopoverAntd
//             handleVisibleChange={() => setVisible(false)}
//             visible={visible}
//             content={content}
//           >
//             <Tooltip title="Đồng ý thông tin đã nhập">
//               <IconType
//                 onClick={handleChoose}
//                 style={{ color: 'lightgreen' }}
//                 icon="bi:check-circle-fill"
//               />
//             </Tooltip>
//           </PopoverAntd>
//         )}
//         {index > 1 && types.length === index && (
//           <Tooltip title="Xoá loại">
//             <IconType
//               onClick={() => handleDeleteType(index - 1)}
//               style={{ color: 'red' }}
//               icon="ep:circle-close-filled"
//             />
//           </Tooltip>
//         )}
//       </Box>
//     </Wrapper>
//   );
// }
// function Order() {
//   const typesRef = useRef();
//   const [dateUse, setDateUse] = useState(new Date());
//   const loggedIn = useSelector((state) => state.auth.loggedIn);
//   const allAreas = useSelector((state) => state.area.allAreas);
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [quantityCustomer, setQuantityCustomer] = useState('');
//   const [description, setDescription] = useState('');
//   const [time, setTime] = useState();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [error, setError] = useState('');
//   const user = useSelector((state) => state.user.user);
//   const [area, setArea] = useState();
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [anchorElHour, setAnchorElHour] = useState(null);
//   const [anchorElUse, setAnchorElUse] = useState(null);
//   const [modalInformation, setModalInformation] = useState(false);
//   const [hour, setHour] = useState();
//   const [type, setType] = useState('one');
//   const [errorAdd, setErrorAdd] = useState('');
//   const [errorQuantityCustomer, setErrorQuantityCustomer] = useState('');
//   const userOrder = useSelector((state) => state.order.userOrder);
//   const [types, setTypes] = useState([
//     {
//       quantityPerTable: '',
//       quantityTable: ''
//     }
//   ]);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const open = Boolean(anchorEl);
//   const id = open ? 'simple-popover' : undefined;
//   const handleClickHour = (event) => {
//     setAnchorElHour(event.currentTarget);
//   };
//   const handleCloseHour = () => {
//     setAnchorElHour(null);
//   };
//   const openHour = Boolean(anchorElHour);
//   const handleClickUse = (event) => {
//     setAnchorElUse(event.currentTarget);
//   };
//   const handleCloseUse = () => {
//     setAnchorElUse(null);
//   };
//   const openUse = Boolean(anchorElUse);
//   useEffect(() => {
//     if (userOrder.id === undefined) {
//       dispatch(
//         actionUserSnackbar({
//           status: true,
//           content: 'Vui lòng chọn khách hàng muốn đặt bàn',
//           type: 'error'
//         })
//       );
//       navigate('/home/customer');
//     } else {
//       setFullName(userOrder.hoTen);
//       setEmail(userOrder.email);
//       setPhone(userOrder.soDienThoai);
//     }
//     return function () {
//       // dispatch(actionOrderGetUser({}));
//     };
//   }, [user]);
//   const order = () => {
//     if (!hour) setError('Vui lòng chọn giờ nhận bàn');
//     else if (
//       Date.parse(moment(dateUse.getTime()).format(`MM/DD/YYYY`)) + hour.value <=
//       new Date().getTime()
//     )
//       setError('Ngày tháng, giờ phải sau hiện tại');
//     else if (!validator.isNumeric(quantityCustomer) || parseInt(quantityCustomer, 10) <= 0)
//       setError('Số người sử dụng phải lớn hơn 0');
//     else if (!time) setError('Vui lòng chọn thời gian sử dụng dự kiến');
//     else if (type === 'many' && types.filter((type) => type.quantityPerTable === '').length > 0)
//       setError('Vui lòng nhập các loại bàn muốn đặt');
//     else if (!area) {
//       setError('Vui lòng chọn khu vực muốn đặt bàn');
//     } else {
//       let currentQuantity = 0;
//       types.forEach((type) => {
//         if (parseInt(type.quantityPerTable, 10) > 0) {
//           currentQuantity += parseInt(type.quantityPerTable, 10) * parseInt(type.quantityTable, 10);
//         }
//       });
//       if (parseInt(quantityCustomer, 10) !== parseInt(currentQuantity, 10) && type === 'many') {
//         setError('Số người mỗi bàn chưa bằng số người sử dụng');
//       } else {
//         setError('');
//         if (type === 'one') {
//           dispatch(
//             actionOrderSetFoodsMany([
//               {
//                 order: 1,
//                 foods: []
//               }
//             ])
//           );
//           dispatch(
//             actionOrderGetOrderMany({
//               customerName: fullName,
//               email,
//               phone,
//               date: Date.parse(moment(dateUse.getTime()).format(`MM/DD/YYYY`)) + hour.value,
//               quantityCustomer: parseInt(quantityCustomer, 10),
//               timeUse: time,
//               area,
//               description,
//               listLoaiBan: [
//                 {
//                   order: 1,
//                   soLuongBan: 1,
//                   soNguoiMoiBan: parseInt(quantityCustomer, 10)
//                 }
//               ]
//             })
//           );
//           navigate('/home/order-choose-many-food');
//         } else {
//           const listLoaiBan = [];
//           const foodsMany = [];
//           for (let i = 0; i < types.length; i += 1) {
//             foodsMany.push({
//               order: i + 1,
//               foods: []
//             });
//             listLoaiBan.push({
//               order: i + 1,
//               soLuongBan: types.at(i).quantityTable,
//               soNguoiMoiBan: types.at(i).quantityPerTable
//             });
//           }
//           dispatch(
//             actionOrderGetOrderMany({
//               customerName: fullName,
//               email,
//               phone,
//               date: Date.parse(moment(dateUse.getTime()).format(`MM/DD/YYYY`)) + hour.value,
//               quantityCustomer: parseInt(quantityCustomer, 10),
//               timeUse: time,
//               area,
//               description,
//               listLoaiBan
//             })
//           );
//           dispatch(actionOrderSetFoodsMany(foodsMany));
//           navigate('/home/order-choose-many-food');
//         }
//       }
//     }
//   };
//   const chooseArea = (area) => {
//     setArea(area);
//     handleClose();
//   };
//   const openModalInformationArea = (e) => {
//     e.stopPropagation();
//     setModalInformation(true);
//   };
//   const closeModalInformationArea = () => {
//     setModalInformation(false);
//   };
//   const handleAddType = () => {
//     let currentQuantity = 0;
//     types.forEach((type) => {
//       if (parseInt(type.quantityPerTable, 10) > 0) {
//         currentQuantity += parseInt(type.quantityPerTable, 10) * parseInt(type.quantityTable, 10);
//       }
//     });
//     if (parseInt(quantityCustomer, 10) === parseInt(currentQuantity, 10)) {
//       setErrorAdd('Người sử dụng đã bằng với số người mỗi bàn và số bàn');
//     } else if (
//       types.filter((type) => type.quantityPerTable === '' || !type.quantityPerTable).length > 0
//     ) {
//       setErrorAdd('Vui lòng nhập các loại bàn');
//     } else {
//       setErrorAdd('');
//       setTypes([
//         ...types,
//         {
//           quantityPerTable: '',
//           quantityTable: ''
//         }
//       ]);
//     }
//   };
//   const handleDeleteType = (index) => {
//     setTypes(types.slice(0, index));
//   };
//   const handleChooseQuantity = (quantityPerTable, quantityTable, index) => {
//     setTypes(
//       types
//         .slice(0, index)
//         .concat([
//           {
//             quantityPerTable,
//             quantityTable
//           }
//         ])
//         .concat(types.slice(index + 1, types.length))
//     );
//   };
//   const hours = [
//     {
//       name: '8:00',
//       value: 28800000
//     },
//     {
//       name: '9:00',
//       value: 32400000
//     },
//     {
//       name: '10:00',
//       value: 36000000
//     },
//     {
//       name: '11:00',
//       value: 39600000
//     },
//     {
//       name: '12:00',
//       value: 43200000
//     },
//     {
//       name: '13:00',
//       value: 46800000
//     },
//     {
//       name: '14:00',
//       value: 50400000
//     },
//     {
//       name: '15:00',
//       value: 54000000
//     },
//     {
//       name: '16:00',
//       value: 57600000
//     },
//     {
//       name: '17:00',
//       value: 61200000
//     },
//     {
//       name: '18:00',
//       value: 64800000
//     },
//     {
//       name: '19:00',
//       value: 68400000
//     },
//     {
//       name: '20:00',
//       value: 72000000
//     },
//     {
//       name: '21:00',
//       value: 75600000
//     }
//   ];
//   const handleChangeQuantityCustomer = (text) => {
//     if (text.match(`^[0-9]{0,}$`)) {
//       setQuantityCustomer(text);
//       setErrorQuantityCustomer('');
//     } else {
//       setErrorQuantityCustomer('Vui lòng nhập số người sử dụng');
//     }
//   };
//   const handleChangeTypeRadio = (value) => {
//     if (value === 'many' && (quantityCustomer === 0 || quantityCustomer === '')) {
//       setErrorQuantityCustomer('Vui lòng nhập số người sử dụng');
//     } else setType(value);
//   };
//   const checkQuantity = () => {
//     let currentQuantity = 0;
//     types.forEach((type) => {
//       if (parseInt(type.quantityPerTable, 10) > 0) {
//         currentQuantity += parseInt(type.quantityPerTable, 10) * parseInt(type.quantityTable, 10);
//       }
//     });
//     return parseInt(quantityCustomer, 10) - currentQuantity;
//   };
//   return (
//     <RootStyle>
//       <Scrollbar alwaysShowTracks>
//         <Box sx={{ background: '#fff', display: 'flex', justifyContent: 'center' }}>
//           <BoxOrder sx={{ height: type === 'many' && `${900 + types.length * 85}px` }}>
//             <BoxInput>
//               <Title>Đặt bàn</Title>
//               <InputWapper>
//                 <Typography sx={{ fontSize: '16px' }}>Họ tên:</Typography>
//                 <InputInfo
//                   disabled
//                   value={fullName}
//                   onChange={(e) => setFullName(e.target.value)}
//                   fullWidth
//                   placeholder="Aa"
//                 />
//               </InputWapper>
//               <InputWapper>
//                 <Typography sx={{ fontSize: '16px' }}>Email:</Typography>
//                 <InputInfo
//                   disabled
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   fullWidth
//                   placeholder="Aa"
//                 />
//               </InputWapper>
//               <InputWapper>
//                 <Typography sx={{ fontSize: '16px' }}>Số điện thoại:</Typography>
//                 <InputInfo
//                   disabled
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   fullWidth
//                   placeholder="0123456789"
//                 />
//               </InputWapper>
//               <BoxWrapper sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
//                 <InputWapper>
//                   <Typography sx={{ fontSize: '16px' }}>Ngày nhận bàn</Typography>
//                   <DatePicker
//                     minDate={new Date()}
//                     customInput={<InputInfo fullWidth />}
//                     selected={dateUse}
//                     dateFormat="dd/MM/yyyy"
//                     onChange={(newValue) => {
//                       setDateUse(newValue);
//                     }}
//                   />
//                 </InputWapper>
//                 <InputWapper>
//                   <Typography sx={{ fontSize: '16px' }}>Giờ nhận bàn</Typography>
//                   <BoxChooseHour onClick={handleClickHour}>
//                     <Typography>{hour ? hour.name : `Chọn giờ`}</Typography>
//                     <Icon
//                       style={{ width: '18px', height: '17px', color: 'gray' }}
//                       icon="bx:caret-down"
//                     />
//                   </BoxChooseHour>
//                   <Popover
//                     open={openHour}
//                     anchorEl={anchorElHour}
//                     onClose={handleCloseHour}
//                     anchorOrigin={{
//                       vertical: 'bottom',
//                       horizontal: 'left'
//                     }}
//                   >
//                     <Card
//                       sx={{
//                         width: '100px',
//                         background: '#fff',
//                         padding: '5px',
//                         maxHeight: '200px',
//                         display: 'flex'
//                       }}
//                     >
//                       <Scrollbar alwaysShowTracks>
//                         {hours.map((item, index) => {
//                           const chooseHour = () => {
//                             setHour(item);
//                             handleCloseHour();
//                           };
//                           return (
//                             <ListItemButton onClick={chooseHour} key={index}>
//                               {item.name}
//                             </ListItemButton>
//                           );
//                         })}
//                       </Scrollbar>
//                     </Card>
//                   </Popover>
//                 </InputWapper>
//               </BoxWrapper>
//               <BoxWrapper sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
//                 <InputWapper>
//                   <Typography sx={{ fontSize: '16px' }}>Thời gian sử dụng dự kiến:</Typography>
//                   <BoxChooseHour onClick={handleClickUse}>
//                     <Typography>{time ? time.name : `Chọn thời gian`}</Typography>
//                     <Icon
//                       style={{ width: '18px', height: '17px', color: 'gray' }}
//                       icon="bx:caret-down"
//                     />
//                   </BoxChooseHour>
//                   <Popover
//                     open={openUse}
//                     anchorEl={anchorElUse}
//                     onClose={handleCloseUse}
//                     anchorOrigin={{
//                       vertical: 'bottom',
//                       horizontal: 'left'
//                     }}
//                   >
//                     <Card
//                       sx={{
//                         width: '100px',
//                         background: '#fff',
//                         padding: '5px',
//                         maxHeight: '200px',
//                         display: 'flex'
//                       }}
//                     >
//                       <Scrollbar alwaysShowTracks>
//                         {options.map((item, index) => {
//                           const chooseUse = () => {
//                             setTime(item);
//                             handleCloseUse();
//                           };
//                           return (
//                             <ListItemButton onClick={chooseUse} key={index}>
//                               {item.name}
//                             </ListItemButton>
//                           );
//                         })}
//                       </Scrollbar>
//                     </Card>
//                   </Popover>
//                 </InputWapper>
//                 <InputWapper>
//                   <Typography sx={{ fontSize: '16px' }}>Số người sử dụng:</Typography>
//                   <InputInfo
//                     id="quantityCustomer"
//                     value={quantityCustomer}
//                     onChange={(e) => handleChangeQuantityCustomer(e.target.value)}
//                     fullWidth
//                     placeholder="Nhập số người sử dụng"
//                   />
//                   <FormHelperText error id="quantityCustomer">
//                     {errorQuantityCustomer}
//                   </FormHelperText>
//                 </InputWapper>
//               </BoxWrapper>
//               <BoxWrapper>
//                 <BoxWrapper>
//                   <Radio
//                     onChange={() => handleChangeTypeRadio('one')}
//                     value="one"
//                     checked={type === 'one'}
//                   />
//                   <Typography>Đặt 1 bàn</Typography>
//                 </BoxWrapper>
//                 <BoxWrapper>
//                   <Radio
//                     onChange={() => handleChangeTypeRadio('many')}
//                     value="many"
//                     checked={type === 'many'}
//                   />
//                   <Typography>Đặt nhiều bàn</Typography>
//                 </BoxWrapper>
//               </BoxWrapper>
//               {type === 'many' && (
//                 <Box sx={{ padding: `0px 20px` }}>
//                   <Typography>Còn lại: {checkQuantity()} người</Typography>
//                   {types.map((item, index) => (
//                     <BoxType
//                       quantityCustomer={quantityCustomer}
//                       key={index}
//                       type={item}
//                       index={index + 1}
//                       types={types}
//                       handleChooseQuantity={handleChooseQuantity}
//                       handleDeleteType={handleDeleteType}
//                     />
//                   ))}
//                   <Typography sx={{ color: 'red' }}>{errorAdd}</Typography>
//                   <ButtonAdd onClick={handleAddType}>Thêm</ButtonAdd>
//                 </Box>
//               )}

//               <InputWapper>
//                 <Typography sx={{ fontSize: '16px' }}>Khu vực:</Typography>
//                 {area ? (
//                   <Box
//                     onClick={handleClick}
//                     sx={{
//                       borderBottom: `1px solid gray`,
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'space-between',
//                       color: 'gray',
//                       cursor: 'pointer',
//                       ':&hover': { background: 'lightgrey' },
//                       width: '100%'
//                     }}
//                   >
//                     <Typography sx={{ fontSize: '16px' }}>{area.tenKhuVuc}</Typography>
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <Icon icon="bx:caret-down" />
//                       <Tooltip title="Xem thông tin khu vực">
//                         <IconButton onClick={openModalInformationArea}>
//                           <Icon icon="el:eye-open" />
//                         </IconButton>
//                       </Tooltip>
//                     </Box>
//                   </Box>
//                 ) : (
//                   <Box
//                     onClick={handleClick}
//                     sx={{
//                       borderBottom: `1px solid gray`,
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'space-between',
//                       color: 'gray',
//                       cursor: 'pointer',
//                       ':&hover': { background: 'lightgrey' }
//                     }}
//                   >
//                     <Typography sx={{ fontSize: '16px' }}>Chọn khu vực</Typography>
//                     <Icon icon="bx:caret-down" />
//                   </Box>
//                 )}
//               </InputWapper>
//               <Popover
//                 id={id}
//                 open={open}
//                 anchorEl={anchorEl}
//                 onClose={handleClose}
//                 anchorOrigin={{
//                   vertical: 'bottom',
//                   horizontal: 'left'
//                 }}
//               >
//                 <Card
//                   sx={{
//                     width: '300px',
//                     background: '#fff',
//                     padding: '5px',
//                     maxHeight: '200px',
//                     display: 'flex'
//                   }}
//                 >
//                   <Scrollbar alwaysShowTracks>
//                     {allAreas.map((item, index) => (
//                       <Area choose={chooseArea} key={index} area={item} />
//                     ))}
//                   </Scrollbar>
//                 </Card>
//               </Popover>
//               <InputWapper>
//                 <Typography sx={{ fontSize: '16px' }}>Ghi chú:</Typography>
//                 <InputInfo
//                   onChange={(e) => setDescription(e.target.value)}
//                   value={description}
//                   multiline
//                   minRows={3}
//                   maxRows={3}
//                   fullWidth
//                   placeholder="Aa"
//                 />
//               </InputWapper>
//               <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
//                 <Typography sx={{ color: 'red' }}>{error}</Typography>
//               </Box>
//               <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
//                 <ButtonOrder onClick={order}>Đặt bàn</ButtonOrder>
//               </Box>
//             </BoxInput>
//           </BoxOrder>
//         </Box>
//         {modalInformation && (
//           <ModalInformationArea
//             handleClose={closeModalInformationArea}
//             open={modalInformation}
//             area={area}
//           />
//         )}
//       </Scrollbar>
//     </RootStyle>
//   );
// }

// export default Order;

import {
  Autocomplete,
  Box,
  Button,
  Card,
  Input,
  styled,
  TextField,
  Typography,
  Popover,
  ListItemButton,
  IconButton,
  Tooltip,
  Modal,
  Divider,
  Radio,
  InputBase,
  FormHelperText,
  Grid
} from '@mui/material';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import { Icon } from '@iconify/react';
import moment from 'moment';
import { Scrollbar } from 'smooth-scrollbar-react';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import backgroundOrder from '../assets/images/backgroundOrder.png';
import {
  actionOrderGetOrder,
  actionOrderGetOrderMany,
  actionOrderModalChooseArea,
  actionGetAreasForOrder,
  actionOrderSetFoodsMany
} from '../redux/actions/orderAction';
import ModalChooseArea from '../components/order/ModalChooseArea';
import { actionUserSnackbar } from '../redux/actions/userAction';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  background: theme.palette.white,
  display: 'flex',
  justifyContent: 'center'
}));
const BoxOrder = styled(Box)(({ theme }) => ({
  width: '700px',
  backgroundImage: `url(${backgroundOrder})`,
  height: '800px',
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));
const BoxInput = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  padding: '60px 100px',
  [theme.breakpoints.down('sm')]: {
    padding: '80px 50px'
  }
}));
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontFamily: 'serif',
  fontSize: '40px'
}));
const BoxWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center'
}));
const InputWapper = styled(Box)(({ theme }) => ({
  width: '100%',
  alignItems: 'center',
  padding: theme.spacing(1, 2),
  borderRadius: '20px'
}));
const InputInfo = styled(Input)(({ theme }) => ({
  fontSize: '16px',
  width: '100%'
}));
const ButtonOrder = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  padding: theme.spacing(1, 5),
  color: theme.palette.black,
  background: theme.palette.white,
  fontSize: '14px',
  fontWeight: 'bold',
  borderRadius: '20px',
  border: `1px solid ${theme.palette.black}`,
  ':hover': {
    color: theme.palette.white,
    background: theme.palette.black
  }
}));
const BoxChooseHour = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: `1px solid gray`,
  height: '30px',
  cursor: `pointer`,
  ':hover': {
    borderBottom: `2px solid #000`
  }
}));
const options = [
  { name: '30p', value: 1800000 },
  { name: '1h', value: 3600000 },
  { name: '1h 30p', value: 5400000 },
  { name: '2h', value: 7200000 },
  { name: '2h 30p', value: 9000000 },
  { name: '3h', value: 10800000 },
  { name: '3h 30p', value: 12600000 }
];
const ButtonAdd = styled(Button)(({ theme }) => ({
  padding: theme.spacing(0.5, 2),
  textTransform: 'none',
  color: theme.palette.white,
  background: theme.palette.main,
  marginTop: '10px',
  fontWeight: 'bold',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
const BoxTable = styled(Grid)(({ theme }) => ({
  padding: '5px',
  maxHeight: '150px',
  display: 'flex'
}));
function Table({ table }) {
  const BoxTable = styled(Grid)(({ theme }) => ({
    width: '100%',
    height: '100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${theme.palette.main}`
  }));
  const Title = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    color: theme.palette.gray,
    fontWeight: 'bold'
  }));
  const IconTable = styled(Icon)(({ theme }) => ({
    width: '40px',
    height: '40px',
    color: theme.palette.gray
  }));
  return (
    <Grid sx={{ padding: '5px', width: '100%' }} item xs={4} sm={4} md={4} lg={3} xl={3}>
      <BoxTable>
        <Title>{table.tenBan}</Title>
        <IconTable icon="ic:round-table-restaurant" />
        <Title>Số người: {table.soNguoiToiDa}</Title>
      </BoxTable>
    </Grid>
  );
}
function Order() {
  const [dateUse, setDateUse] = useState(new Date());
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [quantityCustomer, setQuantityCustomer] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const user = useSelector((state) => state.user.user);
  const [anchorElHour, setAnchorElHour] = useState(null);
  const [anchorElUse, setAnchorElUse] = useState(null);
  const [hour, setHour] = useState();
  const [errorAdd, setErrorAdd] = useState('');
  const [errorQuantityCustomer, setErrorQuantityCustomer] = useState('');
  const modalChooseArea = useSelector((state) => state.order.modalChooseArea);
  const userOrder = useSelector((state) => state.order.userOrder);
  const [tables, setTables] = useState([]);
  const [types, setTypes] = useState([
    {
      quantityPerTable: '',
      quantityTable: ''
    }
  ]);
  const handleClick = () => {
    if (!hour) setError('Vui lòng chọn giờ nhận bàn');
    else if (
      Date.parse(moment(dateUse.getTime()).format(`MM/DD/YYYY`)) + hour.value <=
      new Date().getTime()
    )
      setError('Ngày tháng, giờ phải sau hiện tại');
    else if (!validator.isNumeric(quantityCustomer) || parseInt(quantityCustomer, 10) <= 0)
      setError('Số người sử dụng phải lớn hơn 0');
    else if (!time) setError('Vui lòng chọn thời gian sử dụng dự kiến');
    // else if (type === 'many' && types.filter((type) => type.quantityPerTable === '').length > 0)
    //   setError('Vui lòng nhập các loại bàn muốn đặt');
    else {
      dispatch(
        actionGetAreasForOrder(
          Date.parse(moment(dateUse.getTime()).format(`MM/DD/YYYY`)) + hour.value,
          time.value
        )
      );
      setTables([]);
      dispatch(
        actionOrderModalChooseArea({
          status: true,
          tables
        })
      );
    }
  };

  const handleClickHour = (event) => {
    setAnchorElHour(event.currentTarget);
  };
  const handleCloseHour = () => {
    setAnchorElHour(null);
  };
  const openHour = Boolean(anchorElHour);
  const handleClickUse = (event) => {
    setAnchorElUse(event.currentTarget);
  };
  const handleCloseUse = () => {
    setAnchorElUse(null);
  };
  const openUse = Boolean(anchorElUse);
  useEffect(() => {
    if (userOrder.id === undefined) {
      dispatch(
        actionUserSnackbar({
          status: true,
          content: 'Vui lòng chọn khách hàng muốn đặt bàn',
          type: 'error'
        })
      );
      navigate('/home/customer');
    } else {
      setFullName(userOrder.hoTen);
      setEmail(userOrder.email);
      setPhone(userOrder.soDienThoai);
    }
    return function () {
      return null;
    };
  }, [user]);
  const order = () => {
    if (!hour) setError('Vui lòng chọn giờ nhận bàn');
    else if (
      Date.parse(moment(dateUse.getTime()).format(`MM/DD/YYYY`)) + hour.value <=
      new Date().getTime()
    )
      setError('Ngày tháng, giờ phải sau hiện tại');
    else if (!validator.isNumeric(quantityCustomer) || parseInt(quantityCustomer, 10) <= 0)
      setError('Số người sử dụng phải lớn hơn 0');
    else if (!time) setError('Vui lòng chọn thời gian sử dụng dự kiến');
    // else if (type === 'many' && types.filter((type) => type.quantityPerTable === '').length > 0)
    //   setError('Vui lòng nhập các loại bàn muốn đặt');
    else if (tables.length === 0) {
      setError('Vui lòng chọn bàn muốn đặt bàn');
    } else {
      setError('');
      dispatch(
        actionOrderGetOrder({
          customerName: fullName,
          email,
          phone,
          date: Date.parse(moment(dateUse.getTime()).format(`MM/DD/YYYY`)) + hour.value,
          quantityCustomer,
          timeUse: time,
          description,
          listBan: tables
        })
      );
      navigate('/home/order-choose-food');
    }
  };
  const chooseArea = (area, tables) => {
    setTables(tables);
  };
  const handleAddType = () => {
    let currentQuantity = 0;
    types.forEach((type) => {
      if (parseInt(type.quantityPerTable, 10) > 0) {
        currentQuantity += parseInt(type.quantityPerTable, 10) * parseInt(type.quantityTable, 10);
      }
    });
    if (parseInt(quantityCustomer, 10) === parseInt(currentQuantity, 10)) {
      setErrorAdd('Người sử dụng đã bằng với số người mỗi bàn và số bàn');
    } else if (
      types.filter((type) => type.quantityPerTable === '' || !type.quantityPerTable).length > 0
    ) {
      setErrorAdd('Vui lòng nhập các loại bàn');
    } else {
      setErrorAdd('');
      setTypes([
        ...types,
        {
          quantityPerTable: '',
          quantityTable: ''
        }
      ]);
    }
  };
  const handleDeleteType = (index) => {
    setTypes(types.slice(0, index));
  };
  const handleChooseQuantity = (quantityPerTable, quantityTable, index) => {
    setTypes(
      types
        .slice(0, index)
        .concat([
          {
            quantityPerTable,
            quantityTable
          }
        ])
        .concat(types.slice(index + 1, types.length))
    );
  };
  const hours = [
    {
      name: '8:00',
      value: 28800000
    },
    {
      name: '9:00',
      value: 32400000
    },
    {
      name: '10:00',
      value: 36000000
    },
    {
      name: '11:00',
      value: 39600000
    },
    {
      name: '12:00',
      value: 43200000
    },
    {
      name: '13:00',
      value: 46800000
    },
    {
      name: '14:00',
      value: 50400000
    },
    {
      name: '15:00',
      value: 54000000
    },
    {
      name: '16:00',
      value: 57600000
    },
    {
      name: '17:00',
      value: 61200000
    },
    {
      name: '18:00',
      value: 64800000
    },
    {
      name: '19:00',
      value: 68400000
    },
    {
      name: '20:00',
      value: 72000000
    },
    {
      name: '21:00',
      value: 75600000
    }
  ];
  const handleChangeQuantityCustomer = (text) => {
    if (text.match(`^[0-9]{0,}$`)) {
      setQuantityCustomer(text);
      setErrorQuantityCustomer('');
      setTables([]);
    } else {
      setErrorQuantityCustomer('Vui lòng nhập số người sử dụng');
    }
  };
  // const checkQuantity = () => {
  //   let currentQuantity = 0;
  //   types.forEach((type) => {
  //     if (parseInt(type.quantityPerTable, 10) > 0) {
  //       currentQuantity += parseInt(type.quantityPerTable, 10) * parseInt(type.quantityTable, 10);
  //     }
  //   });
  //   return parseInt(quantityCustomer, 10) - currentQuantity;
  // };
  return (
    <RootStyle>
      <Scrollbar>
        <Box sx={{ background: '#fff', display: 'flex', justifyContent: 'center' }}>
          <BoxOrder sx={{ height: tables.length > 0 && `950px` }}>
            <BoxInput>
              <Title>Đặt bàn</Title>
              <InputWapper>
                <Typography sx={{ fontSize: '16px' }}>Họ tên:</Typography>
                <InputInfo
                  disabled
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  fullWidth
                  placeholder="Aa"
                />
              </InputWapper>
              <InputWapper>
                <Typography sx={{ fontSize: '16px' }}>Email:</Typography>
                <InputInfo
                  disabled
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  placeholder="Aa"
                />
              </InputWapper>
              <InputWapper>
                <Typography sx={{ fontSize: '16px' }}>Số điện thoại:</Typography>
                <InputInfo
                  disabled
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  fullWidth
                  placeholder="0123456789"
                />
              </InputWapper>
              <BoxWrapper sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <InputWapper>
                  <Typography sx={{ fontSize: '16px' }}>Ngày nhận bàn</Typography>
                  <DatePicker
                    minDate={new Date()}
                    customInput={<InputInfo fullWidth />}
                    selected={dateUse}
                    dateFormat="dd/MM/yyyy"
                    onChange={(newValue) => {
                      setDateUse(newValue);
                      setTables([]);
                    }}
                  />
                </InputWapper>
                <InputWapper>
                  <Typography sx={{ fontSize: '16px' }}>Giờ nhận bàn</Typography>
                  <BoxChooseHour onClick={handleClickHour}>
                    <Typography>{hour ? hour.name : `Chọn giờ`}</Typography>
                    <Icon
                      style={{ width: '18px', height: '17px', color: 'gray' }}
                      icon="bx:caret-down"
                    />
                  </BoxChooseHour>
                  <Popover
                    open={openHour}
                    anchorEl={anchorElHour}
                    onClose={handleCloseHour}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left'
                    }}
                  >
                    <Card
                      sx={{
                        width: '100px',
                        background: '#fff',
                        padding: '5px',
                        maxHeight: '200px',
                        display: 'flex'
                      }}
                    >
                      <Scrollbar alwaysShowTracks>
                        {hours.map((item, index) => {
                          const chooseHour = () => {
                            setHour(item);
                            setTables([]);
                            handleCloseHour();
                          };
                          return (
                            <ListItemButton onClick={chooseHour} key={index}>
                              {item.name}
                            </ListItemButton>
                          );
                        })}
                      </Scrollbar>
                    </Card>
                  </Popover>
                </InputWapper>
              </BoxWrapper>
              <BoxWrapper sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <InputWapper>
                  <Typography sx={{ fontSize: '16px' }}>Thời gian sử dụng dự kiến:</Typography>
                  <BoxChooseHour onClick={handleClickUse}>
                    <Typography>{time ? time.name : `Chọn thời gian`}</Typography>
                    <Icon
                      style={{ width: '18px', height: '17px', color: 'gray' }}
                      icon="bx:caret-down"
                    />
                  </BoxChooseHour>
                  <Popover
                    open={openUse}
                    anchorEl={anchorElUse}
                    onClose={handleCloseUse}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left'
                    }}
                  >
                    <Card
                      sx={{
                        width: '100px',
                        background: '#fff',
                        padding: '5px',
                        maxHeight: '200px',
                        display: 'flex'
                      }}
                    >
                      <Scrollbar alwaysShowTracks>
                        {options.map((item, index) => {
                          const chooseUse = () => {
                            setTime(item);
                            setTables([]);
                            handleCloseUse();
                          };
                          return (
                            <ListItemButton onClick={chooseUse} key={index}>
                              {item.name}
                            </ListItemButton>
                          );
                        })}
                      </Scrollbar>
                    </Card>
                  </Popover>
                </InputWapper>
                <InputWapper>
                  <Typography sx={{ fontSize: '16px' }}>Số người sử dụng:</Typography>
                  <InputInfo
                    id="quantityCustomer"
                    value={quantityCustomer}
                    onChange={(e) => handleChangeQuantityCustomer(e.target.value)}
                    fullWidth
                    placeholder="Nhập số người sử dụng"
                  />
                  <FormHelperText error id="quantityCustomer">
                    {errorQuantityCustomer}
                  </FormHelperText>
                </InputWapper>
              </BoxWrapper>
              <InputWapper>
                <Typography sx={{ fontSize: '16px' }}>Bàn:</Typography>
                {tables.length > 0 ? (
                  <>
                    <Box sx={{ width: '100%', border: `1px solid lightgrey`, borderRadius: '5px' }}>
                      <Scrollbar alwaysShowTracks>
                        <BoxTable container>
                          {tables.map((item, index) => (
                            <Table key={item.id} table={item} />
                          ))}
                        </BoxTable>
                        <Box> </Box>
                      </Scrollbar>
                    </Box>
                    <ButtonAdd onClick={handleClick}>Chọn lại</ButtonAdd>
                  </>
                ) : (
                  <Box
                    onClick={handleClick}
                    sx={{
                      borderBottom: `1px solid gray`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      color: 'gray',
                      cursor: 'pointer',
                      ':&hover': { background: 'lightgrey' }
                    }}
                  >
                    <Typography sx={{ fontSize: '16px' }}>Chọn bàn</Typography>
                    <Icon icon="bx:caret-down" />
                  </Box>
                )}
              </InputWapper>
              <InputWapper>
                <Typography sx={{ fontSize: '16px' }}>Ghi chú:</Typography>
                <InputInfo
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  multiline
                  minRows={3}
                  maxRows={3}
                  fullWidth
                  placeholder="Aa"
                />
              </InputWapper>
              <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                <Typography sx={{ color: 'red' }}>{error}</Typography>
              </Box>
              <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                <ButtonOrder onClick={order}>Đặt bàn</ButtonOrder>
              </Box>
            </BoxInput>
          </BoxOrder>
        </Box>
      </Scrollbar>
      {modalChooseArea.status && (
        <ModalChooseArea
          checkin={Date.parse(moment(dateUse.getTime()).format(`MM/DD/YYYY`))}
          hour={hour}
          use={time}
          quantityCustomer={parseInt(quantityCustomer, 10)}
          chooseArea={chooseArea}
        />
      )}
    </RootStyle>
  );
}

export default Order;
