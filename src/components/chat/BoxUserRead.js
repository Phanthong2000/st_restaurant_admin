import React from 'react';
import { Avatar, Box, styled, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const RootStyle = styled(Box)((theme) => ({
  display: 'flex'
}));
function Reader({ user, index, count }) {
  const AvatarReader = styled(Avatar)(({ theme }) => ({
    width: '20px',
    height: '20px',
    zIndex: 5 - index,
    marginLeft: '-5px',
    outline: `1px solid #fff`
  }));
  if (index === 5)
    return (
      <AvatarReader sx={{ marginLeft: 0 }}>
        <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>+{`${count}`}</Typography>
      </AvatarReader>
    );
  return <AvatarReader src={user.anhDaiDien} />;
}
BoxUserRead.prototype = {
  message: PropTypes.object
};
function BoxUserRead({ message }) {
  const user = useSelector((state) => state.user.user);
  const checkUserRead = () => {
    if (!message.listNguoiQuanLyDaDoc && !message.listNhanVienDaDoc) return [];
    if (message.listNguoiQuanLyDaDoc && !message.listNhanVienDaDoc)
      return message.listNguoiQuanLyDaDoc.filter((item) => item.id !== user.id).slice(0, 4);
    if (!message.listNguoiQuanLyDaDoc && message.listNhanVienDaDoc)
      return message.listNhanVienDaDoc.filter((item) => item.id !== user.id).slice(0, 4);

    const data = message.listNguoiQuanLyDaDoc
      .filter((item) => item.id !== user.id)
      .concat(message.listNhanVienDaDoc.filter((item) => item.id !== user.id));
    return data.slice(0, 4);
  };
  const allUserRead = () => {
    if (!message.listNguoiQuanLyDaDoc && !message.listNhanVienDaDoc) return [];
    if (message.listNguoiQuanLyDaDoc && !message.listNhanVienDaDoc)
      return message.listNguoiQuanLyDaDoc.filter((item) => item.id !== user.id);
    if (!message.listNguoiQuanLyDaDoc && message.listNhanVienDaDoc)
      return message.listNhanVienDaDoc.filter((item) => item.id !== user.id);

    const data = message.listNguoiQuanLyDaDoc
      .filter((item) => item.id !== user.id)
      .concat(message.listNhanVienDaDoc.filter((item) => item.id !== user.id));
    return data;
  };
  return (
    <RootStyle
      sx={
        message.nguoiQuanLy && message.nguoiQuanLy.id === user.id
          ? { marginRight: '10px' }
          : { marginLeft: '10px' }
      }
    >
      {checkUserRead().map((item, index) => (
        <Reader key={index} index={index} user={item} />
      ))}
      {allUserRead().length > 4 && <Reader index={5} count={allUserRead().length - 4} />}
    </RootStyle>
  );
}

export default BoxUserRead;
