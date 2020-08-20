import { createSlice } from '@reduxjs/toolkit';
import { CounterStateType } from './counterSlice';

export type ExecutionStateType = {
  composition: string;
  input: string;
  output: string;
};

export type GlobalState = {
  counter: CounterStateType;
  execution: ExecutionStateType;
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
    setComposition: (state, action) => {
      state.composition = action.payload;
    },
    setUserInput: (state, action) => {
      state.input = action.payload;
    },
    setCompositionOutput: (state, action) => {
      state.output = action.payload;
    },
  },
});

export const selectComposition = (state: GlobalState): string =>
  state.execution.composition;
export const selectUserInput = (state: GlobalState): string =>
  state.execution.input;
export const selectCompositionOutput = (state: GlobalState): string =>
  state.execution.output;

export const {
  setComposition,
  setUserInput,
  setCompositionOutput,
} = executionSlice.actions;

export default executionSlice.reducer;
