import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  success: false,
};

export const contactRequestsSlice = createSlice({
  name: 'contactRequests',
  initialState,
  reducers: {
    createContactRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    createContactRequestSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    createContactRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export const { createContactRequestStart, createContactRequestSuccess, createContactRequestFailure } = contactRequestsSlice.actions;
export default contactRequestsSlice.reducer;