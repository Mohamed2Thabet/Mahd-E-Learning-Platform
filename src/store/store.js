import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import profileReducer from "./profileSlice";
import courseReducer from "./courseSlice";
import sectionReducer from "./sectionSlice";
import videoReducer from "./videoSlice";
import examReducer from "./examSlice";
import studentReducer from "./studentSllice";
import playerReducer from "./playerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    course: courseReducer,
    section: sectionReducer,
    video: videoReducer,
    exam: examReducer,
    student: studentReducer,
    player: playerReducer,
  },
});
