// import Head from 'next/head';
import { Container, Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import BasicFlow from '../components/FlowChart-dynamic';
import FlowButtons from '../components/FlowStructureButton';

import FunctionInventory from '../components/FunctionInventory';
import FuncEditor from '../components/FuncEditor';
import Execution from '../components/Execution/Execution';
import Nav from '../components/Nav';

const Home = (): JSX.Element => {
  //const [sequence, setSequence] = useState('');
  //const [functions, setFunctions] = useState('');

  // const [funcToEdit, setFuncToEdit] = useState({
  //   name: 'Name',
  //   description: 'Description',
  //   id: '',
  //   definition: '',
  // });

  const [flowState, setflowState] = useState('');
  const sequenceChange = (el) => {
    //setSequence(el);
    //setFunctions('');
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
    if (res.status === 200) {
      console.log('Saved Succesfully');
      setflowState(flow);
    }
  };
  return (
    <div className="App">
      <Nav />
      <Container fluid>
        <Row>
          <Col
            xs={3}
            md={3}
            lg={3}
            style={{ background: '#134074', height: '100vh' }}
          >
            <FlowButtons />
            <hr />
            <FunctionInventory
            // onClick={functionsChange}
            // functions={functions}
            // toggleFuncEditor={toggleFuncEditor}
            />
            {/* <FunctionButtons  onClick={functionsChange} functions={functions}/> */}
          </Col>
          <Col xs={9} md={9} lg={7} className="mt-5 ml-4 mr-4 main">
            <BasicFlow
              // type={sequence}
              // functionNames={functions}
              onSave={onSaveClick}
            />
            <Execution compositionName={flowState.name} />
          </Col>
          <FuncEditor />
        </Row>
      </Container>
    </div>
  );
};

export default Home;
