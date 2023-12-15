import { createSlice } from '@reduxjs/toolkit';
import { loadState } from '../../functions/localStorage'


const initialState = {
    email: loadState()?.currentUser?.email || '',
    filterSettings: loadState()?.currentUser?.filterSettings || {}
}

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.email = action.payload.email;
        },
        setFilterSettings: (state, action) => {
            state.filterSettings = action.payload;
        }
    }
});

export const { setCurrentUser, setFilterSettings } = currentUserSlice.actions;

export default currentUserSlice.reducer;