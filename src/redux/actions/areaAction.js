import axios from 'axios';
import api from '../../assets/api/api';
import {
  ACTION_AREA_MODAL_ADD_AREA,
  ACTION_AREA_GET_ALL_AREAS,
  ACTION_AREA_MODAL_EDIT_AREA,
  ACTION_AREA_GET_ALL_TABLES,
  ACTION_AREA_GET_AREAS_BY_NAME
} from './types';

export const actionAreaModalAdd = (data) => ({
  type: ACTION_AREA_MODAL_ADD_AREA,
  payload: data
});
export const actionAreaGetAllAreas = (data) => ({
  type: ACTION_AREA_GET_ALL_AREAS,
  payload: data
});
export const actionAreaModalEditArea = (data) => ({
  type: ACTION_AREA_MODAL_EDIT_AREA,
  payload: data
});
export const actionAreaGetAreasByName = (data) => ({
  type: ACTION_AREA_GET_AREAS_BY_NAME,
  payload: data
});
export const actionGetAllAreas = () => (dispatch) => {
  axios.get(`${api}khuVuc/list`).then((res) => {
    dispatch(
      actionAreaGetAllAreas(
        res.data.sort((a, b) => Date.parse(b.createAt) - Date.parse(a.createAt))
      )
    );
  });
};

export const actionGetAreasByName = (name) => async (dispatch) => {
  if (name === '') {
    const data = await axios.get(`${api}khuVuc/list`);
    dispatch(actionAreaGetAreasByName(data.data));
  } else {
    const data = await axios.get(`${api}khuVuc/list/tenKhuVuc`, {
      params: {
        tenKhuVuc: name
      }
    });
    dispatch(actionAreaGetAreasByName(data.data));
  }
};
