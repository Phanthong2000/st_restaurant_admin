import { Box, Button, styled, Typography } from '@mui/material';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import api from '../../assets/api/api';
import { storage } from '../../firebase-config';
import { actionUserBackdrop, actionUserSnackbar } from '../../redux/actions/userAction';
import { actionGetAllNews } from '../../redux/actions/newsAction';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  background: theme.palette.white
}));
const ButtonAdd = styled(Button)(({ theme }) => ({
  width: '100%',
  textTransform: 'none',
  background: theme.palette.main,
  color: theme.palette.white,
  fontWeight: 'bold',
  fontFamily: theme.typography.fontFamily.primary,
  display: 'flex',
  alignItems: 'center',
  marginTop: '10px',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
QuillEditor.prototype = {
  image: PropTypes.object,
  title: PropTypes.string
};
function QuillEditor({ image, title }) {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const formats = [
    'header',
    'bold',
    'font',
    'italic',
    'underline',
    'strike',
    'image',
    'list',
    'file',
    'link',
    'code-block',
    'blockquote',
    'clean',
    'bullet',
    'size',
    'indent',
    'align'
  ];
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean']
    ]
  };
  const handleChange = (e) => {
    console.log(e);
    setContent(e);
  };
  const handleAdd = () => {
    dispatch(
      actionUserBackdrop({
        status: true,
        content: 'Thêm tin tức'
      })
    );
    const storageRef = ref(storage, `tinTuc/${user.hoTen}.${new Date().getTime()}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const news = {
            tieuDe: title,
            hinhAnh: downloadURL,
            noiDung: content,
            nguoiQuanLyDTO: {
              ...user
            },
            luotXem: 0
          };
          axios
            .post(
              `${api}tinTuc/create`,
              {
                ...news
              },
              {
                headers: {
                  Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
              }
            )
            .then((res) => {
              dispatch(actionGetAllNews());
              dispatch(
                actionUserBackdrop({
                  status: false,
                  content: 'Thêm tin tức'
                })
              );
              dispatch(
                actionUserSnackbar({
                  status: true,
                  content: 'Thêm tin tức thành công',
                  type: 'success'
                })
              );
              navigate('/home/news');
            })
            .catch((err) => console.log(err));
        });
      }
    );
  };
  return (
    <RootStyle>
      <ReactQuill
        // style={{ maxHeight: '400px', overflow: 'auto' }}
        formats={formats}
        modules={modules}
        placeholder="Nội dung tin tức..."
        value={content}
        onChange={handleChange}
      />
      {/* <Typography dangerouslySetInnerHTML={{ __html: content }} /> */}
      <ButtonAdd disabled={!image || title === '' || content === '<p><br></p>'} onClick={handleAdd}>
        Thêm tin tức
      </ButtonAdd>
    </RootStyle>
  );
}

export default QuillEditor;
