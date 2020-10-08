import { createSlice } from '@reduxjs/toolkit';
import { StoreState } from '../store';

type TState = {
  currentFuncs: TFuncsInventory;
  clickedFunc: object;
  funcToEdit: TFunc;
};

type TFunc = {
  id: string;
  name: string;
  description: string;
  definition: string;
};
export type TFuncsInventory = {
  [key: string]: TFunc;
};
type TActionSetFuncs = {
  payload: TFuncsInventory;
  type: string;
};
type TActionAddFunc = {
  payload: TFunc;
  type: string;
};
type TActionCurrentFunc = {
  payload: string;
  type: object;
};

const functionsSlice = createSlice({
  name: 'functions',
  initialState: {
    currentFuncs: {},
    clickedFunc: { id: '', name: '' },
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
    setCurrentFunc: (state: TState, action: TActionCurrentFunc) => {
      state.clickedFunc = action.payload;
    },
  },
});

export const selectFuncs = (state: StoreState): TFuncsInventory =>
  state.functions.currentFuncs;
export const selectClickedFunc = (state: StoreState): object =>
  state.functions.clickedFunc;
export const selectFuncToEdit = (state: StoreState): TFunc =>
  state.functions.funcToEdit;

export const {
  setFuncs,
  addFunc,
  setCurrentFunc,
  setFuncToEdit,
} = functionsSlice.actions;

export default functionsSlice.reducer;
