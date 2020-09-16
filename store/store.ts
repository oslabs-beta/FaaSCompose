import { configureStore } from '@reduxjs/toolkit';
import executionReducer from './reducers/executionReducer';
import testcounterReducer from './reducers/counterSlice';
import editorReducer from './reducers/editorReducer';

// import clockReducer from './lib/slices/clockSlice'

export default configureStore({
  reducer: {
    execution: executionReducer,
    counter: testcounterReducer,
    editor: editorReducer,
  },
  devTools: true,
});
