import React from 'react';
import ReactDOM from 'react-dom';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

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
    const { langs } = this.props;
    const labels = {
      'en-US': 'English',
      'es-ES': 'Spanish',
      'zh-CN': 'Chinese'
    };

    const radioStyle = (width) => { 
      return {
        display: 'inline-block',
        width: `${width}px`
      }
    };

    const showLangs = langs !== undefined && langs.length > 0;
    const muiTheme = getMuiTheme();

    return <MuiThemeProvider muiTheme={muiTheme}>
      <div className="toolbar">
        <div>
          <RadioButtonGroup name="mode" onChange={this.onChange.bind(this, 'mode')} defaultSelected="gather">
            <RadioButton style={radioStyle(200)} value="gather" label="Answering question"/>
            <RadioButton style={radioStyle(250)} value="evaluate" label="Evaluating Response"/>
          </RadioButtonGroup>
        </div>
        {
          showLangs ? (
            <div>
              <RadioButtonGroup name="locale" onChange={this.onChange.bind(this, 'locale')} defaultSelected="en-US">
                {
                  langs.map((lang) => <RadioButton style={radioStyle(120)} key={lang} value={lang} label={labels[lang]} />)
                }
              </RadioButtonGroup>
            </div>
          ) : <div/>
        }
      </div>
    </MuiThemeProvider>;
  }
}