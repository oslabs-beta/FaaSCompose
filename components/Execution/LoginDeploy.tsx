import React, { useState } from 'react';
import JSONInput from 'react-json-editor-ajrm/index';
import locale from 'react-json-editor-ajrm/locale/en';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Markup } from 'interweave';
import {
  selectUserInput,
  setUserInput,
  setCompositionOutput,
} from '../../store/reducers/executionReducer';

const LoginDeploy = (props): JSX.Element => {
  const dispatch = useDispatch();
  const userInput = useSelector(selectUserInput);
  const [outputText, setOutputText] = useState('');
  let inputFromForm: string;

  const dispatchSetUserInput = (payload) => dispatch(setUserInput(payload));
  const dispatchSetCompositionOutput = (payload) =>
    dispatch(setCompositionOutput(payload));

  const handleInputChange = (formInput) => {
    inputFromForm = formInput.json;
  };

  const handleClick = async () => {
    setOutputText('loading...');
    try {
      const resLogin = await fetch(`http://localhost:3000/api/ibm/login`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
      });
      const loginOutputText = await resLogin.text();
      const resDeploy = await fetch(
        `http://localhost:3000/api/ibm/deploy/${props.compositionName}`,
        {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const deployOutputText = await resDeploy.text();
      let finalOutput = loginOutputText + '\n' + deployOutputText;
      finalOutput = finalOutput.replace(/\n/g, '<br />');
      setOutputText(finalOutput);
    } catch (error) {
      // if (error) throw new Error('Error from UserInput', error);
    }
  };

  return (
    <>
      <div className="mt-2 mb-2">
        <Button variant="outline-primary" onClick={handleClick}>
          Login and Deploy
        </Button>
      </div>
      <div>
        <Markup content={outputText} />
      </div>
    </>
  );
};

export default LoginDeploy;
