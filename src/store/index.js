import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import propertiesReducer from './slices/propertiesSlice';
import favoritesReducer from './slices/favoritesSlice';
import searchesReducer from './slices/searchesSlice';
import contactRequestsReducer from './slices/contactRequestsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    properties: propertiesReducer,
    favorites: favoritesReducer,
    searches: searchesReducer,
    contactRequests: contactRequestsReducer
  },
});