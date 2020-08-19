import React, {useState,useEffect, useReducer, useContext, createContext} from 'react';
import {Button, Container, Row, Col, Card} from 'react-bootstrap';
import functionsStructure from '../data/users/functions.json';



const FunctionButtons = (props): JSX.Element => {
const [buttons, setButtons]=useState(functionsStructure);

  return (
    <>
    <h2 className='mt-4' style={{color:'#fff', fontSize:24}}>Add functions</h2>
   
    {
      Object.keys(buttons).map(button=> (
      <Button 
      key={buttons[button].name} 
      variant="secondary" size="lg" variant="outline-light" block 
      onClick={()=> props.onClick(buttons[button].name)}
      active={button==props.functions ? true :false}  
      >
        {buttons[button].name}
      </Button>))
    }
    </>
  )
};

export default FunctionButtons;
      // active={props.functions.includes(buttons[button].name) ? true :false}

