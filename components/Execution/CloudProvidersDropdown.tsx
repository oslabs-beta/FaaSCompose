import React, { useState } from 'react';
import { DropdownButton, Dropdown, Button } from 'react-bootstrap';
import { setComposition } from '../../store/reducers/executionReducer';
import { useDispatch } from 'react-redux';

const CloudProvidersDropdown = (props): JSX.Element => {
  const dispatch = useDispatch();
  const dispatchSetComposition = (payload) => dispatch(setComposition(payload));
  const [provider,setProvider] = useState('Cloud Providers');
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
      <DropdownButton id="dropdown-basic-button" title={provider} onSelect={(e) => setProvider(e)}>
        <Dropdown.Item eventKey="IBM Cloud">IBM Cloud</Dropdown.Item>
        <Dropdown.Item eventKey="Google Cloud">Google Cloud</Dropdown.Item>
        <Dropdown.Item eventKey="AWS">AWS</Dropdown.Item>
        <Dropdown.Item eventKey="Azure">Azure</Dropdown.Item>
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
