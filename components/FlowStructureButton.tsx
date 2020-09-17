import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import flowStructure from '../data/flowStructures.json';

const FlowButtons = (props): JSX.Element => {
  const [buttons, setButtons] = useState(flowStructure);
  return (
    <>
      <h2 className="mt-4" style={{ color: '#fff', fontSize: 24 }}>
        Choose a flow
      </h2>
      {Object.keys(buttons).map((button) => (
        <Button
          key={buttons[button].id}
          variant="secondary"
          size="lg"
          // variant="outline-light"
          block
          onClick={() => props.onClick(button)}
          active={button === props.sequence}
        >
          {buttons[button].display}
        </Button>
      ))}
    </>
  );
};

export default FlowButtons;
