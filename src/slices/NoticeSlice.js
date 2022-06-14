import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noticeService from "../services/noticeService";

const initialState = {
  notice: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

// Get notice details, for edit data
export const notice = createAsyncThunk(
  "notice/GET",
  async (thunkAPI) => {
    //const token = thunkAPI.getState().auth.user.token;

    const data = await noticeService.notice();

    // Check for errors
    //if (data.errors) {
    //return thunkAPI.rejectWithValue(data.errors[0]);
    //}

    return data;
  }
);

// Update user details
export const updateNotice = createAsyncThunk(
  "notice/update",
  async (notice, thunkAPI) => {
    //const token = thunkAPI.getState().auth.user.token;

    const data = await noticeService.updateNotice(notice);

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    //console.log(data);

    return data;
  }
);

// Get user details
export const getNoticeDetails = createAsyncThunk(
  "user/get",
  async (thunkAPI) => {
    //const token = thunkAPI.getState().auth.user.token;    

    const data = await noticeService.getNoticeDetails();

     // Check for errors
     if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    //console.log(data);

    return data;
  }
);

export const noticeSlice = createSlice({
  name: "notice",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },  

  },
  extraReducers: (builder) => {
    builder
      .addCase(notice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(notice.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(updateNotice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNotice.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
        state.message = "Comunicados atualizado com sucesso!";
      })
      .addCase(updateNotice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(getNoticeDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNoticeDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      });
  },
});

export const { resetMessage } = noticeSlice.actions;
export default noticeSlice.reducer;