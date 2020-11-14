import { createSlice } from '@reduxjs/toolkit';
import { StoreState } from '../store';

const editorSlice = createSlice({
  name: 'editorview',
  initialState: {
    showEditor: false,
  },
  reducers: {
    toggleFuncEditor: (state) => {
      state.showEditor = !state.showEditor;
    },
  },
});

export const selectShow = (state: StoreState): boolean =>
  state.editor.showEditor;

export const { toggleFuncEditor } = editorSlice.actions;

export default editorSlice.reducer;
