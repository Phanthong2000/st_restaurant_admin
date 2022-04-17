import React from 'react';
import { Avatar, Box, Card, Grid, IconButton, styled, Tooltip, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RootStyle = styled(Grid)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '50px'
}));
const IconWrapper = styled(IconButton)(({ theme }) => ({
  width: '100%',
  cursor: 'default'
}));
const AvatarFood = styled(Avatar)(({ theme }) => ({
  width: '120px',
  height: '120px',
  position: 'absolute',
  zIndex: 2,
  top: -40
}));
const WrapperInfo = styled(Card)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
  background: theme.palette.white,
  minHeight: '250px'
}));
const FoodName = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '16px',
  fontFamily: theme.typography.fontFamily.primary
}));
const Price = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '12px',
  fontFamily: theme.typography.fontFamily.primary,
  color: theme.palette.main
}));
const BoxLove = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center'
}));
const Status = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily.primary,
  color: theme.palette.gray,
  fontSize: '14px'
}));
const BoxButton = styled(Box)(({ theme }) => ({
  width: '30px',
  height: '30px',
  background: '#dcecf7',
  color: theme.palette.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '5px',
  cursor: 'pointer'
}));
CustomerItemGrid.prototype = {
  food: PropTypes.object
};
function CustomerItemGrid({ customer, index }) {
  const broadcast = useSelector((state) => state.socket.broadcast);
  const navigate = useNavigate();
  const goToCustomerDetail = () => {
    navigate(`/home/customer-detail/${customer.id}`);
  };
  return (
    <RootStyle item xs={6} sm={6} md={4} lg={3} xl={2.4}>
      <IconWrapper disableFocusRipple disableRipple disableTouchRipple>
        <AvatarFood sx={{ boxShadow: 10 }} src={customer.anhDaiDien} />
        <WrapperInfo>
          <Box> </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <FoodName>
              {index + 1}. {customer.hoTen}
            </FoodName>
            <Price>SĐT: {customer.soDienThoai}</Price>
            <Status>{customer.taiKhoan.trangThai}</Status>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Icon
                style={{
                  width: '30px',
                  height: '30px',
                  color:
                    broadcast.find((br) => br.userId === customer.id) !== undefined
                      ? 'green'
                      : 'gray'
                }}
                icon="ci:dot-05-xl"
              />
              <Typography sx={{ fontSize: '14px' }}>
                {broadcast.find((br) => br.userId === customer.id) !== undefined
                  ? `Online`
                  : 'Offline'}
              </Typography>
            </Box>
            <Box sx={{ marginTop: '5px' }}>
              <BoxButton onClick={goToCustomerDetail}>
                <Tooltip title="Xem thông tin">
                  <Icon icon="clarity:eye-line" />
                </Tooltip>
              </BoxButton>
            </Box>
          </Box>
        </WrapperInfo>
      </IconWrapper>
    </RootStyle>
  );
}

export default CustomerItemGrid;
