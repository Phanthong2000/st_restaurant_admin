import { io } from 'socket.io-client';
import {
  actionSocketGetSocket,
  actionSocketMe,
  actionSocketBroadcastSocket,
  actionSocketUSersJoin
} from '../redux/actions/socketAction';
import store from '../redux/store';
import {
  actionUserAddFeedback,
  actionUserAddBadgeFeedback,
  actionUserAddNotification,
  actionUserAddBadgeNotification
} from '../redux/actions/userAction';
import {
  actionGetBooksNow,
  actionNewBooks,
  actionOrderUnshiftAllBooks
} from '../redux/actions/orderAction';

let socket;
export const connectWithSocket = () => {
  socket = io('http://localhost:3001');
  store.dispatch(actionSocketGetSocket(socket));
  socket.on('broadcast', (data) => {
    store.dispatch(actionSocketBroadcastSocket(data));
  });
  socket.on('me', (id) => {
    store.dispatch(actionSocketMe(id));
  });
  socket.on('receive-user-join', (data) => {
    store.dispatch(actionSocketUSersJoin(data));
  });
  socket.on('receive-feedback', (data) => {
    console.log('feedback', data);
    store.dispatch(actionUserAddFeedback(data));
    store.dispatch(actionUserAddBadgeFeedback());
  });
  socket.on('receive-book', (data) => {
    store.dispatch(actionGetBooksNow());
    store.dispatch(actionNewBooks());
    store.dispatch(actionOrderUnshiftAllBooks(data.book));
    store.dispatch(actionUserAddNotification(data.notification));
    store.dispatch(actionUserAddBadgeNotification());
  });
};
export const registerUser = (data) => {
  socket.emit('register-new-user', data);
};
export const logoutSocket = () => {
  socket.disconnect();
};
