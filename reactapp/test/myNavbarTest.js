import { expect } from 'chai';
import { mount, render, shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.expect = expect;
global.mount = mount;
global.render = render;
global.shallow = shallow;

import React from 'react';
import MyNavbar from '../src/components/Navbar/MyNavbar.js';
let wrapper;
beforeEach(function() {
  wrapper = shallow(<MyNavbar />);
});

describe('Navbar Component', () => {
  it('Renders the links and ensures there is the correct amount', () => {
    expect(wrapper.find('Link')).to.have.length(6);
  });

  it('Renders the Navbar', () => {
    expect(wrapper.find('Navbar')).to.have.length(1);
  });


});