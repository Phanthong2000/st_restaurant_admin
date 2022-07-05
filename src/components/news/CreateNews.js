import React, { useRef, useState } from 'react';
import { Box, Button, Card, Grid, IconButton, styled, TextField, Typography } from '@mui/material';
import { Scrollbar } from 'smooth-scrollbar-react';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { actionUserSnackbar } from '../../redux/actions/userAction';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  background: '#f0f5f4',
  display: 'flex'
}));
const Title = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontFamily: theme.typography.fontFamily.primary,
  fontWeight: 'bold'
}));
const BoxContent = styled(Grid)(({ theme }) => ({
  width: '100%'
}));
const BoxLeft = styled(Grid)(({ theme }) => ({
  padding: '10px 5px'
}));
const WrapperLeft = styled(Card)(({ theme }) => ({
  width: '100%',
  padding: '10px',
  background: theme.palette.white
}));
const BoxRight = styled(Grid)(({ theme }) => ({
  padding: '10px 5px'
}));
const WrapperRight = styled(Card)(({ theme }) => ({
  width: '100%',
  padding: '10px',
  background: theme.palette.white
}));
const BoxImage = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  marginTop: '10px',
  border: `1px solid lightgrey`,
  borderRadius: '5px',
  height: '200px',
  cursor: 'pointer',
  padding: '5px'
}));
const ImageNews = styled('img')(({ theme }) => ({
  width: '100%',
  height: '190px'
}));
function CreateNews() {
  const [image, setImage] = useState();
  const [title, setTitle] = useState('');
  const fileRef = useRef();
  const dispatch = useDispatch();
  const onChangeFile = (files) => {
    if (files && files[0]) {
      if (files[0].size < 2097152) {
        setImage(files[0]);
      } else {
        dispatch(
          actionUserSnackbar({
            status: true,
            content: 'Hình ảnh tin tức phải nhỏ hơn 2MB',
            type: 'error'
          })
        );
      }
    }
  };
  return (
    <RootStyle>
      <Scrollbar style={{ padding: '10px' }} alwaysShowTracks>
        <Box>
          <Title>Thêm tin tức</Title>
          <BoxContent container>
            <BoxLeft item xs={12} sm={12} md={3} lg={3} xl={3}>
              <WrapperLeft>
                <TextField
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  fullWidth
                  label="Tiêu đề"
                  size="small"
                />
                {!image ? (
                  <BoxImage
                    onClick={() => {
                      fileRef.current.click();
                    }}
                  >
                    <Icon
                      style={{ width: '100px', height: '100px', color: 'gray' }}
                      icon="iconoir:add-media-image"
                    />
                    <Typography sx={{ fontWeight: 'bold', fontSize: '16px', color: 'gray' }}>
                      Chọn hình ảnh
                    </Typography>
                  </BoxImage>
                ) : (
                  <BoxImage>
                    <ImageNews src={URL.createObjectURL(image)} />
                  </BoxImage>
                )}
                {image && (
                  <Box sx={{ width: '100%', textAlign: 'center' }}>
                    <IconButton onClick={() => setImage()}>
                      <Icon
                        style={{ color: 'red', width: '30px', height: '30px' }}
                        icon="ion:close-circle"
                      />
                    </IconButton>
                  </Box>
                )}
              </WrapperLeft>
            </BoxLeft>
            <BoxRight item xs={12} sm={12} md={9} lg={9} xl={9}>
              <WrapperRight>{/* <QuillEditor image={image} title={title} /> */}</WrapperRight>
            </BoxRight>
          </BoxContent>
        </Box>
        <Box> </Box>
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
      </Scrollbar>
    </RootStyle>
  );
}

export default CreateNews;
