import React, {useState,useEffect, useReducer, useContext, createContext} from 'react';
import {Button, Container, Row, Col, Card} from 'react-bootstrap';
import flowStructure from '../data/flowStructures.json';


const FlowButtons = (props): JSX.Element => {
const [buttons, setButtons]=useState(flowStructure);
//const [error, setError] = useState(null);
//const [isLoading, setLoading] = useState(true);

// useEffect(()=>{
//   const fetchData = async () => {
//     setLoading(true)
//     try{
//       const response = await fetch(`./data/flowStructures.json`) 
//       const json = await response.json()
//       setButtons(json)
//     }catch(e){
//       setError(e)
//     }
//     setLoading(false)
//   }
//   fetchData();
// }, [buttons]);

// useEffect(()=>{
//   setButtons(flowStructure);
// }, [buttons]);
  // const handleClick=(e)=>{ 
  //   console.log('hi from click',seq);
  //  // onClick(e.target['sequence']);
  // };

  return (
    <>
    <h2>Flow</h2>
    {
      
      Object.keys(buttons).map(button=> (
      <Button 
      key={buttons[button].id} 
      variant="secondary" size="lg" variant="outline-light" block 
      onClick={()=>props.onClick(button)}>
        {buttons[button].display}
      </Button>))
    }
    </>
  )
};

export default FlowButtons;

