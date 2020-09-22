import * as React from 'react';
import { Component, MouseEvent } from 'react';
import { mount, shallow } from 'enzyme';
import FlowName from '../components/FlowName';
import { Button, FormControl, FormLabel } from 'react-bootstrap';

describe('Pages', () => {
  describe('Index', () => {
    it('should render without throwing an error', function () {
      const wrap = mount(<FlowName />);
      expect(wrap.find('div').find('FormLabel').text()).toBe(
        'Composition Name'
      );
    });
    it('click on save', function () {
      const mockSave = jest.fn(() => Promise.resolve(true));
      const wrap = mount(<FlowName onSave={mockSave} />);
      wrap.find('Button').simulate('click', { shiftKey: false });
      // wrap.find('Button').props().onClick({ key: 'Enter' });
      expect(mockSave).toHaveBeenCalled();
      expect(mockSave.mock.calls.length).toBe(1);
    });
  });
});
