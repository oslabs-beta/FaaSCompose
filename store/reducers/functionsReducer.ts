import { createSlice } from '@reduxjs/toolkit';

const functionsSlice = createSlice({
  name: 'functions',
  initialState: {
    currentFuncs: {},
    currentSelectedFunc: '',
  },
  reducers: {
    setFuncs: (state, action) => {
      state.currentFuncs = action.payload;
    },
    addFunc: (state, action) => {
      state.currentFuncs[action.payload.name] = action.payload;
    },
    setCurrentFunc: (state, action) => {
      state.currentSelectedFunc = action.payload;
    },
  },
});

export const selectFuncs = (state): object => state.functions.currentFuncs;
export const selectCurrent = (state): object =>
  state.functions.currentSelectedFunc;

export const { setFuncs, addFunc, setCurrentFunc } = functionsSlice.actions;

export default functionsSlice.reducer;
