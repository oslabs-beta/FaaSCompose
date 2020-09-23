import { createSlice } from '@reduxjs/toolkit';
import { StoreState } from '../store';

type TActionSetFlowRendererNodeId = {
  payload: string;
  type: string;
};

const canvasSlice = createSlice({
  name: 'canvas',
  initialState: {
    flowRendererNodeId: '',
  },
  reducers: {
    // setNodes: (state, action) => {
    //   state.flowRendererNodeId = action.payload;
    // },
    setFlowRendererNodeId: (state, action: TActionSetFlowRendererNodeId) => {
      state.flowRendererNodeId = action.payload;
    },
    // updateNodeName: (state, action) => {
    //   //will add nodes part later
    //   // state.nodes = action.payload.tempState;
    //   // console.log('---updateNodeName--', action);
    //   // state.nodes[action.payload.key] = { ...action.payload.p };
    // },
  },
});

//export const selectNodes = (state): object => state.canvas.nodes;
export const selectFlowRendererNodeId = (state: StoreState): string =>
  state.canvas.flowRendererNodeId;
//export const selectNodeName = (state): object => state.canvas.nodes;

export const { setFlowRendererNodeId } = canvasSlice.actions;

export default canvasSlice.reducer;
