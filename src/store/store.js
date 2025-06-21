import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import profileReducer from "./profileSlice";
import courseReducer from "./courseSlice";
import sectionReducer from "./sectionSlice";
import videoReducer from "./videoSlice";
import examReducer from "./examSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    course: courseReducer,
    section: sectionReducer,
    video: videoReducer,
    exam: examReducer,
  },
});
