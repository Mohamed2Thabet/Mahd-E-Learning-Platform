import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Get token from localStorage on app load
const getTokenFromStorage = () => {
  try {
    return localStorage.getItem('token');
  } catch (error) {
    return null;
  }
};

// Get user from localStorage on app load
const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    return null;
  }
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/api/v1/ums/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      console.log(data.message)
      if (!response.ok) {
        return rejectWithValue(data.message || 'Login failed');
      }

      // Store token and user in localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (idToken, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/api/v1/ums/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idToken })
      });

      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || 'Google login failed');
      }

      // Store token and user in localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Optional: Call logout endpoint if needed
      const token = localStorage.getItem('token');
      if (token) {
        await fetch('/api/api/v1/ums/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }

      return {};
    } catch (error) {
      // Even if logout fails, clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {};
    }
  }
);
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

      // ✅ نتحقق من حالة الـ status
      if (!response.ok) {
        return rejectWithValue(data.message || data.error || 'Registration failed');
      }

      // ✅ نتحقق من محتوى الرسالة لو السيرفر رجّع 200 وفيها خطأ
      if (
        data.message &&
        typeof data.message === 'string' &&
        data.message.toLowerCase().includes("user already exists")
      ) {
        return rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error occurred');
    }
  }
);



const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getUserFromStorage(),
    token: getTokenFromStorage(),
    isLoading: false,
    error: null,
    isSuccess: false,
    isAuthenticated: !!getTokenFromStorage()
  },
  reducers: {
    clearError: state => {
      state.error = null;
    },
    clearSuccess: state => {
      state.isSuccess = false;
    },
    resetAuthState: state => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.error = null;
      state.isSuccess = false;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
  extraReducers: builder => {
    builder
      // Login User
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isSuccess = true;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      // Google Login
      .addCase(googleLogin.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isSuccess = true;
        state.isAuthenticated = true;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      // Logout User
      .addCase(logoutUser.fulfilled, state => {
        state.user = null;
        state.token = null;
        state.isLoading = false;
        state.error = null;
        state.isSuccess = false;
        state.isAuthenticated = false;
      })

      // Register User
      .addCase(registerUser.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user =  action.payload.user;
        state.isSuccess = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ; // This will contain the API error message
        state.isSuccess = false;
      })

  }
});

export const { clearError, clearSuccess, resetAuthState } = authSlice.actions;
export default authSlice.reducer;