import { createSlice } from '@reduxjs/toolkit';
import sitesList from "../../components/Admin/mock/sites.json"
import { loadState, saveState } from '../../functions/localStorage'

const sitesFromLocalStorage = loadState()?.sites ?? [];

const initialState = {
  sites: sitesFromLocalStorage.length ? sitesFromLocalStorage : sitesList.sites,
};

const sitesSlice = createSlice({
  name: 'sites',
  initialState,
  reducers: {
    setSites: (state, action) => {
      state.sites = action.payload;
    },
  },
});

export const { setSites } = sitesSlice.actions;

export default sitesSlice.reducer;