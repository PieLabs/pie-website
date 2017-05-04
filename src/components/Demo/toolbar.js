import React from 'react';
import ReactDOM from 'react-dom';

export default class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'gather'
    };
  }

  componentDidMount() {
    this.dispatchEvent(new CustomEvent('pie.control-panel-ready', { bubbles: true }));
  }

  onChange(event) {
    this.setState({
      mode: event.target.value
    }, () => {
      var event = new CustomEvent('envChanged', { bubbles: true });
      this.dispatchEvent(event, this.env);
    });
  }

  get env() {
    return this.state;
  }

  dispatchEvent(event, data = {}) {
    ReactDOM.findDOMNode(this).dispatchEvent(event, {detail: data});
  }

  render() {
    return <div className="toolbar">
      <label>
        <input type="radio" value='gather' onChange={this.onChange.bind(this)} checked={this.state.mode === 'gather'}/>
        Answering question
      </label>
      <label>
        <input type="radio" value='evaluate' onChange={this.onChange.bind(this)} checked={this.state.mode === 'evaluate'}/>
        Evaluating Response
      </label>
    </div>;
  }
}