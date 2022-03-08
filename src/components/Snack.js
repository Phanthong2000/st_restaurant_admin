import React, { useEffect } from 'react';
import { Alert, Snackbar, styled, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { actionUserSnackbar } from '../redux/actions/userAction';

function Snack() {
  const snackbar = useSelector((state) => state.user.snackbar);
  const dispatch = useDispatch();
  return (
    <Snackbar
      open={snackbar.status}
      autoHideDuration={3000}
      onClose={() =>
        dispatch(
          actionUserSnackbar({
            status: false,
            content: '',
            type: 'success'
          })
        )
      }
    >
      <Alert severity={snackbar.type} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ fontWeight: 'bold' }}>{snackbar.content}</Typography>
      </Alert>
    </Snackbar>
  );
}

export default Snack;
