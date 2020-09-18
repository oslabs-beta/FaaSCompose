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
    addFunc: (state, action) => {
      state.currentFuncs[action.payload.name] = action.payload;
    },
  },
});

export const selectFuncs = (state): object => state.functions.currentFuncs;

export const { setFuncs, addFunc } = functionsSlice.actions;

export default functionsSlice.reducer;
