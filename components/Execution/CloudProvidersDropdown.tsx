import React from 'react';
import { DropdownButton, Dropdown, Button } from 'react-bootstrap';
import { setComposition } from '../../store/reducers/executionReducer';
import { useDispatch } from 'react-redux';

const CloudProvidersDropdown = (props): JSX.Element => {
  const dispatch = useDispatch();
  const dispatchSetComposition = (payload) => dispatch(setComposition(payload));

  const handleClick = async () => {
    try {
      const compositionResponse = await fetch(
        `http://localhost:3000/api/ibm/convert/${props.compositionName}`
      );
      const compositionJSON = await compositionResponse.json();
      dispatchSetComposition(JSON.stringify(compositionJSON));
    } catch (error) {
      if (error) console.error('Error fetching');
    }
  };

  return (
    <div className="inline">
      {/* <span className="value">{composition}</span> */}
      <DropdownButton id="dropdown-basic-button" title="Cloud Providers">
        <Dropdown.Item href="/">IBM</Dropdown.Item>
        <Dropdown.Item href="/">Netlify</Dropdown.Item>
        <Dropdown.Item href="/">AWS</Dropdown.Item>
        <Dropdown.Item href="/">Azure</Dropdown.Item>
      </DropdownButton>
      <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <Button variant="outline-primary" onClick={handleClick}>
        Convert
      </Button>

      <style jsx>{`
        .inline {
          display: flex;
          flex-direction: row;
        }
      `}</style>
    </div>
  );
};

export default CloudProvidersDropdown;
