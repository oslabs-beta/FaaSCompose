import { useRef, useState, useEffect } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import Editor from '@monaco-editor/react';

const FuncEditor = (): JSX.Element => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const valueGetter = useRef();

  const handleEditorDidMount = (_valueGetter) => {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  };

  const addFunc = () => {
    const currentFuncs = JSON.parse(window.localStorage.getItem('functions'));
    const id = String(Math.floor(Math.random() * 1000));
    const name = (document.getElementById('name') as HTMLTextAreaElement).value;
    const description = (document.getElementById(
      'description'
    ) as HTMLTextAreaElement).value;
    const newFuncObj = {
      id: id,
      name: name,
      description: description,
      definition: valueGetter.current(),
    };

    currentFuncs.push(newFuncObj);
    console.log('type of: ', typeof currentFuncs);
    window.localStorage.setItem('functions', JSON.stringify(currentFuncs));
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
