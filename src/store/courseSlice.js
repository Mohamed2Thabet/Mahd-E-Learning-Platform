import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const CMS_BASE_URL = "/cms/course";

// ────────────────────────────────
// ✅ THUNKS
// ────────────────────────────────

// GET all courses (admin/public)
export const fetchAllCourses = createAsyncThunk(
  "course/fetchAll",
  async ({ limit, offset, token }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${CMS_BASE_URL}/get-all/${limit}/${offset}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch courses");
      return data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// GET course by ID
export const fetchCourseById = createAsyncThunk(
  "course/fetchById",
  async ({ courseId }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${CMS_BASE_URL}/get-course/${courseId}`, {
        // headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch course");
      return data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// GET courses for specific educator
export const fetchCoursesForEducator = createAsyncThunk(
  "course/fetchForEducator",
  async ({ educatorId, limit, offset }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${CMS_BASE_URL}/get-for-educator/${educatorId}/${limit}/${offset}`, {

      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch courses");
      return data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// CREATE course
export const createCourse = createAsyncThunk(
  "course/create",
  async ({ formData, token }, { rejectWithValue }) => {

    console.log(token)
    try {
      const res = await fetch(`${CMS_BASE_URL}/create`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      console.log(data, "errot")
      if (!res.ok) throw new Error(data.message || "Create failed");
      return data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// UPDATE course
export const updateCourse = createAsyncThunk(
  "course/update",
  async ({ courseId, formData, token }, { rejectWithValue }) => {
    try {
      let body;
      let headers = {
        Authorization: `Bearer ${token}`,
      };

      if (formData instanceof FormData) {
        formData.append("courseId", courseId);
        body = formData;
      } else {
        body = JSON.stringify({ ...formData, courseId });
        headers["Content-Type"] = "application/json";
      }

      const res = await fetch(`${CMS_BASE_URL}/update`, {
        method: "PUT",
        headers,
        body,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update course");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);




// DELETE course
export const deleteCourse = createAsyncThunk(
  "course/delete",
  async ({ courseId, token }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${CMS_BASE_URL}/delete/${courseId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete course");
      return courseId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ────────────────────────────────
// ✅ SLICE
// ────────────────────────────────

const courseSlice = createSlice({
  name: "course",
  initialState: {
    list: [],
    educatorCourses: [],
    current: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCourse: (state) => {
      state.current = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchAllCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch by educator
      .addCase(fetchCoursesForEducator.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoursesForEducator.fulfilled, (state, action) => {
        state.loading = false;
        state.educatorCourses = action.payload;
      })
      .addCase(fetchCoursesForEducator.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch single
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // create
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.educatorCourses.push(action.payload);
        state.current = action.payload;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update
      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.educatorCourses.findIndex(c => c._id === action.payload._id);
        if (index !== -1) state.educatorCourses[index] = action.payload;
        if (state.current?._id === action.payload._id) state.current = action.payload;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // delete
      .addCase(deleteCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.educatorCourses = state.educatorCourses.filter(c => c._id !== action.payload);
        if (state.current?._id === action.payload) state.current = null;
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCourse } = courseSlice.actions;
export default courseSlice.reducer;
