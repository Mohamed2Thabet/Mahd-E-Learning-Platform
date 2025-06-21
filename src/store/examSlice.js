import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 🔐 إعداد Base API
const BASE_URL = "/cms/exam";

const getHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

// ✅ GET exams by section ID
export const getExamsBySection = createAsyncThunk(
  "exam/getBySection",
  async ({ sectionId, token }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/get-all-exams/${sectionId}`, {
        method: "GET",
        headers: getHeaders(token),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Fetch failed");
      return { sectionId, exams: result.data || [] };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ✅ GET all sections' exams - الدالة الرئيسية
export const getAllSectionExams = createAsyncThunk(
  "exam/getAllSectionExams",
  async ({ sections, token }, { dispatch, rejectWithValue }) => {
    try {
      const sectionExamsPromises = sections.map(section =>
        dispatch(getExamsBySection({
          sectionId: section._id || section.id,
          token
        })).unwrap()
      );

      const results = await Promise.allSettled(sectionExamsPromises);

      const sectionExams = {};
      results.forEach((result, index) => {
        const sectionId = sections[index]._id || sections[index].id;
        if (result.status === 'fulfilled') {
          sectionExams[sectionId] = result.value.exams;
        } else {
          sectionExams[sectionId] = [];
          console.error(`Failed to fetch exams for section ${sectionId}:`, result.reason);
        }
      });

      return sectionExams;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ✅ CREATE exam
export const createExam = createAsyncThunk("exam/create", async ({ data, token }, { rejectWithValue }) => {
  try {
    const res = await fetch(`${BASE_URL}/create`, {
      method: "POST",
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Create failed");
    return result;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

// ✅ GET by exam ID
export const getExamById = createAsyncThunk("exam/getById", async ({ examId, token }, { rejectWithValue }) => {
  try {
    const res = await fetch(`${BASE_URL}/get-exam/${examId}`, {
      method: "GET",
      headers: getHeaders(token),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Fetch failed");
    return result;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

// ✅ UPDATE exam
export const updateExam = createAsyncThunk("exam/update", async ({ data, token }, { rejectWithValue }) => {
  try {
    const res = await fetch(`${BASE_URL}/update`, {
      method: "PUT",
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Update failed");
    return result;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

// ✅ DELETE exam
export const deleteExam = createAsyncThunk("exam/delete", async ({ examId, courseId, token }, { rejectWithValue }) => {
  try {
    const res = await fetch(`${BASE_URL}/delete/${examId}`, {
      method: "DELETE",
      headers: getHeaders(token),
      body: JSON.stringify({ courseId }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Delete failed");
    return result;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

// ✅ Initial State
const initialState = {
  exam: null,
  exams: [],
  sectionExams: {}, // { sectionId: [exams] }
  loading: false,
  sectionLoading: false,
  error: null,
  successMessage: null,
};

// 🧩 Slice
const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    clearExamState: (state) => {
      state.exam = null;
      state.error = null;
      state.successMessage = null;
    },
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    clearSectionExams: (state) => {
      state.sectionExams = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createExam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExam.fulfilled, (state, action) => {
        state.loading = false;
        state.exam = action.payload.data;
        state.successMessage = "Exam created successfully.";
      })
      .addCase(createExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get by ID
      .addCase(getExamById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExamById.fulfilled, (state, action) => {
        state.loading = false;
        state.exam = action.payload.data;
      })
      .addCase(getExamById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateExam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExam.fulfilled, (state, action) => {
        state.loading = false;
        state.exam = action.payload.data;
        state.successMessage = "Exam updated successfully.";
      })
      .addCase(updateExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteExam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExam.fulfilled, (state) => {
        state.loading = false;
        state.exam = null;
        state.successMessage = "Exam deleted successfully.";
      })
      .addCase(deleteExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get by Section
      .addCase(getExamsBySection.pending, (state) => {
        state.sectionLoading = true;
      })
      .addCase(getExamsBySection.fulfilled, (state, action) => {
        state.sectionLoading = false;
        const { sectionId, exams } = action.payload;
        state.sectionExams[sectionId] = exams;
      })
      .addCase(getExamsBySection.rejected, (state, action) => {
        state.sectionLoading = false;
        state.error = action.payload;
      })

      // Get All Section Exams
      .addCase(getAllSectionExams.pending, (state) => {
        state.sectionLoading = true;
        state.error = null;
      })
      .addCase(getAllSectionExams.fulfilled, (state, action) => {
        state.sectionLoading = false;
        state.sectionExams = action.payload;
      })
      .addCase(getAllSectionExams.rejected, (state, action) => {
        state.sectionLoading = false;
        state.error = action.payload;
      });
  },
});

// ✅ Export
export const {
  clearExamState,
  clearMessages,
  clearSectionExams
} = examSlice.actions;
export default examSlice.reducer;
