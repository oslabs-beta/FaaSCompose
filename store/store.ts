import { configureStore } from '@reduxjs/toolkit';
import executionReducer from './reducers/executionReducer';
import editorReducer from './reducers/editorReducer';
import functionsReducer, { TFuncsInventory } from './reducers/functionsReducer';
import sequenceReducer, { TInitialSequences } from './reducers/sequenceReducer';
import canvasReducer from './reducers/canvasReducer';

export type StoreState = {
  execution: {
    composition: string;
    input: string;
    output: string;
    compositionName: string;
  };
  editor: {
    showEditor: boolean;
  };
  functions: {
    currentFuncs: TFuncsInventory;
    clickedFunc: string;
  };
  sequences: {
    initialSequences: TInitialSequences;
  };
  canvas: {
    flowRendererNodeId: string;
  };
};

export default configureStore<StoreState>({
  reducer: {
    execution: executionReducer,
    editor: editorReducer,
    functions: functionsReducer,
    sequences: sequenceReducer,
    canvas: canvasReducer,
  },
  devTools: true,
});
