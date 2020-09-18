import { configureStore } from '@reduxjs/toolkit';
import executionReducer from './reducers/executionReducer';
import testcounterReducer from './reducers/counterSlice';
// import clockReducer from './lib/slices/clockSlice'
export type StoreState = {
  execution: {
    composition: string;
    input: string;
    output: string;
  };
  counter: {
    value: number;
  };
};

export default configureStore<StoreState>({
  reducer: {
    execution: executionReducer,
    counter: testcounterReducer,
  },
  devTools: true,
});
