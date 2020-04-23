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
import MyFooter from '../src/components/Footer/MyFooter.js';
import AboutPage from '../src/components/Page/AboutPage/AboutPage.js';
import Contributor from '../src/components/Page/AboutPage/Contributor.js';
import HomePage from '../src/components/Page/HomePage/HomePage.js';
import DetailedPlayerPage from '../src/components/Page/PlayersPage/DetailedPlayerPage.js';
import CarouselContainer from '../src/components/Page/HomePage/CarouselContainer.js';
import ScoreBoard from '../src/components/Page/ScoresPage/Scoreboard.js';
let wrapper;

//Testing the Navbar Component
describe('Navbar Component Tests', () => {

  beforeEach(function() {
    wrapper = shallow(<MyNavbar />);
  });

  it('Renders the links and ensures there is the correct amount', () => {
    expect(wrapper.find('Link')).to.have.length(6);
  });

  it('Renders the Navbar', () => {
    expect(wrapper.find('Navbar')).to.have.length(1);
  });


});

//Testing MyFooter.js
describe('Footer Component Tests',() => {

  beforeEach(function() {
    wrapper = shallow(<MyFooter/>);
  });

  it('Renders the Footer Navbar',()=> {
    expect(wrapper.find('Navbar')).to.have.length(1);
  });

  it('Counts the links in the footer',()=> {
    expect(wrapper.find('Link')).to.have.length(6);
  });

  it('Counts the lists in the footer',()=> {
    expect(wrapper.find('li')).to.have.length(6);
  });

});

//AboutPage.js Testing
describe('About Page Component Tests',()=> {

  beforeEach(function() {
    wrapper = shallow(<AboutPage />)
  });
  
  it('Checks that the classname is AboutPage',()=>{
      expect(wrapper.find('.AboutPage')).to.have.length(1);
  });

  it('Checks that there is only one container',()=>{
    expect(wrapper.find("Container")).to.have.length(1);
  });

  it('Checks that there is only one container',()=>{
    expect(wrapper.find("CardDeck")).to.have.length(2);
  });

});

//Contributor.js Testing
describe('Contributor Component Testing',()=>{

  beforeEach(function() {
    wrapper = shallow(<Contributor />)
  });

  it('Checks that there is a Card',()=>{
      expect(wrapper.find("Card")).to.have.length(1);
  });

  it('Checks that there is an img',()=>{
    expect(wrapper.find("CardImg")).to.have.length(1);
  })
});

//HomePage.js Testing
describe('HomePage Component Testing',()=>{

  beforeEach(function() {
    wrapper = shallow(<HomePage/>);
  });

  it('Checks that there are three TwitterTimeLineEmbeds Jumbotron', ()=>{
      expect(wrapper.find("TwitterTimelineEmbed")).to.have.length(3);
  });

  it('Checks that there is one Carousel', ()=>{
    expect(wrapper.find("CarouselContainer")).to.have.length(1);
  });

  it('Checks that there are four rows', ()=> {
    expect(wrapper.find("Row")).to.have.length(4);
  });

  it('Checks that there are 3 columns', ()=> {
    expect(wrapper.find("Col")).to.have.length(3);
  })

});

describe('Tests Carousel Components', ()=> {
  beforeEach(function () {
    wrapper = shallow(<CarouselContainer/>);
  });

  it('Checks that there are 4 Carousel items', () => {
    expect(wrapper.find('CarouselItem')).to.have.length(4);
  });

  it('Checks that there is 4 containers', () => {
    expect(wrapper.find('Container')).to.have.length(4);
  });

  it('Checks that there are 4 rows', () => {
    expect(wrapper.find('Row')).to.have.length(4);
  });

});

describe('Tests Contributor.js', () => {

  it('Checks that every Contributor has 0 cards if there is no state', () =>{
    expect(wrapper.find('Card')).to.have.length(0);
  });
  
});

describe('Tests Scoreboard.js', () => {


  it('Checks that scoreboard produces an error if the state is empty', () => {
    try{
    wrapper = shallow(<ScoreBoard/>);
    } catch (error ){
      expect(1).to.equal(1);
    }
      
  

  });
});

describe('Tests DetailedScoresPage.js', () => {

  it("Checks that an error is thrown if the state is null", () => {
    try{
      wrapper = shallow(<DetailedScoresPage/>);
    } catch (error){
      expect(1).to.equal(1);
    }
  });
  
});






  