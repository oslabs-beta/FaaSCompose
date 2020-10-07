import { Container, Row, Col } from 'react-bootstrap';
import { signin, signout, useSession } from 'next-auth/client';
import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import BasicFlow from '../components/FlowChart-dynamic';
import FlowButtons from '../components/FlowStructureButton';

import FunctionInventory from '../components/FunctionInventory';
import FuncEditor from '../components/FuncEditor';
import Execution from '../components/Execution/Execution';
import Nav from '../components/Nav';

const Home = (): JSX.Element => {
  const [session, loading] = useSession();
  const [flowState, setflowState] = useState('');
  console.log(process.env.NEXTAUTH_URL);
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
      {session && (
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
              <FunctionInventory />
            </Col>
            <Col xs={9} md={9} lg={7} className="mt-5 ml-4 mr-4 main">
              <BasicFlow onSave={onSaveClick} />
              <Execution compositionName={flowState.name} />
            </Col>
            <FuncEditor />
          </Row>
        </Container>
      )}
    </div>

      
  );
};

export default Home;
