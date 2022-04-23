import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, styled, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: '10px 20px'
}));
const BoxIcon = styled(Box)(({ theme }) => ({
  padding: '5px 20px',
  borderRadius: '20px',
  background: 'lightgrey',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: '5px'
}));
function UserInput({ user, index }) {
  const usersInputting = useSelector((state) => state.chat.usersInputting);
  const AvatarUser = styled(Avatar)(({ theme }) => ({
    width: '35px',
    height: '35px',
    zIndex: 10 - index,
    marginLeft: `${index > 0 && '-5px'}`,
    border: `1px solid #fff`
  }));
  if (index === 4)
    return (
      <AvatarUser>
        <Typography sx={{ fontWeight: 'bold', fontSize: '14px' }}>
          +{usersInputting.length - 4}
        </Typography>
      </AvatarUser>
    );
  return <AvatarUser src={user.anhDaiDien} />;
}
function BoxUsersInputting() {
  const usersInputting = useSelector((state) => state.chat.usersInputting);
  return (
    <RootStyle>
      <Box sx={{ display: 'flex' }}>
        {usersInputting.slice(0, 5).map((item, index) => (
          <UserInput key={index} user={item} index={index} />
        ))}
      </Box>
      <BoxIcon>
        <Icon style={{ width: '30px', height: '30px' }} icon="eos-icons:three-dots-loading" />
      </BoxIcon>
    </RootStyle>
  );
}

export default BoxUsersInputting;
