import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchSitesAndNews = createAsyncThunk(
    'sitesAndNews/fetchSitesAndNews',
    async () => {
        const responseSites = await fetch(`https://parsing-app.onrender.com/site`, {
            method: "GET",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
        const sitesList = await responseSites.json();

        const responseNews = await fetch(`https://parsing-app.onrender.com/news`, {
            method: "GET",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
        const newsList = await responseNews.json();

        return { sitesList, newsList };
    }
);

const sitesAndNewsSlice = createSlice({
    name: 'sitesAndNews',
    initialState: { sitesList: [], newsList: [], status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchSitesAndNews.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchSitesAndNews.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.sitesList = action.payload.sitesList;
            state.newsList = action.payload.newsList;
        })
        .addCase(fetchSitesAndNews.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    },
});

export default sitesAndNewsSlice.reducer;