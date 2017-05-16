import { RadioButton, RadioGroup } from 'react-toolbox/lib/radio';

import React from 'react';
import ReactDOM from 'react-dom';
import styles from './toolbar.css';

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

  onChangeMode(m) {
    console.log('onChamgeMode:', m);
    this.setState({ mode: m }, () => {
      this.props.onEnvChanged(this.state);
    })
  }

  onChangeLang(l) {
    this.setState({ locale: l }, () => {
      this.props.onEnvChanged(this.state);
    });
  }

  render() {
    const { langs } = this.props;
    const labels = {
      'en-US': 'English',
      'es-ES': 'Spanish',
      'zh-CN': 'Chinese'
    };

    const showLangs = langs !== undefined && langs.length > 0;

    return <div className={styles.root}>
      <Mode
        currentMode={this.env.mode}
        onChangeMode={this.onChangeMode.bind(this)}
        opts={[
          { value: 'gather', label: 'Answering question' },
          { value: 'evaluate', label: 'Evaluating response' }]} />

      {showLangs && <Langs
        onChangeLang={this.onChangeLang.bind(this)}
        currentLang={this.env.locale}
        langs={langs} />}
    </div>;
  }
}

const Mode = (props) => <div className={styles.mode}>
  <Label>Mode</Label>
  {props.opts.map((o, index) => {
    return <ModeButton
      {...o}
      key={index}
      currentMode={props.currentMode} onChangeMode={props.onChangeMode} />
  })
  }</div>;


const Label = (props) => <span className={styles.label}>{props.children}</span>

const ModeButton = (props) => <RadioButton
  className={styles.radioButton}
  value={props.value}
  label={props.label}
  onChange={props.onChangeMode.bind(null, props.value)}
  checked={props.currentMode === props.value} />;

const Langs = (props) => {

  const labels = {
    'en-US': 'English',
    'es-ES': 'Spanish',
    'zh-CN': 'Chinese'
  };

  const { langs, onChangeLang, currentLang } = props;

  return <div className={styles.langs}>
    <Label>Language</Label>
    {langs.map((lang) => <RadioButton
      key={lang}
      className={styles.radioButton}
      value={lang}
      checked={currentLang === lang}
      onChange={onChangeLang.bind(null, lang)}
      label={labels[lang]} />)
    }
  </div>;
}