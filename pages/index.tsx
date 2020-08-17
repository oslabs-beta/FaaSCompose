import Head from 'next/head';
import {Button, Container, Row, Col, Card} from 'react-bootstrap';
import BasicFlow from '../components/FlowChart';
import FlowButtons from '../components/FlowStructureButton';
import React, {useState,useEffect, useReducer, useContext, createContext} from 'react';



const Home = (): JSX.Element => {

  const [sequence, setSequence]=useState("sequence");
  const sequenceChange=(el)=>setSequence(el);

  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Col xs={2} md={2} lg={2} style={{ background: '#333' }} >
            <FlowButtons onClick={sequenceChange} />
           <hr />
           <Button variant="primary" size="lg" variant="outline-light" block>action 1</Button>
           <Button variant="primary" size="lg" variant="outline-light" block>action 1</Button>
           <Button variant="primary" size="lg" variant="outline-light" block>action 1</Button>
          </Col>
          <Col xs={10} md={10} lg={10} style={{ background: '#bebebe' }}>
            <BasicFlow type={sequence}/>
            
            </Col>
        </Row>
      </Container>
      
    </div>
  )
}

export default Home;
