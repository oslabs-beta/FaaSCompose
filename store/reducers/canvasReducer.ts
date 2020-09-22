import { createSlice } from '@reduxjs/toolkit';

const canvasSlice = createSlice({
  name: 'canvas',
  initialState: {
    target: '',
  },
  reducers: {
    setNodes: (state, action) => {
      state.target = action.payload;
    },
    setTarget: (state, action) => {
      state.target = action.payload;
    },
    updateNodeName: (state, action) => {
      //will add nodes part later
      // state.nodes = action.payload.tempState;
      // console.log('---updateNodeName--', action);
      // state.nodes[action.payload.key] = { ...action.payload.p };
    },
  },
});

export const selectNodes = (state): object => state.canvas.nodes;
export const selectTarget = (state): object => state.canvas.target;
export const selectNodeName = (state): object => state.canvas.nodes;

export const { setNodes, setTarget, updateNodeName } = canvasSlice.actions;

export default canvasSlice.reducer;
