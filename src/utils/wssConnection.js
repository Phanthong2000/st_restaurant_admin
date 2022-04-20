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
import {
  actionChatAddMessage,
  actionChatDeleteMessage,
  actionChatUpdateMessage
} from '../redux/actions/chatAction';

let socket;
export const connectWithSocket = () => {
  socket = io('https://st-restaurant-server.herokuapp.com/');
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
  socket.on('send-message', (data) => {
    store.dispatch(actionChatAddMessage(data.message));
  });
  socket.on('read-message', (data) => {
    console.log(data);
    store.dispatch(
      actionChatUpdateMessage({
        message: data.message
      })
    );
  });
  socket.on('delete-message', (data) => {
    store.dispatch(
      actionChatDeleteMessage({
        index: data.index,
        message: data.message
      })
    );
  });
  socket.on('update-message-stop-meeting', (data) => {
    const messages = store.getState().chat.allMessages;
    let index = -1;
    for (let i = 0; i < messages.length; i += 1) {
      if (messages.at(i).id === data.message.id) {
        index = i;
      }
    }
    if (index !== -1)
      store.dispatch(
        actionChatDeleteMessage({
          index,
          message: data.message
        })
      );
  });
};
export const registerUser = (data) => {
  socket.emit('register-new-user', data);
};
export const readMessageSocket = ({ socketIds, message }) => {
  socket.emit('read-message', { socketIds, message });
};
export const sendMessageSocket = ({ socketIds, message }) => {
  socket.emit('send-message', { socketIds, message });
};
export const deleteMessageSocket = ({ socketIds, message, index }) => {
  socket.emit('delete-message', { socketIds, message, index });
};
export const stopMeetingSocket = (roomId) => {
  socket.emit('stop-meeting', roomId);
};
export const updateMessageStopMeetingSocket = ({ socketIds, message }) => {
  socket.emit('update-message-stop-meeting', { socketIds, message });
};
export const logoutSocket = () => {
  socket.disconnect();
};
