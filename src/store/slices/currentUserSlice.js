import { createSlice } from '@reduxjs/toolkit';

const initialState = {email: ''}

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.email = action.payload.email;
        }
    }
});

export const { setCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;