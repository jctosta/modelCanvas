import React from 'react';
import { shallow, mount } from 'enzyme';

import Canvas from '../components/Canvas';
import context from './testHelpers';

jest.mock('../components/AppProvider');

it('component should render shallow', () => {
  shallow(<Canvas source={context.canvas} />);
});

it('component should render a div child', () => {
  const wrapper = shallow(<Canvas source={context.canvas} />);
  expect(wrapper.getElement().type).toEqual('div');
});

it('component should mount', () => {
  mount(<Canvas source={context.canvas} />);
});
