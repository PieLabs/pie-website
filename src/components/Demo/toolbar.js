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
    const langs = {
      'en-US': 'English',
      'es-ES': 'Spanish',
      'zh-CN': 'Chinese'
    };
    const showLangs = this.props.langs !== undefined && this.props.langs.length > 0;

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
      {
        showLangs ? (
          <div>
          {
            this.props.langs.map((lang) => {
              return <label key={`lang-${lang}`}>
                <input type="radio" value={lang} onChange={this.onChange.bind(this, 'locale')} checked={this.state.locale === lang}/>
                {langs[lang]}
              </label>
            })
          }
          </div>
        ) : <div/>
      }
    </div>;
  }
}