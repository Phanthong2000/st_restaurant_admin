import React, { useEffect, useState } from 'react';
import {
  Box,
  styled,
  Typography,
  IconButton,
  Badge,
  Avatar,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemButton,
  Skeleton
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Responsive from '../../components/Reponsive';
import sidebarHomeConfig from './SidebarHomeConfig';
import BoxProfile from '../../components/home/BoxProfile';
import {
  actionUserBoxFeedBack,
  actionUserBoxNotification,
  actionUserBoxProfile
} from '../../redux/actions/userAction';
import BoxNotification from '../../components/home/BoxNotification';
import BoxFeedback from '../../components/home/BoxFeedback';
import { registerUser } from '../../utils/wssConnection';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100px',
  padding: theme.spacing(5, 1, 0),
  borderBottom: `2px solid ${theme.palette.black}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}));
const BoxLogo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center'
}));
const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '18px',
  color: theme.palette.main
}));
const Admin = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '16px',
  color: theme.palette.gray,
  width: '100%',
  textAlign: 'right',
  fontFamily: theme.typography.fontFamily.primary
}));
const BoxAvatar = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center'
}));
const AvatarAdmin = styled(Avatar)(({ theme }) => ({
  width: '50px',
  height: '50px',
  outline: `1px solid ${theme.palette.main}`,
  cursor: 'pointer'
}));
const WrapperAvatarAdmin = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: '#dcecf7',
  borderRadius: '50px',
  paddingRight: '20px',
  width: '150px'
}));
const Username = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontFamily: theme.typography.fontFamily.primary,
  marginLeft: '20px',
  color: theme.palette.main,
  fontWeight: 'bold'
}));
const WrapperIcon = styled(Box)(({ theme }) => ({
  width: '45px',
  height: '45px',
  border: `1px solid lightgrey`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50px',
  marginRight: '20px',
  cursor: 'pointer'
}));
const IconNav = styled(Icon)(({ theme }) => ({
  width: '25px',
  height: '25px',
  color: theme.palette.main
}));
function NavbarHome() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { pathname } = useLocation();
  const user = useSelector((state) => state.user.user);
  const boxProfile = useSelector((state) => state.user.boxProfile);
  const boxNotification = useSelector((state) => state.user.boxNotification);
  const boxFeedBack = useSelector((state) => state.user.boxFeedBack);
  const badgeNotification = useSelector((state) => state.user.badgeNotification);
  const badgeFeedback = useSelector((state) => state.user.badgeFeedback);
  const me = useSelector((state) => state.socket.me);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openMenu = () => {
    setOpenDrawer(true);
  };
  useEffect(() => {
    if (me !== '') {
      registerUser({
        userId: JSON.parse(localStorage.getItem('admin')).id,
        socketId: me,
        type: 'admin'
      });
    }
    return function () {
      return null;
    };
  }, [me]);
  return (
    <RootStyle>
      <Responsive width="lgUp">
        <BoxLogo>
          <Box sx={{ textAlign: 'right' }}>
            <Logo>ST Restaurant</Logo>
            <Admin>Quản lý</Admin>
          </Box>
          <IconButton onClick={openMenu} sx={{ marginLeft: '10px' }}>
            <IconNav style={{ width: '35px', height: '35px' }} icon="heroicons-solid:menu-alt-2" />
          </IconButton>
        </BoxLogo>
      </Responsive>
      <Typography> </Typography>
      {/* {!boxProfile ? ( */}
      <BoxAvatar>
        <WrapperIcon
          onClick={(e) => {
            e.stopPropagation();
            dispatch(actionUserBoxFeedBack(!boxFeedBack));
          }}
        >
          <Badge color="primary" badgeContent={badgeFeedback}>
            <IconNav icon="codicon:feedback" />{' '}
          </Badge>
        </WrapperIcon>

        <WrapperIcon
          onClick={(e) => {
            e.stopPropagation();
            dispatch(actionUserBoxNotification(!boxNotification));
          }}
        >
          <Badge color="primary" badgeContent={badgeNotification}>
            <IconNav icon="clarity:notification-line" />
          </Badge>
        </WrapperIcon>
        <WrapperAvatarAdmin>
          {user.id === undefined ? (
            <Skeleton variant="circular" sx={{ width: '50px', height: '50px' }} />
          ) : (
            <AvatarAdmin
              onClick={(e) => {
                e.stopPropagation();
                dispatch(actionUserBoxProfile(!boxProfile));
              }}
              src={user.anhDaiDien}
            />
          )}
          <Username>
            {user.id !== undefined &&
              `${user.hoTen.substring(user.hoTen.lastIndexOf(' '), user.hoTen.length)}`}
          </Username>
        </WrapperAvatarAdmin>
      </BoxAvatar>
      {/* ) : (
        <Box
          onClick={() => dispatch(actionUserBoxProfile(false))}
          sx={{
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid blue`,
            borderRadius: '40px',
            cursor: 'pointer'
          }}
        >
          <Icon
            style={{ width: '30px', height: '30px', color: 'blue' }}
            icon="bxs:caret-right-circle"
          />
        </Box>
      )} */}
      <SwipeableDrawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List sx={{ width: '250px', minHeight: '100%', background: '#fff' }}>
          {sidebarHomeConfig.map((item, index) => (
            <ListItem key={index}>
              <ListItemButton
                onClick={() => {
                  setOpenDrawer(false);
                  navigate(`${item.path}`);
                }}
                sx={
                  pathname.includes(item.path) && {
                    background: '#3C58C9',
                    color: '#fff',
                    '&:hover': { background: '#4d91f7' }
                  }
                }
              >
                <Icon icon={item.icon} />
                <Typography sx={{ marginLeft: '10px' }}>{item.name}</Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
      {boxProfile && <BoxProfile />}
      {boxNotification && <BoxNotification />}
      {boxFeedBack && <BoxFeedback />}
    </RootStyle>
  );
}

export default NavbarHome;
