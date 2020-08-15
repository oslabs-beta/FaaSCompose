import Head from 'next/head';
import BasicFlow from '../components/FlowChart';
import {Button, Container, Row, Col, Card} from 'react-bootstrap';

const Home = (): JSX.Element => {
  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Col xs={2} md={2} lg={2} style={{ background: '#333' }} >
            <h2>Flow</h2>
           <Button variant="secondary" size="lg" variant="outline-light" block>action 1</Button>
           <Button variant="secondary" size="lg" variant="outline-light" block>action 1</Button>
           <hr />
           <Button variant="primary" size="lg" variant="outline-light" block>action 1</Button>
           <Button variant="primary" size="lg" variant="outline-light" block>action 1</Button>
           <Button variant="primary" size="lg" variant="outline-light" block>action 1</Button>
          </Col>
          <Col xs={10} md={10} lg={10} style={{ background: '#bebebe' }}>
            <BasicFlow />
            
            </Col>
        </Row>
      </Container>
      
    </div>
  )
}

export default Home;
