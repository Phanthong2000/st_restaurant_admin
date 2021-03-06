import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { actionGetAllCustomerByKeyword } from '../redux/actions/customerAction';
import { actionUserChooseNotification } from '../redux/actions/userAction';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(actionGetAllCustomerByKeyword(''));
    if (pathname !== '/home/book')
      dispatch(
        actionUserChooseNotification({
          id: '',
          page: 0
        })
      );
    return function () {
      return null;
    };
  }, [pathname]);

  return null;
}
