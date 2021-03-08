// Redux
import { createSlice } from "@reduxjs/toolkit";

// Axios
import axios from '../axios/index';

// Reducers
// import { setAlertAsync } from './alertSlice';

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
    }
  }
});

export const { getProfile, profileError } = profileSlice.actions;

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

export default profileSlice.reducer;