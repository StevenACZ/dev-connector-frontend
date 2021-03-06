// Redux
import { createSlice } from "@reduxjs/toolkit";

// Redux - Reducers
import { setAlertAsync } from './alertSlice';
import { clearProfile } from "./profileSlice";

// Axios
import axios from '../axios/index';

// Utils
import setAuthToken from "../utils/setAuthToken";

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
      state.loading = false;
    },
    registerFail: state => {
      localStorage.removeItem('token');
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    loginSuccess: ( state, action ) => {
      localStorage.setItem('token', action.payload.token);
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
    },
    loginFail: state => {
      localStorage.removeItem('token');
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    userLoaded: ( state, action ) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    authError: state => {
      localStorage.removeItem('token');
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    logoutUser: state => {
      localStorage.removeItem('token');
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
    accountDeleted: state => {
      localStorage.removeItem('token');
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    }
  }
});

export const {
  registerSuccess,
  registerFail,
  loginSuccess,
  loginFail,
  userLoaded,
  authError,
  logoutUser,
  accountDeleted
} = authSlice.actions;

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

export const login = ( email, password ) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify( { email, password } );

  try {
    const res = await axios.post( '/api/auth', body, config );

    dispatch( loginSuccess( res.data ) );
    dispatch( loadUser() );
  } catch ( err ) {
    const errors = err.response.data.errors;

    if ( errors ) {
      errors.forEach( error => dispatch( setAlertAsync( error.msg, 'dange' ) ) );
    };

    dispatch( loginFail() );
  }
};

export const logout = () => dispatch => {
  dispatch( logoutUser() );
  dispatch( clearProfile() );
}

export const loadUser = () => async dispatch => {
  if ( localStorage.token ) {
    setAuthToken( localStorage.token );
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch( userLoaded( res.data ) );
  } catch ( err ) {
    dispatch( authError() );
  }
}

// SELECT
export const selectUser = state => state.auth.user;
export const selectIsAuthenticated = state => state.auth.isAuthenticated;
export const selectLoading = state => state.auth.loading;

export default authSlice.reducer;