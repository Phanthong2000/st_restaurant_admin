import axios from 'axios';
import api from '../../assets/api/api';
import {
  ACTION_TABLE_MODAL_EDIT_TABLE,
  ACTION_TABLE_MODAL_ADD_TABLE,
  ACTION_TABLE_GET_ALL_TABLES,
  ACTION_TABLE_SORT_TABLE,
  ACTION_TABLE_MODAL_CHANGE_AREA
} from './types';

export const actionTableGelAllTables = (data) => ({
  type: ACTION_TABLE_GET_ALL_TABLES,
  payload: data
});

export const actionTableModalAddTable = (data) => ({
  type: ACTION_TABLE_MODAL_ADD_TABLE,
  payload: data
});

export const actionTableModalEditTable = (data) => ({
  type: ACTION_TABLE_MODAL_EDIT_TABLE,
  payload: data
});

export const actionTableSortTable = (data) => ({
  type: ACTION_TABLE_SORT_TABLE,
  payload: data
});
export const actionTableModalChangeArea = (data) => ({
  type: ACTION_TABLE_MODAL_CHANGE_AREA,
  payload: data
});
export const actionGetAllTables = () => async (dispatch) => {
  const data = await axios(`${api}ban/list`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
  });
  dispatch(
    actionTableGelAllTables(
      data.data.sort((a, b) => Date.parse(b.createAt) - Date.parse(a.createAt))
    )
  );
};
