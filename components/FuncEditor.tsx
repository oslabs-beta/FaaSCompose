import { useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Editor from '@monaco-editor/react';

import { toggleFuncEditor, selectShow } from '../store/reducers/editorReducer';

const FuncEditor = (props): JSX.Element => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const dispatch = useDispatch();
  const editorView = useSelector(selectShow);

  // This is to get value of text in editor
  const valueGetter = useRef();

  const handleEditorDidMount = (_valueGetter) => {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  };

  function dispatchToggleFuncEditor() {
    dispatch(toggleFuncEditor());
  }

  // Add function method, runs when "Add Function" button pressed
  const addFunc = () => {
    const id = String(Math.floor(Math.random() * 1000));
    const name = (document.getElementById('name') as HTMLTextAreaElement).value;
    // get description of function from form
    const description = (document.getElementById(
      'description'
    ) as HTMLTextAreaElement).value;
    // Create object to hold new function with all values set
    const newFuncObj = {
      name: name,
      id: id,
      description: description,
      // This gets the value from the Editor
      definition: valueGetter.current(),
    };

    fetch('/api/functions/upsert-function', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFuncObj),
    }).then(function (response) {
      console.log(response);
      setTimeout(function () {
        dispatchToggleFuncEditor();
      }, 1000);
    });
  };

  return (
    <Modal show={editorView}>
      <Modal.Header>
        <h5>Function Editor</h5>
        {console.log('editorView:', editorView)}
      </Modal.Header>
      <Modal.Body>
        <Editor
          height="300px"
          width="450px"
          language="javascript"
          value={'// write your function here'}
          theme="dark"
          editorDidMount={handleEditorDidMount}
        />
        <Form className="mt-4">
          <Form.Label>Function Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder={props.funcToEdit.name}
            id="name"
          ></Form.Control>
          <Form.Label>Function Description:</Form.Label>
          <Form.Control
            type="text"
            placeholder={props.funcToEdit.description}
            id="description"
          ></Form.Control>

          <Button variant="primary" className="mt-3 mr-3" onClick={addFunc}>
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
