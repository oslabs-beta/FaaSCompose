// import Head from 'next/head';
import BasicFlow from '../components/FlowChart';
import { Button, Container, Row, Col } from 'react-bootstrap';
// import Execution from '../components/Execution/Execution';

const Home = (): JSX.Element => {
  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Col xs={2} md={2} lg={2} style={{ background: '#333' }}>
            <Button variant="primary outline-light" size="lg" block>
              action 1
            </Button>
            <Button variant="primary outline-light" size="lg" block>
              action 1
            </Button>
            <Button variant="primary outline-light" size="lg" block>
              action 1
            </Button>
            <Button variant="primary outline-light" size="lg" block>
              action 1
            </Button>
            <hr />
            <Button variant="primary outline-light" size="lg" block>
              action 1
            </Button>
            <Button variant="primary outline-light" size="lg" block>
              action 1
            </Button>
            <Button variant="primary outline-light" size="lg" block>
              action 1
            </Button>
          </Col>
          <Col xs={10} md={10} lg={10} style={{ background: '#bebebe' }}>
            <BasicFlow />
          </Col>
        </Row>
      </Container>
      {/* <Execution /> */}
    </div>
  );
};

export default Home;
