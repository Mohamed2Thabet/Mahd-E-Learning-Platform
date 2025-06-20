// store/videoSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const CMS_BASE_URL = '/cms/video';

export const fetchVideosBySection = createAsyncThunk(
  'video/fetchBySection',
  async ({ sectionId, token }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${CMS_BASE_URL}/get-all/${sectionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || 'Failed to fetch videos');
      }

      const data = await res.json();
      return data.data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addVideo = createAsyncThunk(
  'video/add',
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${CMS_BASE_URL}/add`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || 'Failed to add video');
      }

      const data = await res.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateVideo = createAsyncThunk(
  'video/update',
  async ({ videoId, title, order, courseId, token }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${CMS_BASE_URL}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          videoId,
          courseId,
          title,
          order,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || 'Failed to update video');
      }

      const data = await res.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



export const deleteVideo = createAsyncThunk(
  'video/delete',
  async ({ videoId, courseId, token }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${CMS_BASE_URL}/delete/${videoId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || 'Failed to delete video');
      }

      return videoId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const videoSlice = createSlice({
  name: 'video',
  initialState: {
    videos: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideosBySection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideosBySection.fulfilled, (state, action) => {
        state.loading = false;
        const newVideos = action.payload;
        newVideos.forEach(video => {
          if (!state.videos.find(v => v._id === video._id)) {
            state.videos.push(video);
          }
        });
      })
      .addCase(fetchVideosBySection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching videos';
      })

      .addCase(addVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.videos.push(action.payload);
      })
      .addCase(addVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error adding video';
      })

      .addCase(updateVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVideo.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.videos.findIndex(v => v._id === action.payload._id);
        if (index !== -1) {
          state.videos[index] = action.payload;
        }
      })
      .addCase(updateVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error updating video';
      })

      .addCase(deleteVideo.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(deleteVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = state.videos.filter(v => v._id !== action.payload);
      })
      .addCase(deleteVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error deleting video';
      });
  },
  
});

export default videoSlice.reducer;
