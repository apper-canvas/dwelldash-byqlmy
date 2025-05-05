import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searches: [],
  loading: false,
  error: null,
};

export const searchesSlice = createSlice({
  name: 'searches',
  initialState,
  reducers: {
    fetchSearchesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSearchesSuccess: (state, action) => {
      state.searches = action.payload;
      state.loading = false;
    },
    fetchSearchesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addSearch: (state, action) => {
      state.searches.unshift(action.payload);
      // Keep only the 5 most recent searches
      state.searches = state.searches.slice(0, 5);
    },
    clearSearches: (state) => {
      state.searches = [];
    }
  },
});

export const { fetchSearchesStart, fetchSearchesSuccess, fetchSearchesFailure, addSearch, clearSearches } = searchesSlice.actions;
export default searchesSlice.reducer;