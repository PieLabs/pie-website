import React from 'react';
import { shallow, mount } from 'enzyme';
import { assert, stub } from 'sinon';
import { expect } from 'chai';
import proxyquire from 'proxyquire';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Expander from '../src/expander';

describe('CorespringCorrectAnswerToggle', () => {

  let onToggle;
  let wrapper;
  let sheet;
  let CorespringCorrectAnswerToggle;

  let mkWrapper = (toggled, msgs) => {
    toggled = toggled === false ? false : true;
    msgs = msgs || {};
    return shallow(<CorespringCorrectAnswerToggle
      toggled={toggled}
      onToggle={onToggle}
      hideMessage={msgs.hide}
      showMessage={msgs.show}
      sheet={sheet} />, {
        context: { muiTheme: { palette: {} } }
      });
  }

  beforeEach(() => {
    CorespringCorrectAnswerToggle = proxyquire('../src/index', {
      "./index.less": {
        '@noCallThru': true
      }
    }).default;

    sheet = {
      classes: {
        root: 'root',
        label: 'label'
      }
    };
    onToggle = stub();
    wrapper = mkWrapper();
  });

  describe('render', () => {

    it('has an the root class name', () => {
      expect(wrapper.prop('className').trim()).to.eql('correct-answer-toggle');
    });

    it('has the hide message', () => {
      let holder = wrapper.find('.label');
      expect(holder.text()).to.eql('Hide correct answer');
    });

    it('has show message when toggled is false', () => {
      let holder = mkWrapper(false).find('.label');
      expect(holder.text()).to.eql('Show correct answer');
    });

    it('sets a custom hide message', () => {
      wrapper = mkWrapper(true, { hide: 'hide!' });
      let holder = wrapper.find('.label');
      expect(holder.text()).to.eql('hide!');
    });

    it('sets a custom show message', () => {
      wrapper = mkWrapper(false, { show: 'show!' });
      let holder = wrapper.find('.label');
      expect(holder.text()).to.eql('show!');
    });

  });

  describe('onClick', () => {
    it('calls onToggle', () => {
      wrapper.find(Expander).childAt(0).simulate('click');
      assert.calledWith(onToggle, false);
    });

    it('calls onToggle with update state', () => {
      wrapper.find(Expander).childAt(0).simulate('click');
      assert.calledWith(onToggle, false);
      //simulate updating the toggled prop 
      wrapper.setProps({ toggled: false });
      wrapper.find(Expander).childAt(0).simulate('click');
      assert.calledWith(onToggle, true);
    });

  });

});