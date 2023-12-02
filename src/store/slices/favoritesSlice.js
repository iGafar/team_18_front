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
    items: [], // Сюда будут добавляться избранные элементы
    status: "idle", // Добавлено начальное значение для статуса
    error: null, // Добавлено начальное значение для ошибки
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
				console.log(action.payload);
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
