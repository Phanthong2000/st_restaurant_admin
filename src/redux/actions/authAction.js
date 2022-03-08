import { ACTION_AUTH_LOGGED_IN } from './types';

export const actionAuthLoggedIn = (data) => ({
  type: ACTION_AUTH_LOGGED_IN,
  payload: data
});
