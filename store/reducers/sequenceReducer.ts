import { createSlice } from '@reduxjs/toolkit';

const sequenceSlice = createSlice({
  name: 'sequence',
  initialState: {
    sequences: {
      list: ['ifelse', 'sequence'],
      currentSelectedFlow: 'init',
    },
  },

  reducers: {
    setSequence: (state, action) => {
      state.sequences = action.payload;
    },
    changeCurrent: (state, action) => {
      state.sequences.currentSelectedFlow = action.payload;
    },
  },
});

export const selectSequence = (state): object => state.sequences.sequences;
export const selectCurrentSequence = (state): object =>
  state.sequences.sequences.currentSelectedFlow;

export const { setSequence, changeCurrent } = sequenceSlice.actions;
export default sequenceSlice.reducer;
