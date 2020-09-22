import { createSlice } from '@reduxjs/toolkit';

type TState = {
  currentFuncs: TFuncsInventory;
};

interface TFunc {
  id: string;
  name: string;
  description: string;
  definition: string;
}
export interface TFuncsInventory {
  [key: string]: TFunc;
}
type TActionSetFuncs = {
  payload: TFuncsInventory;
  type: string;
};
type TActionAddFunc = {
  payload: TFunc;
  type: string;
};

const functionsSlice = createSlice({
  name: 'functions',
  initialState: {
    currentFuncs: {},
  },
  reducers: {
    setFuncs: (state: TState, action: TActionSetFuncs) => {
      state.currentFuncs = action.payload;
    },
    addFunc: (state: TState, action: TActionAddFunc) => {
      state.currentFuncs[action.payload.name] = action.payload;
    },
  },
});

export const selectFuncs = (state): TFuncsInventory =>
  state.functions.currentFuncs;

export const { setFuncs, addFunc } = functionsSlice.actions;

export default functionsSlice.reducer;
