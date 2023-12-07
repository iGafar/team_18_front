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

export const addToFavorites = createAsyncThunk(
  "favorites/addToFavorites",
  async (newsItem) => {
    try {
      const { title, text } = newsItem;
      const response = await fetch(
        `https://parsing-app.onrender.com/news/id/${newsItem.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            text: text,
            is_favourite: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add to favorites");
      }

      console.log("Added to favorites successfully");
      return newsItem.id;
    } catch (error) {
      console.error("Error adding to favorites:", error.message);
      throw error;
    }
  }
);

export const removeFromFavorites = createAsyncThunk(
  "favorites/removeFromFavorites",
  async (newsItem) => {
    try {
      const { title, text } = newsItem;
      const response = await fetch(
        `https://parsing-app.onrender.com/news/id/${newsItem.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            text: text,
            is_favourite: false,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove from favorites");
      }
      return newsItem.id;
    } catch (error) {
      console.error("Error remove from favorites:", error.message);
      throw error;
    }
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.items.findIndex(
          (item) => item.id === action.payload
        );
        state.items.splice(index, 1);
      })
      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default favoritesSlice.reducer;
