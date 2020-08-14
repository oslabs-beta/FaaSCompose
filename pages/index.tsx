import Head from 'next/head';
import BasicFlow from '../components/FlowChart';
import { Container, Row, Col } from 'react-bootstrap';
import FunctionInventory from '../components/FunctionInventory';

const Home = (): JSX.Element => {
  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Col xs={3} md={3} lg={3} style={{ background: '#4C5C68' }}>
            <FunctionInventory />
          </Col>
          <Col xs={9} md={9} lg={9} style={{ background: '#DCDCDD' }}>
            <BasicFlow />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
