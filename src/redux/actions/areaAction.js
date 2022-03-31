import axios from 'axios';
import api from '../../assets/api/api';
import {
  ACTION_AREA_MODAL_ADD_AREA,
  ACTION_AREA_GET_ALL_AREAS,
  ACTION_AREA_MODAL_EDIT_AREA
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

export const actionGetAllAreas = () => (dispatch) => {
  axios.get(`${api}khuVuc/list`).then((res) => {
    dispatch(
      actionAreaGetAllAreas(
        res.data.sort((a, b) => Date.parse(b.createAt) - Date.parse(a.createAt))
      )
    );
  });
};
