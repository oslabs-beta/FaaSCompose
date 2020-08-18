import React from 'react';
import JSONInput from 'react-json-editor-ajrm/index';
import locale from 'react-json-editor-ajrm/locale/en';

const CompositionResult = (): JSX.Element => {
  return (
    <div>
      <h5>Output</h5>
      {/* <p>This is where the composition result (output) would lie</p> */}
      <JSONInput
        // placeholder={result} // data to display
        theme="light_mitsuketa_tribute"
        locale={locale}
        colors={{
          string: '#DAA520', // overrides theme colors with whatever color value you want
        }}
        height="100px"
      />
    </div>
  );
};

export default CompositionResult;
