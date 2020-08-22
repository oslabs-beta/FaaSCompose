import React from 'react';
import JSONInput from 'react-json-editor-ajrm/index';
import locale from 'react-json-editor-ajrm/locale/en';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserInput,
  setUserInput,
  setCompositionOutput,
} from '../../store/reducers/executionReducer';

const UserInput = (props): JSX.Element => {
  const dispatch = useDispatch();
  const userInput = useSelector(selectUserInput);
  let inputFromForm: string;

  const dispatchSetUserInput = (payload) => dispatch(setUserInput(payload));
  const dispatchSetCompositionOutput = (payload) =>
    dispatch(setCompositionOutput(payload));

  const handleInputChange = (formInput) => {
    inputFromForm = formInput.json;
  };

  const handleClick = async () => {
    const failureMsgObj = {
      result: 'Failure',
    };
    dispatchSetUserInput(inputFromForm);
    try {
      const res = await fetch(
        `http://localhost:3000/api/ibm/invoke/${props.compositionName}`,
        {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: inputFromForm,
        }
      );
      const outputJSON = await res.json();
      dispatchSetCompositionOutput(JSON.stringify(outputJSON));
    } catch (error) {
      dispatchSetCompositionOutput(JSON.stringify(failureMsgObj));
      // if (error) throw new Error('Error from UserInput', error);
    }
  };

  return (
    <>
      <h5>Input</h5>
      <span>{userInput}</span>
      <div>
        <JSONInput
          placeholder={{ password: '' }} // data to display
          theme="light_mitsuketa_tribute"
          locale={locale}
          colors={{
            string: '#DAA520', // overrides theme colors with whatever color value you want
          }}
          height="80px"
          width="100%"
          onChange={handleInputChange}
        />

        <Button
          className="mt-2 mb-2"
          variant="outline-primary"
          onClick={handleClick}
        >
          Execute
        </Button>

        <style jsx>{`
          .inline {
            display: flex;
            flex-direction: row;
          }

          .max-width {
            maxwidth: '1400px';
          }

          .max-height {
            maxheight: '100%';
          }
        `}</style>
      </div>
    </>
  );
};

export default UserInput;
