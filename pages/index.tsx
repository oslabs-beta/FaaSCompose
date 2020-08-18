import Head from 'next/head';
import {Button, Container, Row, Col, Card} from 'react-bootstrap';
import BasicFlow from '../components/FlowChart';
import FlowButtons from '../components/FlowStructureButton';
import FunctionButtons from '../components/FunctionStructureButtons';

import React, {useState,useEffect, useReducer, useContext, createContext} from 'react';



const Home = (): JSX.Element => {

  const [sequence, setSequence]=useState('');
  const [functions, setFunctions]=useState('');
  const sequenceChange=(el)=>{
    setSequence(el);
    setFunctions('');
  }
  const functionsChange=(el)=>{
    setFunctions(el)
     // functions.includes(el) ? functions.filter(e=>el!== e) : functions.concat(el));
    
  };

  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Col xs={2} md={2} lg={2} style={{ background: '#333' }} >
            <FlowButtons onClick={sequenceChange} sequence={sequence}/>
           <hr />
            <FunctionButtons  onClick={functionsChange} functions={functions}/>
          </Col>
          <Col xs={10} md={10} lg={10} style={{ background: '#bebebe' }}>
            <BasicFlow type={sequence} functionNames={functions}/>
            </Col>
        </Row>
      </Container>
      
    </div>
  )
}

export default Home;
