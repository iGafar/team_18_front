import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "./slices/newsSlice";
import favoritesSlice from "./slices/favoritesSlice";
import currentUserSlice from "./slices/currentUserSlice"
import { loadState, saveState } from '../functions/localStorage'

const persistedState = loadState();

const store = configureStore({
  reducer: {
    news: newsSlice,
    favorites: favoritesSlice,
    currentUser: currentUserSlice,
  },
  preloadedState: persistedState
});

store.subscribe(() => {
  saveState({
    // news: store.getState().news,
    // favorites: store.getState().favorites,
    currentUser: store.getState().currentUser
  });
});

export default store;