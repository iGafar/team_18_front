import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addToFavorites } from './favoritesSlice'

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  try {
    const response = await fetch('https://parsing-app.onrender.com/news/?limit=10&skip=0');
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  news: [],
  status: 'idle',
  error: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.news = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        const index = state.news.findIndex(item => item.id === action.payload);
        state.news[index].is_favourite = true
      });
  },
});

export default newsSlice.reducer;