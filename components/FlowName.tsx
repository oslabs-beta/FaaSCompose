import React from 'react';
import { Button, FormControl, FormLabel } from 'react-bootstrap';

const FlowName = (props) => {
 <div className="form-inline mt-4 mb-4">
      <FormLabel className="mr-2 d-block">Composition Name</FormLabel>
      <FormControl
        className="col-sm-3"
        value={props.compositionName}
        type="text"
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
      />
      <Button
        className="ml-2"
        onClick={() => {
          props.onSave();
        }}
      > return (
    
        Save
      </Button>
    </div>
  );
};

export default FlowName;
