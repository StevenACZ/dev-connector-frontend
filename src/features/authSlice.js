// Redux
import { createSlice } from "@reduxjs/toolkit";

// Axios
import axios from '../axios/index';

// Reducers
import { setAlertAsync } from './alertSlice';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
  },
  reducers: {
    registerSuccess: ( state, action ) => {
      localStorage.setItem('token', action.payload.token);
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false
    },
    registerFail: state => {
      localStorage.removeItem('token');
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false
    }
  }
});

export const { registerSuccess, registerFail } = authSlice.actions;

// ACTIONS
export const register = ( name, email, password ) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify( { name, email, password } );

  try {
    const res = await axios.post( '/api/users', body, config );

    dispatch( registerSuccess( res.data ) );
  } catch ( err ) {
    const errors = err.response.data.errors;

    if ( errors ) {
      errors.forEach( error => dispatch( setAlertAsync( error.msg, 'dange' ) ) );
    };

    dispatch( registerFail() );
  }
};

export default authSlice.reducer;