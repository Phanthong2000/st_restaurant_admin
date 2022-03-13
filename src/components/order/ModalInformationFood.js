import {
  Box,
  Card,
  Modal,
  styled,
  Typography,
  IconButton,
  Divider,
  Button,
  Stack
} from '@mui/material';
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { actionOrderModalInformation, actionOrderAddFoods } from '../../redux/actions/orderAction';

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
const BoxContent = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between'
}));
const BoxLeft = styled(Box)(({ theme }) => ({
  width: '55%'
}));
const BoxRight = styled(Stack)(({ theme }) => ({
  width: '40%',
  justifyContent: 'space-between',
  flexDirection: 'column'
}));
const AvatarFood = styled('img')(({ theme }) => ({
  width: '100%',
  height: '300px'
}));
const BoxSmallImage = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: '10px'
}));
const PriceFood = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '18px',
  fontFamily: theme.typography.fontFamily.primary,
  color: theme.palette.main,
  marginTop: '10px'
}));
const ButtonChooseFood = styled(Button)(({ theme }) => ({
  width: '45%',
  textTransform: 'none',
  color: theme.palette.white,
  background: theme.palette.main,
  fontSize: '16px',
  fontFamily: theme.typography.fontFamily.second,
  fontWeight: 'bold',
  marginBottom: '5px',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
function SmallImage({ image, avatar, hover }) {
  const Image = styled('img')(() => ({
    width: '50px',
    height: '50px',
    marginRight: '5px'
  }));
  return (
    <Image
      onMouseEnter={hover}
      sx={{ outline: avatar === image && `5px solid #3C58C9` }}
      src={image}
    />
  );
}
function ModalInformationFood() {
  const modalInformationFood = useSelector((state) => state.order.modalInformationFood);
  const [avatarFood, setAvatarFood] = useState(modalInformationFood.food.hinhAnh.at(0));
  const dispatch = useDispatch();
  const hoverSmallImage = (image) => {
    setAvatarFood(image);
  };
  const checkDescriptionLength = () => {
    if (modalInformationFood.food.moTa.length < 200) return `${modalInformationFood.food.moTa}`;
    return `${modalInformationFood.food.moTa.substring(0, 200)}...`;
  };
  const chooseFood = () => {
    dispatch(
      actionOrderAddFoods({
        food: modalInformationFood.food,
        quantity: 1
      })
    );
    dispatch(
      actionOrderModalInformation({
        status: false,
        food: {}
      })
    );
    window.scrollTo({ left: 0, top: 450, behavior: 'smooth' });
  };
  return (
    <Modal
      open={modalInformationFood.status}
      onClose={() =>
        dispatch(
          actionOrderModalInformation({
            status: false,
            food: {}
          })
        )
      }
    >
      <BoxModal>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography
            sx={{ color: '#000', fontWeight: 'bold', fontSize: '20px', fontFamily: 'sans-serif' }}
          >
            Thông tin món ăn
          </Typography>
          <IconButton
            onClick={() =>
              dispatch(
                actionOrderModalInformation({
                  status: false,
                  food: {}
                })
              )
            }
          >
            <Icon style={{ color: '#000' }} icon="ep:circle-close-filled" />
          </IconButton>
        </Box>
        <Divider sx={{ margin: '10px 0px' }} />
        <BoxContent>
          <BoxLeft>
            <AvatarFood src={avatarFood} />
            <BoxSmallImage>
              {modalInformationFood.food.hinhAnh.map((item, index) => (
                <SmallImage
                  hover={() => hoverSmallImage(item)}
                  avatar={avatarFood}
                  image={item}
                  key={index}
                />
              ))}
            </BoxSmallImage>
          </BoxLeft>
          <BoxRight>
            <Box>
              <Typography sx={{ fontWeight: 'bold', fontSize: '25px', fontFamily: 'sans-serif' }}>
                {modalInformationFood.food.tenMonAn}
              </Typography>
              <PriceFood>{`${modalInformationFood.food.donGia.toLocaleString(
                'es-Us'
              )} vnd`}</PriceFood>
              <Typography>{checkDescriptionLength()}</Typography>
            </Box>
            <ButtonChooseFood onClick={chooseFood}>Chọn món</ButtonChooseFood>
          </BoxRight>
        </BoxContent>
      </BoxModal>
    </Modal>
  );
}

export default ModalInformationFood;
