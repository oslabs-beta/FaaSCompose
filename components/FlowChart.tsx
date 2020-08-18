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
const initElements=[
  { id: '1a', data: { label: 'Start' }, position: { x: 90, y: 5 }, style: { background: '#333', color: '#fff', border: '1px solid #bbb', width: 70 , padding:5} },
  { id: '0', data: { label: 'Choose flow first' }, position: { x: 50, y: 75 } },
  { id: '1b', data: { label: 'End' }, position: { x: 90, y: 225 }, style: { background: '#333', color: '#fff', border: '1px solid #bbb', width: 70 , padding:5} },

];
const elements = [
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
  //MODIFY_LABEL: "MODIFY_LABEL",
  RESET: "RESET",
  UPDATE_POSITION: "UPDATE_POSITION",
  SEQUENCE: "SEQUENCE",
  FUNCTIONS: "FUNCTIONS",

};

const reducer = ( state, action)=>{  
  switch (action.type) {
    case ACTIONS.SEQUENCE: {
      if(action.payload=='sequence'){ return elements }
      else if(action.payload=='ifelse') { return elements_ifelse }
      else return state;
    }
    case ACTIONS.FUNCTIONS: {
      // let newState=[];
      //  if(action.payload!== []){
      //   newState = state.map((node, i) => {
      //     if(node.id==i-1){
      //       console.log('node.id', node.id);
      //       node.data = {label:action.payload[i-1]};          
      //     }
      //     return node;
      //   });  
      //  }
      //  else newState = state;
     
      
      //   return newState;
      
      let newState = state.map(node=>{
    //    console.log('id::',node.id, 'target', action.payload.target.id);
        if(node.id==action.payload.target){
          node.data = {label:action.payload.functionNames}; 
          console.log('llll', action.payload.functionNames);
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
    // case ACTIONS.MODIFY_LABEL: {
    // const newState = state.map((node) => {
    //   if(node.id == action.payload.id){
    //     node.data = {label:action.payload.newLabel};
    //   }
    //   return node;
    // });
    //    return newState;
   
     
    // }

  
      
    default:
      console.log('default');
      return state;
  };
};


const BasicFlow = (props) =>{ 

  const [nodes, dispatch] = useReducer(reducer, initElements);
  const [type, setType] = useState('sequence');
  const [functions, setFunctions]= useState();
  const [target, setTarget]=useState('');

  useEffect(() => {
    console.log('nodes state::',nodes);
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
      if(props.functionNames!=functions && target !== undefined){
        dispatch({ 
          type: ACTIONS.FUNCTIONS, 
          payload:{target: target, functionNames: props.functionNames }}); 
        return props.functionNames;
      }
      else return functions;
    });

  }) ;

  const onElementClick = (event, element) => {
  //  return dispatch({ type: ACTIONS.MODIFY_LABEL, payload:
  //   {id:element.id, newLabel:'TEXT'}
  // });

  //add target node
  // return dispatch({ type: ACTIONS.TARGET_NODE, payload:
  //   {id:element.id}
  // });
  setTarget(element.id);
  console.log('target',element.id);

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
