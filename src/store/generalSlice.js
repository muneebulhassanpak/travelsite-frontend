import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  errors: {},
};

const generalSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {
    startLoading(state, action) {
      state.loading = true;
    },
    closeLoading(state, action) {
      state.loading = false;
    },
  },
});

export const { startLoading, closeLoading } = generalSlice.actions;

export default generalSlice.reducer;
