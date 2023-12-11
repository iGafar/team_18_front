import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
  try {
    const response = await fetch('https://parsing-app.onrender.com/category');
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  tags: [],
  status: 'idle',
  error: null,
};

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tags = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default tagsSlice.reducer;
