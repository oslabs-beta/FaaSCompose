import React, {useState,useEffect, useReducer, useContext, createContext} from 'react';
import ReactFlow, { useStoreState } from 'react-flow-renderer';
import { nanoid } from 'nanoid';



// export const elements = [
//   { id: '1a', data: { label: 'Start' }, position: { x: 90, y: 5 }, style: { background: '#333', color: '#fff', border: '1px solid #bbb', width: 70 , padding:5} },
//   { id: '1', data: { label: 'Node 1' }, position: { x: 50, y: 75 } },
//   { id: '2', data: { label: 'Node 2' }, position: { x: 50, y: 150 } },
//   { id: '1b', data: { label: 'End' }, position: { x: 90, y: 225 }, style: { background: '#333', color: '#fff', border: '1px solid #bbb', width: 70 , padding:5} },
//   { id: 'e1-2', source: '1', target: '2', animated: true },
//   { id: 'e1-3', source: '1a', target: '1', animated: true },
//   { id: 'e1-4', source: '2', target: '1b', animated: true },
// ];
export const elements = [
  { id: '1a', data: { label: 'Start' }, position: { x: 90, y: 5 }, style: { background: '#333', color: '#fff', border: '1px solid #bbb', width: 70 , padding:5} },
  { id: '0', data: { label: 'Node 1' }, position: { x: 50, y: 75 } },
  { id: '1', data: { label: 'Node 2' }, position: { x: 50, y: 150 } },
  { id: '1b', data: { label: 'End' }, position: { x: 90, y: 225 }, style: { background: '#333', color: '#fff', border: '1px solid #bbb', width: 70 , padding:5} },
  { id: 'e1-2', source: '0', target: '1', animated: true },
  { id: 'e1-3', source: '1a', target: '0', animated: true },
  { id: 'e1-4', source: '1', target: '1b', animated: true },
];

const elements_ifelse=[
  { id: '2a', data: { label: 'Start' }, position: { x: 490, y: 5 }, style: { background: '#333', color: '#fff', border: '1px solid #bbb', width: 70 , padding:5} },
  { id: '0', data: { label: 'Node 1' }, position: { x: 450, y: 75 } },
  { id: '1', data: { label: 'Node 2' }, position: { x: 350, y: 150 } },
  { id: '2', data: { label: 'Node 3' }, position: { x: 550, y: 150 } },
  { id: '2b', data: { label: 'End' }, position: { x: 490, y: 225 }, style: { background: '#333', color: '#fff', border: '1px solid #bbb', width: 70 , padding:5} },
  { id: 'e2-2', source: '2a', target: '0', animated: true },
  { id: 'e2-3', source: '0', target: '1', animated: false },
  { id: 'e2-4', source: '0', target: '2', animated: false },
  { id: 'e2-5', source: '1', target: '2b', animated: false },
  { id: 'e2-6', source: '2', target: '2b', animated: false }
];


// const elements_ifelse=[
//   { id: '2a', data: { label: 'Start' }, position: { x: 490, y: 5 }, style: { background: '#333', color: '#fff', border: '1px solid #bbb', width: 70 , padding:5} },
//   { id: '2-1', data: { label: 'Node 1' }, position: { x: 450, y: 75 } },
//   { id: '2-2', data: { label: 'Node 2' }, position: { x: 350, y: 150 } },
//   { id: '2-3', data: { label: 'Node 3' }, position: { x: 550, y: 150 } },
//   { id: '2b', data: { label: 'End' }, position: { x: 490, y: 225 }, style: { background: '#333', color: '#fff', border: '1px solid #bbb', width: 70 , padding:5} },
//   { id: 'e2-2', source: '2a', target: '2-1', animated: true },
//   { id: 'e2-3', source: '2-1', target: '2-2', animated: false },
//   { id: 'e2-4', source: '2-1', target: '2-3', animated: false },
//   { id: 'e2-5', source: '2-2', target: '2b', animated: false },
//   { id: 'e2-6', source: '2-3', target: '2b', animated: false }
// ];
 

export const ACTIONS = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  MODIFY_LABEL: "MODIFY_LABEL",
  RESET: "RESET",
  UPDATE_POSITION: "UPDATE_POSITION",
  SEQUENCE: "SEQUENCE",
  FUNCTIONS: "FUNCTIONS"
};

const reducer= ( state, action)=>{  
  switch (action.type) {
    case ACTIONS.SEQUENCE: {
      if(action.payload=='sequence'){ return elements }
      else { return elements_ifelse }
    }
  
      case ACTIONS.FUNCTIONS: {
        const newState = state.map((node, i) => {
          if(node.id==i-1){
            node.data = {label:action.payload[i-1]};          
          }
          return node;
        });
        
        return newState;
      }

    case ACTIONS.ADD: {
      return [
        ...state,
        {
          id: nanoid(),
          data: {label: action.label},
          position:{x: 100, y: 100 }
        },
      ];
    }
    case ACTIONS.REMOVE: {
      return state.filter((node) => node.id !== action.id);
    }
    case ACTIONS.MODIFY_LABEL: {
    const newState = state.map((node) => {
      if(node.id == action.payload.id){
        node.data = {label:action.payload.newLabel};
      }
      return node;
    });
       return newState;
   
     
    }
    default:
      return state;
  };
};


const BasicFlow = (props) =>{ 

  const [nodes, dispatch] = useReducer(reducer, elements);
  const [type, setType] = useState('sequence');
  const [functions, setFunctions]= useState();

  useEffect(() => {

    //update in sequence
    setType(()=>{
      if(type!=props.type){
        dispatch({ type: ACTIONS.SEQUENCE, payload:props.type}); 
        return props.type;
      }
      else if(type==props.type) return type;
    });

    //update functions name
    setFunctions(()=>{
      if(props.functionNames!=functions){
        dispatch({ type: ACTIONS.FUNCTIONS, payload:props.functionNames}); 
        return props.functionNames;
      }
      else return functions;
    });

  });

  const onElementClick = (event, element) => {
   return dispatch({ type: ACTIONS.MODIFY_LABEL, payload:
    {id:element.id, newLabel:'TEXT'}
  });
  }
  const updateFromProps = (event, element) => {
   
  }

return (
 <ReactFlow 
elements={nodes} 
style={{ background: 'white', width: '100%', height: '300px' }} 
onElementClick={onElementClick}></ReactFlow>
)
};

export default BasicFlow;
