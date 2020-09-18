import { createSlice } from '@reduxjs/toolkit';

const sequenceSlice = createSlice({
  name: 'sequence',
  initialState: {
    sequences: {
      list: ['init', 'ifelse', 'sequence'],
      current: 'init',
    },
  },

  reducers: {
    setSequence: (state, action) => {
      console.log('---PAY', action);
      state.sequences = action.payload;
    },
    changeCurrent: (state, action) => {
      console.log('---PAY', action);
      state.sequences.current = action.payload;
    },
  },
});

export const selectSequence = (state): object => state.sequences;

export const { setSequence, changeCurrent } = sequenceSlice.actions;
export default sequenceSlice.reducer;
