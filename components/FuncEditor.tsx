import { useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Editor from '@monaco-editor/react';
import { nanoid } from 'nanoid';

import { toggleFuncEditor, selectShow } from '../store/reducers/editorReducer';
import { addFunc, selectFuncToEdit } from '../store/reducers/functionsReducer';

const FuncEditor = (): JSX.Element => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const dispatch = useDispatch();
  const editorView = useSelector(selectShow);
  const funcToEdit = useSelector(selectFuncToEdit);
  // This is to get value of text in editor
  const valueGetter = useRef();

  // console.log('Description: ', funcToEdit.description);
  const handleEditorDidMount = (_valueGetter) => {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  };

  function dispatchToggleFuncEditor() {
    dispatch(toggleFuncEditor());
  }

  // Add function method, runs when "Add Function" button pressed
  const addFuncToReduxAndBackend = () => {
    const id = String(nanoid());
    const name = (document.getElementById('name') as HTMLTextAreaElement).value;
    // get description of functi on from form
    const description = (document.getElementById(
      'description'
    ) as HTMLTextAreaElement).value;
    // Create object to hold new function with all values set
    const newFuncObj = {
      name,
      id,
      description,
      // This gets the value from the Editor
      definition: valueGetter.current(),
    };
    dispatch(addFunc(newFuncObj));
    fetch('/api/functions/upsert-function', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFuncObj),
    }).then(() => {
      setTimeout(() => {
        dispatchToggleFuncEditor();
      }, 1000);
    });
  };

  return (
    <Modal show={editorView}>
      <Modal.Header>
        <h5>Function Editor</h5>
      </Modal.Header>
      <Modal.Body>
        <Editor
          height="300px"
          width="450px"
          language="javascript"
          value={funcToEdit.definition}
          theme="dark"
          editorDidMount={handleEditorDidMount}
        />
        <Form className="mt-4">
          <Form.Label>Function Name:</Form.Label>
          <Form.Control
            type="text"
            defaultValue={funcToEdit.name}
            id="name"
          ></Form.Control>
          <Form.Label>Function Description:</Form.Label>
          <Form.Control
            type="text"
            defaultValue={funcToEdit.description}
            id="description"
          ></Form.Control>

          <Button
            variant="primary"
            className="mt-3 mr-3"
            onClick={addFuncToReduxAndBackend}
          >
            Add Function
          </Button>
          <Button onClick={dispatchToggleFuncEditor} className="mt-3 mr-3">
            Close
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FuncEditor;
