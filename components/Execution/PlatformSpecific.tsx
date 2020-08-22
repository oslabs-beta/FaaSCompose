import React from 'react';
import JSONInput from 'react-json-editor-ajrm/index';
import locale from 'react-json-editor-ajrm/locale/en';
import { useSelector } from 'react-redux';
import { selectComposition } from '../../store/reducers/executionReducer';

const PlatformSpecific = (): JSX.Element => {
  const composition = useSelector(selectComposition);

  return (
    <div className="mt-4">
      <h5>Platform Specific</h5>
      <JSONInput
        placeholder={JSON.parse(composition)} // data to display
        theme="light_mitsuketa_tribute"
        locale={locale}
        colors={{
          string: '#DAA520', // overrides theme colors with whatever color value you want
        }}
        å
        height="300px"
        width="100%"
        viewOnly={true}
        confirmGood={false}
      />
    </div>
  );
};

export default PlatformSpecific;
