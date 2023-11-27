import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "./slices/newsSlice";
import favoritesSlice from "./slices/favoritesSlice";

export default configureStore({
  reducer: {
    news: newsSlice,
    favorites: favoritesSlice,
  },
});
