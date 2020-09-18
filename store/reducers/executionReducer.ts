import { createSlice } from '@reduxjs/toolkit';
import { StoreState } from '../store';

type Action = {
  type: string;
  payload: string;
};

const executionSlice = createSlice({
  name: 'execution',
  initialState: {
    composition: `{
      "Composition": "Click convert to get your platform specific composition"
    }`,
    input: '',
    output: `{
      "Result": "Click execute to get the result of your platform specific composition"
    }`,
  },
  reducers: {
    setComposition: (state, action: Action) => {
      state.composition = action.payload;
    },
    setUserInput: (state, action: Action) => {
      state.input = action.payload;
    },
    setCompositionOutput: (state, action: Action) => {
      state.output = action.payload;
    },
  },
});

export const selectComposition = (state: StoreState): string =>
  state.execution.composition;
export const selectUserInput = (state: StoreState): string =>
  state.execution.input;
export const selectCompositionOutput = (state: StoreState): string =>
  state.execution.output;

export const {
  setComposition,
  setUserInput,
  setCompositionOutput,
} = executionSlice.actions;

export default executionSlice.reducer;
