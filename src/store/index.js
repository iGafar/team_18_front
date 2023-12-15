import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "./slices/newsSlice";
import favoritesSlice from "./slices/favoritesSlice";
import currentUserSlice from "./slices/currentUserSlice"
import { saveState } from '../functions/localStorage'
import sitesSlice from "./slices/sitesSlice";
import tagsSlice from "./slices/tagsSlice";


const store = configureStore({
  reducer: {
    tags: tagsSlice,
    news: newsSlice,
    sites: sitesSlice,
    favorites: favoritesSlice,
    currentUser: currentUserSlice,
  },
});

store.subscribe(() => {
  saveState({
    currentUser: store.getState().currentUser,
    filterSettings: store.getState().filterSettings,
  });
});

export default store;
