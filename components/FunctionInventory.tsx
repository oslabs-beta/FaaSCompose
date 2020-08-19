import { useEffect, useState } from 'react';
import {
  Card,
  Button,
  ListGroup,
  ListGroupItem,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';
import Link from 'next/link';

const FunctionInventory = (props) => {
  const [currentFuncs, setFuncs] = useState({});
  const [buttons, setButtons]=useState();

  let funcs = [];
  useEffect(() => {
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
  }, []);
  Object.keys(currentFuncs).map((func) => {
    funcs.push(
      <OverlayTrigger
        placement="right"
        overlay={
          <Tooltip id={currentFuncs[func].id}>
            {currentFuncs[func].description}
          </Tooltip>
        }
      >
        <ListGroupItem
        onClick={()=> {
          console.log('List Group::', currentFuncs[func].name);
          props.onClick(currentFuncs[func].name)}
        }
        >{currentFuncs[func].name}</ListGroupItem>
      </OverlayTrigger>
    );
  });

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Cloud Function Inventory</Card.Title>
          <ListGroup className="list-group-flush">{funcs}</ListGroup>
          <Link href="/func-editor">
            <a>
              <Button variant="primary">New Function</Button>
            </a>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default FunctionInventory;
