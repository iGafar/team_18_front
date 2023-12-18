import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSites = createAsyncThunk('sites/fetchSites', async () => {
  try {
    const response = await fetch('https://parsing-app.onrender.com/site');
    const jsonData = await response.json();
		console.log(jsonData)
    return jsonData;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  sites: [],
  status: 'idle',
  error: null,
};

const sitesSlice = createSlice({
  name: 'sites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSites.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sites = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchSites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default sitesSlice.reducer;
