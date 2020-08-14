import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import functions from '../data/functions.json';
// import { useState } from 'react';

const FunctionInventory = () => {
  let funcs = [];
  functions.map((func) => {
    funcs.push(<ListGroupItem>{func.name}</ListGroupItem>);
  });
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Card Function Inventory</Card.Title>
          <ListGroup className="list-group-flush">{funcs}</ListGroup>
          <Button variant="primary">New Function</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default FunctionInventory;
