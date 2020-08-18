import React from 'react';
import { DropdownButton, Dropdown, Button } from 'react-bootstrap';

const CloudProvidersDropdown = (): JSX.Element => (
  <div className="inline">
    <DropdownButton id="dropdown-basic-button" title="Cloud Providers">
      <Dropdown.Item href="/">IBM</Dropdown.Item>
      <Dropdown.Item href="/">Netlify</Dropdown.Item>
      <Dropdown.Item href="/">AWS</Dropdown.Item>
      <Dropdown.Item href="/">Azure</Dropdown.Item>
    </DropdownButton>
    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
    <Button variant="outline-primary">Convert</Button>

    <style jsx>{`
      .inline {
        display: flex;
        flex-direction: row;
      }
    `}</style>
  </div>
);

export default CloudProvidersDropdown;
