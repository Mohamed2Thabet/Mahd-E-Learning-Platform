import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const CMS_BASE_URL = "/cms/section";

export const fetchSectionsByCourse = createAsyncThunk(
  "section/fetchByCourse",
  async ({ courseId, token }, { rejectWithValue }) => {
  
    try {
      const res = await fetch(`/cms/section/get-all/${courseId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data)
      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch sections");
      }

      return data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchSectionById = createAsyncThunk(
  "section/fetchById",
  async ({ sectionId, token }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${CMS_BASE_URL}/get-section/${sectionId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch section");
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addSection = createAsyncThunk(
  "section/add",
  async ({ data, token }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${CMS_BASE_URL}/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to add section");
      }

      const result = await res.json();
      return result;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateSection = createAsyncThunk(
  "section/update",
  async ({ data, token }, { rejectWithValue }) => {
    try {
      const payload = {
        title: data.title,
        order: data.order,
        sectionId: data._id || data.sectionId,
        courseId: data.courseId,
      };

      const res = await fetch(`${CMS_BASE_URL}/update`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to update section");
      }

      return result;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


export const deleteSection = createAsyncThunk(
  "section/delete",
  async ({ sectionId, courseId, token }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${CMS_BASE_URL}/delete/${sectionId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to delete section");
      }

      const result = await res.json();
      return result;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


// Slice

const sectionSlice = createSlice({
  name: "section",
  initialState: {
    sections: [],
    currentSection: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetSectionState: (state) => {
      state.sections = [];
      state.currentSection = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchSectionsByCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSectionsByCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action.payload;
        state.error = null;
      })
      .addCase(fetchSectionsByCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch by ID
      .addCase(fetchSectionById.fulfilled, (state, action) => {
        state.currentSection = action.payload;
        state.error = null;
      })

      // Add
      .addCase(addSection.fulfilled, (state, action) => {
        state.sections.push(action.payload);
        state.error = null;
      })

      // Update
      .addCase(updateSection.fulfilled, (state, action) => {
        const index = state.sections.findIndex((s) => s._id === action.payload._id);
        if (index !== -1) state.sections[index] = action.payload;
        state.error = null;
      })

      // Delete
      .addCase(deleteSection.fulfilled, (state, action) => {
        state.sections = state.sections.filter((s) => s._id !== action.meta.arg.sectionId);
        state.error = null;
      })

      // Catch errors
      .addMatcher(
        (action) => action.type.startsWith("section/") && action.type.endsWith("rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { resetSectionState } = sectionSlice.actions;
export default sectionSlice.reducer;
