import React, { useState, useEffect } from 'react';
import ReactFlow, { Background } from 'react-flow-renderer';
import { nanoid } from 'nanoid';

const initElements = [
  {
    id: 'init-start',
    data: { label: 'Start' },
    position: { x: 190, y: 5 },
    style: {
      background: '#333',
      color: '#fff',
      border: '1px solid #bbb',
      width: 70,
      padding: 5,
    },
  },
  {
    id: 'init-0',
    data: { label: 'Choose a Flow first' },
    position: { x: 75, y: 75 },
    style: {
      fontWeight: 700,
      fontSize: 20,
      background: '#eee',
      color: '#333',
      border: '1px solid #bebebe',
      width: 300,
    },
  },

  {
    id: 'init-end',
    data: { label: 'End' },
    position: { x: 190, y: 180 },
    style: {
      background: '#333',
      color: '#fff',
      border: '1px solid #bbb',
      width: 70,
      padding: 5,
    },
  },
  {
    id: 'init-e1-3',
    source: 'init-start',
    target: 'init-0',
    animated: true,
  },
  {
    id: 'init-e1-4',
    source: 'init-0',
    target: 'init-end',
    animated: true,
  },
];

const elements = [
  {
    id: 'sequence-start',
    data: { label: 'Start' },
    position: { x: 190, y: 5 },
    style: {
      background: '#333',
      color: '#fff',
      border: '1px solid #bbb',
      width: 70,
      padding: 5,
    },
  },
  {
    id: 'sequence-0',
    data: { label: 'Node 1' },
    position: { x: 150, y: 75 },
    style: {
      fontWeight: 400,
      fontSize: 15,
      background: '#eee',
      color: '#333',
    },
  },
  {
    id: 'sequence-1',
    data: { label: 'Node 2' },
    position: { x: 150, y: 150 },
    style: {
      fontWeight: 400,
      fontSize: 15,
      background: '#eee',
      color: '#333',
    },
  },
  {
    id: 'sequence-end',
    data: { label: 'End' },
    position: { x: 190, y: 225 },
    style: {
      background: '#333',
      color: '#fff',
      border: '1px solid #bbb',
      width: 70,
      padding: 5,
    },
  },
  {
    id: 'e1-2',
    source: 'sequence-0',
    target: 'sequence-1',
    animated: true,
  },
  {
    id: 'e1-3',
    source: 'sequence-start',
    target: 'sequence-0',
    animated: true,
  },
  {
    id: 'e1-4',
    source: 'sequence-1',
    target: 'sequence-end',
    animated: true,
  },
];

const elementsIfElse = [
  {
    id: 'ifelse-start',
    data: { label: 'Start' },
    position: { x: 190, y: 5 },
    style: {
      background: '#333',
      color: '#fff',
      border: '1px solid #bbb',
      width: 70,
      padding: 5,
    },
  },
  {
    id: 'ifelse-0',
    data: { label: 'Node 1' },
    position: { x: 150, y: 75 },
    style: {
      fontWeight: 400,
      fontSize: 15,
      background: '#eee',
      color: '#333',
    },
  },
  {
    id: 'ifelse-1',
    data: { label: 'Node 2' },
    position: { x: 50, y: 150 },
    style: {
      fontWeight: 400,
      fontSize: 15,
      background: '#eee',
      color: '#333',
    },
  },
  {
    id: 'ifelse-2',
    data: { label: 'Node 3' },
    position: { x: 250, y: 150 },
    style: {
      fontWeight: 400,
      fontSize: 15,
      background: '#eee',
      color: '#333',
    },
  },
  {
    id: 'ifelse-end',
    data: { label: 'End' },
    position: { x: 190, y: 225 },
    style: {
      background: '#333',
      color: '#fff',
      border: '1px solid #bbb',
      width: 70,
      padding: 5,
    },
  },
  {
    id: 'e2-2',
    source: 'ifelse-start',
    target: 'ifelse-0',
    animated: true,
  },
  {
    id: 'e2-3',
    source: 'ifelse-0',
    target: 'ifelse-1',
    animated: false,
    type: 'smoothstep',
    arrowHeadType: 'arrowclosed',
  },
  {
    id: 'e2-4',
    source: 'ifelse-0',
    target: 'ifelse-2',
    animated: false,
    type: 'smoothstep',
    arrowHeadType: 'arrowclosed',
    style: { stroke: '#f6ab6c' },
  },
  {
    id: 'e2-5',
    source: 'ifelse-1',
    target: 'ifelse-end',
    animated: false,
    type: 'smoothstep',
  },
  {
    id: 'e2-6',
    source: 'ifelse-2',
    target: 'ifelse-end',
    animated: false,
    type: 'smoothstep',
    style: { stroke: '#f6ab6c' },
  },
];

export const ACTIONS = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  // MODIFY_LABEL: "MODIFY_LABEL",
  RESET: 'RESET',
  UPDATE_POSITION: 'UPDATE_POSITION',
  SEQUENCE: 'SEQUENCE',
  FUNCTIONS: 'FUNCTIONS',
};

const reducer = (state, action) => {
  // console.log('reducer::', state, action);
  switch (action.type) {
    case ACTIONS.SEQUENCE: {
      // console.log('ACTIONS.SEQUENCE', action);
      if (action.payload === 'sequence') {
        return elements;
      }
      if (action.payload === 'ifelse') {
        return elementsIfElse;
      }
      return initElements;
    }
    case ACTIONS.FUNCTIONS: {
      const newState = state.map((node) => {
        if (node.id === action.payload.target) {
          node.data = { label: action.payload.functionNames };
          node.style = { background: '#4C5C68' };
        }
        return node;
      });

      return newState;
    }

    case ACTIONS.ADD: {
      return [
        ...state,
        {
          id: nanoid(),
          data: { label: action.label },
          position: { x: 100, y: 100 },
        },
      ];
    }
    case ACTIONS.REMOVE: {
      return state.filter((node) => node.id !== action.id);
    }
    default:
      return state;
  }
};

const BasicFlow = (props) => {
  const [nodes, dispatch] = useReducer(reducer, initElements);
  const [type, setType] = useState('sequence');
  const [functions, setFunctions] = useState();
  const [target, setTarget] = useState('');

  useEffect(() => {
    // update in sequence
    setType(() => {
      if (type !== props.type) {
        dispatch({ type: ACTIONS.SEQUENCE, payload: props.type });
        return props.type;
      }
      if (type === props.type) return type;
    });

    // update functions name
    setFunctions(() => {
      if (props.functionNames !== functions && target !== undefined) {
        dispatch({
          type: ACTIONS.FUNCTIONS,
          payload: { target, functionNames: props.functionNames },
        });
        return props.functionNames;
      }
      return functions;
    });
  });
  const onElementClick = (event, element) => setTarget(element.id);

  return (
    <ReactFlow
      elements={nodes}
      style={{
        width: '100%',
        height: '300px',
      }}
      onElementClick={onElementClick}
    >
      <Background color="#aaa" gap={4} />
    </ReactFlow>
  );
};

export default BasicFlow;
