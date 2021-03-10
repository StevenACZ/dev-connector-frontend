// Redux
import { createSlice } from "@reduxjs/toolkit";

// Redux - Reducers
import { setAlertAsync } from "./alertSlice";

// Axios
import axios from '../axios/index';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
  },
  reducers: {
    getProfile: ( state, action ) => {
      state.profile = action.payload;
      state.loading = false;
    },
    profileError: ( state, action ) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearProfile: state => {
      state.profile = null;
      state.profiles = null;
      state.repos = [];
      state.loading = false;
    }
  }
});

export const {
  getProfile,
  profileError,
  clearProfile
} = profileSlice.actions;

// ACTIONS
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch( getProfile( res.data ) );
  } catch ( err ) {
    dispatch( 
      profileError( 
        {
          msg: err.response.data.msg,
          status: err.response.status
        }
      )
    );
  }
}

export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/profile', formData, config);

    dispatch( getProfile( res.data ) );

    dispatch(
      setAlertAsync( edit ? 'Profile Updated' : 'Profile Created', 'success', 3000 )
    );

    if ( !edit ) {
      history.push('/dashboard');
    }
  } catch ( err ) {
    const errors = err.response.data.errors;

    if ( errors ) {
      errors.forEach( error => dispatch( setAlertAsync( error.msg, 'dange' ) ) );
    };

    dispatch( 
      profileError( 
        {
          msg: err.response.data.msg,
          status: err.response.status
        }
      )
    );
  }
}

// SELECT
export const selectProfile = state => state.profile.profile;
export const selectLoading = state => state.profile.loading;

export default profileSlice.reducer;