import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [], // Сюда будут добавляться избранные элементы
  },
  reducers: {
    addToFavorites: (state, action) => {
      // Добавление элемента в избранные
      state.items.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      // Удаление элемента из избранных
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
