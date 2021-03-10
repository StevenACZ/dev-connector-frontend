// Redux
import { createSlice } from "@reduxjs/toolkit";

// uuid
import { v4 as uuidv4 } from 'uuid';

export const alertSlice = createSlice({
  name: 'alert',
  initialState: [],
  reducers: {
    setAlert: ( state, action ) => {
      state.push( action.payload );
    },
    removeAlert: ( state, action ) => {
      return state.filter( alert => alert.id !== action.payload );
    },
  }
});

export const { setAlert, removeAlert } = alertSlice.actions;

// ACTIONS
export const setAlertAsync = ( msg, alertType, timeout = 4000 ) => dispatch => {
  const id = uuidv4();

  dispatch(
    setAlert({
      msg,
      alertType,
      id
    })
  );

  setTimeout(() => {
    dispatch( removeAlert( id ) );
  }, timeout);
};

// SELECT
export const selectAlerts = state => state.alert;

export default alertSlice.reducer;
