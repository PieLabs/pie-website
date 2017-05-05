import React from 'react';
import ReactDOM from 'react-dom';

export default class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'gather',
      locale: 'en-US'
    };
  }

  onChange(key, event) {
    const update = {};
    update[key] = event.target.value;
    this.setState(update, () => {
      this.props.onEnvChanged(this.state);
    });
  }

  get env() {
    return this.state;
  }

  render() {
    return <div className="toolbar">
      <div>
        <label>
          <input type="radio" value='gather' onChange={this.onChange.bind(this, 'mode')} checked={this.state.mode === 'gather'}/>
          Answering question
        </label>
        <label>
          <input type="radio" value='evaluate' onChange={this.onChange.bind(this, 'mode')} checked={this.state.mode === 'evaluate'}/>
          Evaluating Response
        </label>
      </div>
      <div>
        <label>
          <input type="radio" value='en-US' onChange={this.onChange.bind(this, 'locale')} checked={this.state.locale === 'en-US'}/>
          English
        </label>
        <label>
          <input type="radio" value='zh-CN' onChange={this.onChange.bind(this, 'locale')} checked={this.state.locale === 'zh-CN'}/>
          Chinese
        </label>
      </div>
    </div>;
  }
}