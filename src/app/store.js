// Redux
import { configureStore } from '@reduxjs/toolkit';

// Reducers
import alertSlice from '../features/alertSlice';
import authSlice from '../features/authSlice';
import profileSlice from '../features/profileSlice';

export default configureStore({
  reducer: {
    alert: alertSlice,
    auth: authSlice,
    profile: profileSlice
  }
});