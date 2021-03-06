import React, { useState, useEffect, useReducer } from 'react';
import ReactFlow, { Background } from 'react-flow-renderer';
import { nanoid } from 'nanoid';
import { Button, FormControl, FormLabel } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';

import {
  setCompositionName,
  selectCompositionName,
} from '../store/reducers/executionReducer';

import {
  selectSequence,
  selectCurrentSequence,
} from '../store/reducers/sequenceReducer';
import {
  selectClickedFunc,
  setCurrentFunc,
} from '../store/reducers/functionsReducer';
import {
  setFlowRendererNodeId,
  selectFlowRendererNodeId,
  //setNodes,
  //updateNodeName,
  //selectNodes,
} from '../store/reducers/canvasReducer';

import FlowName from './FlowName';

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
  { id: 'init-e1-3', source: 'init-start', target: 'init-0', animated: true },
  { id: 'init-e1-4', source: 'init-0', target: 'init-end', animated: true },
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
    style: { fontWeight: 400, fontSize: 15, background: '#eee', color: '#333' },
  },
  {
    id: 'sequence-1',
    data: { label: 'Node 2' },
    position: { x: 150, y: 150 },
    style: { fontWeight: 400, fontSize: 15, background: '#eee', color: '#333' },
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
  { id: 'e1-2', source: 'sequence-0', target: 'sequence-1', animated: true },
  {
    id: 'e1-3',
    source: 'sequence-start',
    target: 'sequence-0',
    animated: true,
  },
  { id: 'e1-4', source: 'sequence-1', target: 'sequence-end', animated: true },
];

const elements_ifelse = [
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
    style: { fontWeight: 400, fontSize: 15, background: '#eee', color: '#333' },
  },
  {
    id: 'ifelse-1',
    data: { label: 'Node 2' },
    position: { x: 50, y: 150 },
    style: { fontWeight: 400, fontSize: 15, background: '#eee', color: '#333' },
  },
  {
    id: 'ifelse-2',
    data: { label: 'Node 3' },
    position: { x: 250, y: 150 },
    style: { fontWeight: 400, fontSize: 15, background: '#eee', color: '#333' },
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
  { id: 'e2-2', source: 'ifelse-start', target: 'ifelse-0', animated: true },
  {
    id: 'e2-3',
    source: 'ifelse-0',
    target: 'ifelse-1',
    animated: false,
    type: 'smoothstep',
    arrowHeadType: 'arrowclosed',
    label: 'true',
  },
  {
    id: 'e2-4',
    source: 'ifelse-0',
    target: 'ifelse-2',
    animated: false,
    type: 'smoothstep',
    arrowHeadType: 'arrowclosed',
    style: { stroke: '#f6ab6c' },
    label: 'false',
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

export const combineResult = (name, flowType, nodes) => {
  const tempFunc = nodes
    .filter((node) =>
      node.data !== undefined &&
      node.data.label !== 'Start' &&
      node.data.label !== 'End'
        ? node
        : ''
    )
    .map((e) => {
      return e.data.funcID;
    });
  return { name, type: flowType, func: tempFunc };
};

const BasicFlow = (props) => {
  const reduxDispatch = useDispatch();
  const compositionName = useSelector(selectCompositionName);
  const sequences = useSelector(selectSequence);
  const selectedCurrentSequence = useSelector(selectCurrentSequence);
  const selectedFunctions = useSelector(selectClickedFunc);
  const selectedFlowRendererNodeId = useSelector(selectFlowRendererNodeId);
  //const nodes = useSelector(selectNodes);

  let updateSequence = () => {
    let nodeValue;
    if (selectedCurrentSequence.toString() == 'sequence') {
      //return elements;
      nodeValue = elements;
      // reduxDispatch(setNodes(elements));
    } else if (selectedCurrentSequence.toString() == 'ifelse') {
      //  reduxDispatch(setNodes(elements_ifelse));
      // return elements_ifelse;
      nodeValue = elements_ifelse;
    } else {
      //   reduxDispatch(setNodes(initElements)); //initElements;}
      nodeValue = initElements;
    }
    return nodeValue;
  };
  let nodes = updateSequence();
  let updateFunction = () => {
    let newState = nodes.map((node) => {
      if (node.id == selectedFlowRendererNodeId) {
        node.data = {
          label: selectedFunctions.name,
          funcID: selectedFunctions.id,
        };
        node.style = { background: '#8DA9C4' };
      }
      return node;
    });

    return newState;
  };

  nodes = updateFunction();
  useEffect(() => {
    updateFunction();
    updateSequence();
  });

  const resultFunc = combineResult(
    compositionName,
    selectedCurrentSequence,
    nodes
  );
  const onElementClick = (event, element) => {
    reduxDispatch(setFlowRendererNodeId(element.id));
    reduxDispatch(setCurrentFunc({ id: '', name: '' }));
  };

  function changeCompositionName(name) {
    reduxDispatch(setCompositionName(name));
  }

  return (
    <div>
      <ReactFlow
        elements={nodes}
        style={{ background: 'white', width: '100%', height: '300px' }}
        onElementClick={onElementClick}
      >
        <Background color="#ccc" gap={3} />
      </ReactFlow>
      <FlowName
        onSave={() => {
          props.onSave(resultFunc);
        }}
        onChange={(name) => {
          changeCompositionName(name);
        }}
        compositionName={compositionName}
      />
    </div>
  );
};

export default BasicFlow;
