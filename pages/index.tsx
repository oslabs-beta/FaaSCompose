// import Head from 'next/head';
import { Button, Container, Row, Col } from 'react-bootstrap';
import BasicFlow from '../components/FlowChart-dynamic';
import FlowButtons from '../components/FlowStructureButton';

//import FunctionButtons from '../components/FunctionStructureButtons';

import React, {
  useState,
  // useEffect,
  // useReducer,
  // useContext,
  // createContext,
} from 'react';

import FunctionInventory from '../components/FunctionInventory';
import FuncEditor from '../components/FuncEditor';
import Execution from '../components/Execution/Execution';

const Home = (): JSX.Element => {
  const [sequence, setSequence] = useState('');
  const [functions, setFunctions] = useState('');
  const [showEditor, setShowEditor] = useState(false);

  const [flowState, setflowState] = useState('');
  const sequenceChange = (el) => {
    setSequence(el);
    setFunctions('');
  };

  const toggleFuncEditor = () => {
    setShowEditor(!showEditor);
  };

  const functionsChange = (el) => setFunctions(el);
  const onSaveClick = async (flow) => {
    const res = await fetch(
      `http://localhost:3000/api/composition/agnosticsave/${flow.name}`,
      {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(flow),
      }
    );
    if (res.status == 200) {
      console.log('Saved Succesfully');
      setflowState(flow);
    }
  };
  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Col
            xs={3}
            md={3}
            lg={3}
            style={{ background: '#4c5c68ff', height: '100vh' }}
          >
            <FlowButtons onClick={sequenceChange} sequence={sequence} />
            <hr />
            <FunctionInventory
              onClick={functionsChange}
              functions={functions}
            />
            {/* <FunctionButtons  onClick={functionsChange} functions={functions}/> */}
          </Col>
          <Col xs={9} md={9} lg={7} className="mt-5 ml-4 mr-4">
            <Button onClick={toggleFuncEditor}>Open func editor</Button>
            <BasicFlow
              type={sequence}
              functionNames={functions}
              onSave={onSaveClick}
            />
            <Execution compositionName={flowState.name} />
          </Col>
          <FuncEditor show={showEditor} toggle={toggleFuncEditor} />
        </Row>
      </Container>
    </div>
  );
};

export default Home;
