import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/api/v1/ums/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || 'Registration failed');
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoading: false,
    error: null,
    isSuccess: false
  },
  reducers: {
    clearError: state => { state.error = null; },
    clearSuccess: state => { state.isSuccess = false; },
    resetAuthState: state => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
      state.isSuccess = false;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isSuccess = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});



export const { clearError, clearSuccess, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
