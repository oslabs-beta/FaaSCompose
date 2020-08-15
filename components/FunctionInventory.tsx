import {
  Card,
  Button,
  ListGroup,
  ListGroupItem,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';
import functions from '../data/functions.json';
import { useEffect } from 'react';

const FunctionInventory = () => {
  useEffect(() => {});

  let funcs = [];
  functions.map((func) => {
    funcs.push(
      <OverlayTrigger
        placement="right"
        overlay={<Tooltip id={func.id}>{func.description}</Tooltip>}
      >
        <ListGroupItem>{func.name}</ListGroupItem>
      </OverlayTrigger>
    );
  });
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Cloud Function Inventory</Card.Title>
          <ListGroup className="list-group-flush">{funcs}</ListGroup>
          <Button variant="primary">New Function</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default FunctionInventory;
