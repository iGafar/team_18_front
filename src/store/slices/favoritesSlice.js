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
  async (newsItemId, thunkAPI) => {
    try {
      const { title, text } = thunkAPI.getState().news.news.find(item => item.id === newsItemId);
      const response = await fetch(
        `https://parsing-app.onrender.com/news/id/${newsItemId}`,
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
      return newsItemId;
    } catch (error) {
      console.error("Error adding to favorites:", error.message);
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
  reducers: {
    removeFromFavorites: (state, action) => {
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
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addToFavorites.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.status = "succeeded";
        const newsItemId = action.payload;
        if (!state.items.some((item) => item.id === newsItemId)) {
          state.items.push({ id: newsItemId });
        }
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
