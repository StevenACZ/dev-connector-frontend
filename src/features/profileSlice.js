// Redux
import { createSlice } from "@reduxjs/toolkit";

// Redux - Reducers
import { setAlertAsync } from "./alertSlice";
import { accountDeleted } from "./authSlice";

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
    getProfiles: ( state, action ) => {
      state.profiles = action.payload;
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
    },
    updateProfile: ( state, action ) => {
      state.profile = action.payload;
      state.loading = false;
    },
    getRepos: ( state, action ) => {
      state.repos = action.payload;
      state.loading = false;
    }
  }
});

export const {
  getProfile,
  profileError,
  clearProfile,
  updateProfile,
  getProfiles,
  getRepos
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

export const getProfilesAction = () => async dispatch => {
  dispatch( clearProfile() );

  try {
    const res = await axios.get("/api/profile");

    dispatch( getProfiles( res.data ) );
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

export const getProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/user/${ userId }`);

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

export const getGithubRepos = username => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/github/${ username }`);

    dispatch( getRepos( res.data ) );
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

export const addExperience = (
  formData,
  history
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put('/api/profile/experience', formData, config);

    dispatch( updateProfile( res.data ) );

    dispatch(
      setAlertAsync( 'Experience Added', 'success', 3000 )
    );
    
    history.push('/dashboard');
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

export const addEducation = (
  formData,
  history
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put('/api/profile/education', formData, config);

    dispatch( updateProfile( res.data ) );

    dispatch(
      setAlertAsync( 'Education Added', 'success', 3000 )
    );

    history.push('/dashboard');
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

export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${ id }`);

    dispatch( updateProfile( res.data ) );

    dispatch(
      setAlertAsync( 'Experience Removed', 'success', 3000 )
    );
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

export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${ id }`);

    dispatch( updateProfile( res.data ) );

    dispatch(
      setAlertAsync( 'Education Removed', 'success', 3000 )
    );
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

export const deleteAccount = () => async dispatch => {
  if ( window.confirm('Are your sure? This can NOT be undone!') ) {
    try {
      await axios.delete('/api/profile/');
  
      dispatch( clearProfile() );
      dispatch( accountDeleted() );
  
      dispatch(
        setAlertAsync( 'Your account has been deleted', 3000 )
      );
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
}

// SELECT
export const selectProfile = state => state.profile.profile;
export const selectProfiles = state => state.profile.profiles;
export const selectRepos = state => state.profile.repos;
export const selectLoading = state => state.profile.loading;

export default profileSlice.reducer;