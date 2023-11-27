import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const newUser = { id: state.length + 1, name: action.payload };
      state.push(newUser);
    },
    removeUser: (state, action) => {
      return state.filter((user) => user.id !== action.payload);
    },
    updateUser: (state, action) => {
      const { id, newName } = action.payload;
      const userToUpdate = state.find((user) => user.id === id);
      if (userToUpdate) {
        userToUpdate.name = newName;
      }
    },
  },
});

export const { addUser, removeUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
