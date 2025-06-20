import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 🔐 Utility to fetch with token
const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");
  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  const contentType = response.headers.get("content-type");
  const data = contentType?.includes("application/json") ? await response.json() : await response.text();

  if (!response.ok) throw new Error(data?.message || data || "Unknown error");
  return data;
};

// ✅ Get Profile
export const fetchProfile = createAsyncThunk("profile/fetchProfile", async (_, { rejectWithValue }) => {
  try {
    return await authFetch("/ums/user/profile");
    
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

// ✅ Update Names
export const updateProfileNames = createAsyncThunk("profile/updateProfileNames", async ({ firstName, lastName }, { rejectWithValue }) => {
  try {
    return await authFetch("/ums/user/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName }),
    });
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

// ✅ Change Password
export const changePassword = createAsyncThunk(
  "profile/changePassword",
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/ums/user/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const contentType = response.headers.get("content-type");
      const data = contentType?.includes("application/json")
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        console.error("❌ Password change failed:", data);
        throw new Error(data?.message || data || "Unknown error");
      }

      return data;
    } catch (err) {
      console.error("❌ Exception:", err.message);
      return rejectWithValue(err.message);
    }
  }
);


// ✅ Delete Account
export const deleteAccount = createAsyncThunk(
  "profile/deleteAccount",
  async (_, { rejectWithValue }) => {
    try {
      await authFetch("/ums/user/delete-account", {
        method: "DELETE",
      });
      return { success: true };
    } catch (err) {
      console.error("❌ Delete Error:", err);
      return rejectWithValue(err.message || "Failed to delete account");
    }
  }
);


// ✅ Forgot Password
export const forgotPassword = createAsyncThunk("profile/forgotPassword", async (_, { rejectWithValue }) => {
  try {
    return await authFetch("/ums/user/forgot-password", { method: "POST" });
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearProfile: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProfile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updateProfileNames
      .addCase(updateProfileNames.fulfilled, (state, action) => {
        if (state.data) {
          state.data.firstName = action.payload.firstName;
          state.data.lastName = action.payload.lastName;
        }
      })
      .addCase(updateProfileNames.rejected, (state, action) => {
        state.error = action.payload;
      })

      // changePassword
      .addCase(changePassword.pending, (state) => {
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.error = action.payload;
      })

      // deleteAccount
      .addCase(deleteAccount.fulfilled, (state) => {
        state.data = null;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.error = action.payload;
      })

      // forgotPassword
      .addCase(forgotPassword.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
