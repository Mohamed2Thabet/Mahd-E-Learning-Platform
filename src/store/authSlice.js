import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 📦 Helpers
const getTokenFromStorage = () => {
  try {
    return localStorage.getItem('token');
  } catch {
    return null;
  }
};

const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};
export const refreshAccessToken = createAsyncThunk(
  "auth/refreshAccessToken",
  async (_, { rejectWithValue }) => {
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      const res = await fetch("/ums/auth/refresh-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      const data = await res.json();
      if (!res.ok || !data.token) {
        throw new Error(data.message || "Refresh failed");
      }

      // Save to localStorage
      if (data.accessToken) localStorage.setItem('token', data.accessToken);
      if (data.refreshToken) localStorage.setItem('refresh', data.refreshToken);
      return data.token;
    } catch (err) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      return rejectWithValue(err.message);
    }
  }
);
// ✅ Login
export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await fetch('/ums/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    console.log(data)
    if (!response.ok) {
      const message = data.error || 'Login failed';
      return rejectWithValue(message);
    }
    if (data.accessToken) localStorage.setItem('token', data.accessToken);
    if (data.refreshToken) localStorage.setItem('refresh', data.refreshToken);
    if (data.user) localStorage.setItem('user', JSON.stringify(data.user));

    return { user: data.user, token: data.accessToken };
  } catch (error) {
    
    return rejectWithValue(error.message || 'Network error');
  }
});

// ✅ Google Login
export const googleLogin = createAsyncThunk('auth/googleLogin', async (idToken, { rejectWithValue }) => {
  try {
    const response = await fetch('/ums/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken })
    });

    const data = await response.json();
    if (!response.ok) return rejectWithValue(data.message || 'Google login failed');

    if (data.token) localStorage.setItem('token', data.token);
    if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
    
    return { user: data.user, token: data.token };
  } catch (error) {
    return rejectWithValue(error.message || 'Network error');
  }
});

// ✅ Logout
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  const token = localStorage.getItem('token');
localStorage.clear();

  if (token) {
    try {
      await fetch('/ums/auth/logout', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (err) {
      console.warn('Logout error:', err);
    }
  }

  return {};
});



// ✅ Register
export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await fetch('/ums/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    const data = await response.json();
    if (!response.ok) return rejectWithValue(data.message || data.error || 'Registration failed');
    if (data.message?.toLowerCase().includes("user already exists")) return rejectWithValue(data.message);

    return { user: data.user };
  } catch (error) {
    return rejectWithValue(error.message || 'Network error');
  }
});
// ✅ Forgot Password (Send OTP)
export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (email, { rejectWithValue }) => {
  try {
    const response = await fetch('/ums/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await response.json();
    if (!response.ok) return rejectWithValue(data.message || 'Failed to send OTP');

    return data.message;
  } catch (error) {
    return rejectWithValue(error.message || 'Network error');
  }
});

// ✅ Reset Password
export const resetPassword = createAsyncThunk('auth/resetPassword', async ({ email, otp, newPassword }, { rejectWithValue }) => {
  try {
    const response = await fetch('/ums/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, newPassword })
    });

    const data = await response.json();
    if (!response.ok) return rejectWithValue(data.message || 'Reset failed');

    return data.message;
  } catch (error) {
    return rejectWithValue(error.message || 'Network error');
  }
});

// ✅ Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getUserFromStorage(),
    token: getTokenFromStorage(),
    isLoading: false,
    error: null,
    isSuccess: false,
    isAuthenticated: !!getTokenFromStorage(),
    isInitialized: false
  },
  reducers: {
    clearError: state => { state.error = null },
    clearSuccess: state => { state.isSuccess = false },
    resetAuthState: state => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.error = null;
      state.isSuccess = false;
      state.isAuthenticated = false;
      state.isInitialized = true;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    manualLogin: (state, action) => {
      const { token, user } = action.payload || {};
      if (token && user) {
        state.token = token;
        state.user = user;
        state.isAuthenticated = true;
      } else {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
      }
      state.isInitialized = true;
    },
    manualLoginInit: (state) => {
      state.isInitialized = true;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isSuccess = true;
        state.isInitialized = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.isInitialized = true;
      })

      .addCase(googleLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isSuccess = true;
        state.isLoading = false;
        state.isInitialized = true;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.error = action.payload;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.isInitialized = true;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.isSuccess = false;
        state.error = null;
        state.isInitialized = true;
      })

      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isSuccess = true;
        state.isLoading = false;
        state.isInitialized = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.isSuccess = false;
        state.isInitialized = true;
      })      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isSuccess = false;
      })
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isSuccess = false;
      })
;
  }
});

export const {
  clearError,
  clearSuccess,
  resetAuthState,
  manualLogin,
  manualLoginInit
} = authSlice.actions;

export default authSlice.reducer;
