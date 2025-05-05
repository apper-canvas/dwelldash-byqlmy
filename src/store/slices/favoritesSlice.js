import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: [],
  loading: false,
  error: null,
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    fetchFavoritesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchFavoritesSuccess: (state, action) => {
      state.favorites = action.payload;
      state.loading = false;
    },
    fetchFavoritesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(fav => fav.Id !== action.payload);
    },
    clearFavorites: (state) => {
      state.favorites = [];
    }
  },
});

export const { fetchFavoritesStart, fetchFavoritesSuccess, fetchFavoritesFailure, addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;