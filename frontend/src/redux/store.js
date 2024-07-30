import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './features/userSlice';
import { thunk } from 'redux-thunk'; // Use named import

export default configureStore({
  reducer: {
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(thunk), // Include thunk in middleware
});
