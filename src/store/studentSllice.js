// Redux Toolkit slice for Student Endpoints using fetch API
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE = '/cms/course';

const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  'Content-Type': 'application/json'
});

export const fetchEnrollments = createAsyncThunk(
  'student/fetchEnrollments',
  async (_, thunkAPI) => {
    try {
      console.log(getAuthHeader())
      const res = await fetch(`${API_BASE}/enrollments/${0}/${0}`, {
        headers: getAuthHeader()
      });
      if (!res.ok) throw new Error('Failed to fetch enrollments');
      const data = await res.json();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getEnrollment = createAsyncThunk(
  'student/getEnrollment',
  async (courseId, thunkAPI) => {
    try {
      const res = await fetch(`${API_BASE}/enrollment/${courseId}`, {
        headers: getAuthHeader()
      });
      if (!res.ok) throw new Error('Failed to fetch enrollment');
      return await res.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const saveCourse = createAsyncThunk(
  'student/saveCourse',
  async (courseId, thunkAPI) => {
    try {
      const res = await fetch(`${API_BASE}/save/${courseId}`, {
        method: 'PUT',
        headers: getAuthHeader()
      });
      if (!res.ok) throw new Error('Failed to save course');
      return courseId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const unsaveCourse = createAsyncThunk(
  'student/unsaveCourse',
  async (courseId, thunkAPI) => {
    try {
      const res = await fetch(`${API_BASE}/unsave/${courseId}`, {
        method: 'PUT',
        headers: getAuthHeader()
      });
      if (!res.ok) throw new Error('Failed to unsave course');
      return courseId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  } 
);

export const fetchSavedCourses = createAsyncThunk(
  'student/fetchSavedCourses',
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${API_BASE}/get-saved`, {
        headers: getAuthHeader()
      });

      if (!res.ok) throw new Error('Failed to fetch saved courses');
      const data = await res.json();
      console.log('Fetched Data:', data);

      // Safely access the first item in the array
      return data.data[0]?.courses || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const studentSlice = createSlice({
  name: 'student',
  initialState: {
    enrollments: [],
    savedCourses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrollments.fulfilled, (state, action) => {
        state.enrollments = action.payload;
        state.loading = false;
      })
      .addCase(fetchSavedCourses.fulfilled, (state, action) => {
        state.savedCourses = action.payload;
        state.loading = false;
      })
      .addCase(saveCourse.fulfilled, (state, action) => {
        state.savedCourses.push(action.payload);
      })
      .addCase(unsaveCourse.fulfilled, (state, action) => {
        state.savedCourses = state.savedCourses.filter(id => id !== action.payload);
      })
      .addMatcher(action => action.type.startsWith('student/') && action.type.endsWith('/pending'), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(action => action.type.startsWith('student/') && action.type.endsWith('/rejected'), (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error occurred';
      });
  },
});

export default studentSlice.reducer;
