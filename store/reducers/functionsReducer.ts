import { createSlice } from '@reduxjs/toolkit';

const functionsSlice = createSlice({
  name: 'functions',
  initialState: {
    currentFuncs: {},
  },
  reducers: {
    setFuncs: (state, action) => {
      state.currentFuncs = action.payload;
    },
  },
});

export const selectFuncs = (state): object => state.functions.currentFuncs;

export const { setFuncs } = functionsSlice.actions;

export default functionsSlice.reducer;
