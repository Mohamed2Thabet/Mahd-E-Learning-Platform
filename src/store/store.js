import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import profileReducer from "./profileSlice";
import courseReducer from "./courseSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    course: courseReducer,
  },
});
