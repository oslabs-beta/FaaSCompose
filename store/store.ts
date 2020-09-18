import { configureStore } from '@reduxjs/toolkit';
import executionReducer from './reducers/executionReducer';
import testcounterReducer from './reducers/counterSlice';
import editorReducer from './reducers/editorReducer';
import functionsReducer from './reducers/functionsReducer';
import sequenceReducer from './reducers/sequenceReducer';

// import clockReducer from './lib/slices/clockSlice'

export default configureStore({
  reducer: {
    execution: executionReducer,
    counter: testcounterReducer,
    editor: editorReducer,
    functions: functionsReducer,
    sequences: sequenceReducer,
  },
  devTools: true,
});
