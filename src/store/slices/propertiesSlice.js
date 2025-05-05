import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  properties: [],
  property: null,
  loading: false,
  error: null,
};

export const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    fetchPropertiesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPropertiesSuccess: (state, action) => {
      state.properties = action.payload;
      state.loading = false;
    },
    fetchPropertySuccess: (state, action) => {
      state.property = action.payload;
      state.loading = false;
    },
    fetchPropertiesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearPropertyDetail: (state) => {
      state.property = null;
    }
  },
});

export const { fetchPropertiesStart, fetchPropertiesSuccess, fetchPropertySuccess, fetchPropertiesFailure, clearPropertyDetail } = propertiesSlice.actions;
export default propertiesSlice.reducer;