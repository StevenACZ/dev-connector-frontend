// Redux
import { configureStore } from '@reduxjs/toolkit';

// Reducers
import alertSlice from '../features/alertSlice';
import authSlice from '../features/authSlice';

export default configureStore({
  reducer: {
    alert: alertSlice,
    auth: authSlice
  }
});