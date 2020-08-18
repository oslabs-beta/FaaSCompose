import React from 'react';
import JSONInput from 'react-json-editor-ajrm/index';
import locale from 'react-json-editor-ajrm/locale/en';

const PlatformSpecific = (): JSX.Element => {
  return (
    <div>
      <h5>Platform Specific</h5>
      {/* <p>This is where platform specific would lie</p> */}
      <JSONInput
        // placeholder={} // data to display
        theme="light_mitsuketa_tribute"
        locale={locale}
        colors={{
          string: '#DAA520', // overrides theme colors with whatever color value you want
        }}
        height="500px"
      />
    </div>
  );
};

export default PlatformSpecific;
