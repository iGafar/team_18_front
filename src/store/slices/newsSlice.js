import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
  reducers: {
		fetchNewsSuccess: (state, action) => {
      state.status = "succeeded";
      state.news = action.payload;
    },
    addToFavoritesSuccess: (state, action) => {
      const newsItemId = action.payload;
      const newsItem = state.news.find((item) => item.id === newsItemId);
      if (newsItem) {
        newsItem.isFavorite = true; // Предполагаем, что у вас есть поле isFavorite в элементе новости
      }
    },
	},
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
      });
  },
});

export const { fetchNewsSuccess, addToFavoritesSuccess } = newsSlice.actions;
export default newsSlice.reducer;