import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async () => {
    try {
      const response = await fetch(
        "https://parsing-app.onrender.com/news/favourites"
      );
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      throw error;
    }
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [
			{
				"text": "text",
				"title": "news1",
				"date": "26.11.2023 08-41",
				"like": 0,
				"site_id": 1,
				"id": 1,
				"is_favourite": false,
				"url": "news1 url",
				"repost": 0,
				"category_list": [
					{
						"id": 1,
						"is_active": true,
						"title": "cat1"
					},
					{
						"id": 2,
						"is_active": true,
						"title": "cat2"
					}
				],
				"comments_list": []
			},] // Сюда будут добавляться избранные элементы
  },
  reducers: {
    addToFavorites: (state, action) => {
      // Добавление элемента в избранные
      state.items.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      // Удаление элемента из избранных
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.news = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
