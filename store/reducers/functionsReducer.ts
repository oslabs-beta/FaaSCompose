import { createSlice } from '@reduxjs/toolkit';

type TState = {
  currentFuncs: TFuncsInventory;
  clickedFunc: string;
  funcToEdit: TFunc;
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
type TActionSetCurrentFunc = {
  payload: string;
  type: string;
};

const functionsSlice = createSlice({
  name: 'functions',
  initialState: {
    currentFuncs: {},
    clickedFunc: '',
    funcToEdit: {
      id: '',
      name: 'Name',
      description: 'Description',
      definition: '// write your function here',
    },
  },
  reducers: {
    setFuncs: (state: TState, action: TActionSetFuncs) => {
      state.currentFuncs = action.payload;
    },
    addFunc: (state: TState, action: TActionAddFunc) => {
      state.currentFuncs[action.payload.id] = action.payload;
    },
    setFuncToEdit: (state: TState, action: TActionAddFunc) => {
      state.funcToEdit = action.payload;
    },
    setCurrentFunc: (state: TState, action: TActionSetCurrentFunc) => {
      state.clickedFunc = action.payload;
    },
  },
});

export const selectFuncs = (state): TFuncsInventory =>
  state.functions.currentFuncs;

export const selectClickedFunc = (state): string => state.functions.clickedFunc;

export const selectFuncToEdit = (state): TFunc => state.functions.funcToEdit;

export const {
  setFuncs,
  addFunc,
  setCurrentFunc,
  setFuncToEdit,
} = functionsSlice.actions;

export default functionsSlice.reducer;
