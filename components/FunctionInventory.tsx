import { useEffect, useState } from 'react';
import {
  Card,
  Button,
  ListGroup,
  ListGroupItem,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const FunctionInventory = (props) => {
  const [currentFuncs, setFuncs] = useState({});
  const [buttons, setButtons] = useState();

  let funcs = [];

  const getFuncs = () => {
    fetch('/api/functions/read-functions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFuncs(data);
      });
  };
  useEffect(() => {
    getFuncs();
  }, []);

  Object.keys(currentFuncs).map((func) => {
    funcs.push(
      <ListGroupItem
        style={{ cursor: 'pointer' }}
        onClick={() => {
          console.log('List Group::', currentFuncs[func].name);
          props.onClick(currentFuncs[func].name);
        }}
      >
        <OverlayTrigger
          placement="right"
          overlay={
            <Tooltip id={currentFuncs[func].id}>
              {currentFuncs[func].description}
            </Tooltip>
          }
        >
          <span>{currentFuncs[func].name}</span>
        </OverlayTrigger>
        <FontAwesomeIcon
          onClick={() => {
            alert('Edit clicked!');
          }}
          icon={faEdit}
          className="icon float-right"
        />
      </ListGroupItem>
    );
  });

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Cloud Function Inventory</Card.Title>
          <ListGroup className="list-group-flush">{funcs}</ListGroup>

          <Button variant="primary" onClick={props.toggleFuncEditor}>
            New Function
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default FunctionInventory;
