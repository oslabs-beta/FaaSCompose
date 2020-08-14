import Editor from '@monaco-editor/react';
import { Container } from 'react-bootstrap';

const FuncEditor = (): JSX.Element => {
  return (
    <Container fluid>
      <Editor
        height="50vh"
        width="90vw"
        language="javascript"
        value={'// write your function here'}
        theme="dark"
      />
    </Container>
  );
};

export default FuncEditor;
