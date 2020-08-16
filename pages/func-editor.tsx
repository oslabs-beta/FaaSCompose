import { useRef, useState, useEffect } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import Editor from '@monaco-editor/react';
// Import contents of functions.json
import functions from '../data/functions.json';

const FuncEditor = (): JSX.Element => {
  console.log(typeof functions);
  const [isEditorReady, setIsEditorReady] = useState(false);
  // This is to get value of text in editor
  const valueGetter = useRef();

  const handleEditorDidMount = (_valueGetter) => {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  };

  // Add function method, runs when "Add Function" button pressed
  const addFunc = () => {
    // Set currentFuncs to current contents of functions file (object)
    const currentFuncs = functions;
    // Pick a random id (I know there are better ways to do this, it's fine
    // for now)
    const id = String(Math.floor(Math.random() * 1000));
    // get name of function from form (HTMLTextAreaElement necessary for
    // TS to not complain)
    const name = (document.getElementById('name') as HTMLTextAreaElement).value;
    // get description of function from form
    const description = (document.getElementById(
      'description'
    ) as HTMLTextAreaElement).value;
    // Create object to hold new function with all values set
    const newFuncObj = {
      id: id,
      name: name,
      description: description,
      // This gets the value from the Editor
      definition: valueGetter.current(),
    };

    // Push new function onto end of currentFuncs,
    // combining it with already existing functions
    currentFuncs.push(newFuncObj);
    // There is a problem in here... Trying to fetch from the add-function api
    // and pass currentFuncs (which should be all functions + new one) to backend
    fetch('/api/functions/add-function.js', {
      method: 'post',
      body: JSON.stringify(currentFuncs),
    }).then(function (response) {
      console.log(response);
    });
  };

  return (
    <Container fluid>
      <Editor
        height="300px"
        width="450px"
        language="javascript"
        value={'// write your function here'}
        theme="dark"
        editorDidMount={handleEditorDidMount}
      />
      <Form>
        <Form.Label>Function Name:</Form.Label>
        <Form.Control type="text" placeholder="Name" id="name"></Form.Control>
        <Form.Label>Function Description:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Description"
          id="description"
        ></Form.Control>

        <Button variant="primary" onClick={addFunc}>
          Add Function
        </Button>
      </Form>
    </Container>
  );
};

export default FuncEditor;
