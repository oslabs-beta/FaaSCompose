import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
//import flowStructure from '../data/flowStructures.json';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectSequence,
  changeCurrent,
  selectCurrentSequence,
} from '../store/reducers/sequenceReducer';

const FlowButtons = (): JSX.Element => {
  const sequence = useSelector(selectSequence);
  const selectedCurrentSequence = useSelector(selectCurrentSequence);
  const dispatch = useDispatch();

  return (
    <>
      <h2 className="mt-4" style={{ color: '#fff', fontSize: 24 }}>
        Choose a flow
      </h2>
      {sequence['list'].map((button) => (
        <Button
          key={nanoid()}
          variant="outline-light secondary "
          size="lg"
          block
          onClick={() => {
            dispatch(changeCurrent(button));
          }}
          active={button == selectedCurrentSequence}
        >
          {button}
        </Button>
      ))}
    </>
  );
};

export default FlowButtons;
