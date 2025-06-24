import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 🔹 جلب أفضل 5 كورسات عامة (بدون توكن)
export const fetchGlobalTop5 = createAsyncThunk(
  'recommendation/fetchGlobalTop5',
  async () => {
    const res = await fetch('/recommendation/top5');
    if (!res.ok) {
      throw new Error('Failed to fetch top 5 courses');
    }
    return await res.json();
  }
);

// 🔹 جلب الكورسات المخصصة للمستخدم (مع توكن من state)
export const fetchUserTop5 = createAsyncThunk(
  'recommendation/fetchUserTop5',
  async (_, { getState }) => {
    const token = getState().auth.token; // لازم تكون مخزن التوكن هنا
    const res = await fetch('/recommendation/user-top5', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch user top 5 courses');
    }
    return await res.json();
  }
);

const recommendationSlice = createSlice({
  name: 'recommendation',
  initialState: {
    top5: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGlobalTop5.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGlobalTop5.fulfilled, (state, action) => {
        state.loading = false;
        state.top5 = action.payload;
      })
      .addCase(fetchGlobalTop5.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchUserTop5.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserTop5.fulfilled, (state, action) => {
        state.loading = false;
        state.top5 = action.payload;
      })
      .addCase(fetchUserTop5.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default recommendationSlice.reducer;
