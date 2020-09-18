import { createSlice } from '@reduxjs/toolkit';

const sequenceSlice = createSlice({
  name: 'sequence',
  initialState: {
    sequence: 'init',
  },
  reducers: {
    chooseSequence: (state, action) => {
      state.sequence = action.payload;
    },
  },
});

export const { chooseSequence } = sequenceSlice.actions;
export default sequenceSlice.reducer;
