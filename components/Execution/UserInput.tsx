import React from 'react';
import JSONInput from 'react-json-editor-ajrm/index';
import locale from 'react-json-editor-ajrm/locale/en';
import { Button } from 'react-bootstrap';

const UserInput = (): JSX.Element => {
  return (
    <>
      <h5>Input</h5>
      <div className="inline">
        <JSONInput
          // placeholder={} // data to display
          theme="light_mitsuketa_tribute"
          locale={locale}
          colors={{
            string: '#DAA520', // overrides theme colors with whatever color value you want
          }}
          height="80px"
        />
        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <Button variant="outline-primary">Execute</Button>

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
