import React from 'react';
import ReactFlow from 'react-flow-renderer';

export const elements = [
  { id: '1', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
  { id: 'e1-2', source: '1', target: '2', animated: true },
];

const BasicFlow = (): JSX.Element => (
  <ReactFlow
    elements={elements}
    style={{ background: 'white', width: '100%', height: '300px' }}
  />
);

export default BasicFlow;
