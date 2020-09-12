import React from 'react';
import JSONInput from 'react-json-editor-ajrm/index';
import locale from 'react-json-editor-ajrm/locale/en';
import { selectCompositionOutput } from '../../store/reducers/executionReducer';
import { useSelector } from 'react-redux';

const CompositionResult = (): JSX.Element => {
  const compositionOutput = useSelector(selectCompositionOutput);

  return (
    <div className="mt-2 mb-2">
      <h5>Output</h5>
      <JSONInput
        placeholder={JSON.parse(compositionOutput)}
        theme="light_mitsuketa_tribute"
        locale={locale}
        colors={{
          string: '#DAA520', // overrides theme colors with whatever color value you want
        }}
        height="100px"
        viewOnly={true}
        confirmGood={false}
      />
    </div>
  );
};

export default CompositionResult;
