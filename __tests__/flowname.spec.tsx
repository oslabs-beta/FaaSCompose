import * as React from 'react';
import { Component, MouseEvent } from 'react';
import { mount, shallow } from 'enzyme';
import FlowName from '../components/FlowName';
import { Button, FormControl, FormLabel } from 'react-bootstrap';

describe('Pages', () => {
  describe('FlowName', () => {
    it('should render without with a FormLabel', function () {
      const wrap = shallow(<FlowName />);
      expect(wrap.find('div').find('FormLabel').text()).toBe(
        'Composition Name'
      );
    });
    it('Name of the composition should be shown in an input', function () {
      const mockSave = jest.fn(() => Promise.resolve(true));
      const wrap = shallow(
        <FlowName onSave={mockSave} compositionName={'DemoComposition'} />
      );
      expect(wrap.find('FormControl').props().value).toBe('DemoComposition');
    });
    it('Changing value will trigger props.onChange function call', function () {
      const onChangeMock = jest.fn();
      const wrap = shallow(<FlowName onChange={onChangeMock} />);
      const event = {
        preventDefault() {},
        target: { value: 'DemoComposition' },
      };
      wrap.find('FormControl').simulate('change', event);
      expect(onChangeMock).toBeCalledWith('DemoComposition');
    });
    it('prop onSave should be called when click on save button', function () {
      const mockSave = jest.fn(() => Promise.resolve(true));
      const wrap = shallow(<FlowName onSave={mockSave} />);
      wrap.find('Button').simulate('click', { shiftKey: false });
      // wrap.find('Button').props().onClick({ key: 'Enter' });
      expect(mockSave).toHaveBeenCalled();
      expect(mockSave.mock.calls.length).toBe(1);
    });
  });
});
