import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  Button,
  ListGroup,
  ListGroupItem,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import { toggleFuncEditor } from '../store/reducers/editorReducer';
import {
  setFuncs,
  selectFuncs,
  setCurrentFunc,
  setFuncToEdit,
} from '../store/reducers/functionsReducer';

const FunctionInventory = () => {
  const dispatch = useDispatch();
  const currentFuncs = useSelector(selectFuncs);
  const funcs = [];

  function dispatchToggleFuncEditor() {
    dispatch(toggleFuncEditor());
  }

  const getFuncs = () => {
    fetch('/api/functions/read-functions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(setFuncs(data));
      });
  };
  useEffect(() => {
    getFuncs();
  }, []);

  for (let func in currentFuncs) {
    funcs.push(
      <ListGroupItem
        style={{
          cursor: 'pointer',
          border: '1px solid #28151c',
          borderRadius: '4px',
        }}
        className="mt-2"
        key={currentFuncs[func].id}
        onClick={() => {
          dispatch(
            setCurrentFunc({
              id: currentFuncs[func].id,
              name: currentFuncs[func].name,
            })
          );
        }}
      >
        <OverlayTrigger
          placement="right"
          overlay={
            <Tooltip id={currentFuncs[func].id}>
              {currentFuncs[func].description}
            </Tooltip>
          }
        >
          <span>{currentFuncs[func].name}</span>
        </OverlayTrigger>
        <FontAwesomeIcon
          onClick={() => {
            dispatch(setFuncToEdit(currentFuncs[func]));
            dispatchToggleFuncEditor();
          }}
          icon={faEdit}
          className="icon float-right"
        />
      </ListGroupItem>
    );
  }

  return (
    <div id="function-inventory">
      <Card style={{ background: '#FFF4EC' }}>
        <Card.Body>
          <Card.Title>Cloud Function Inventory</Card.Title>
          <ListGroup className="list-group-flush">{funcs}</ListGroup>

          <Button
            variant="primary"
            className="mt-4"
            onClick={() => {
              dispatch(
                setFuncToEdit({
                  id: '',
                  name: 'Name',
                  description: 'Description',
                  definition: '// write your function here',
                })
              );
              dispatchToggleFuncEditor();
            }}
          >
            New Function
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default FunctionInventory;
