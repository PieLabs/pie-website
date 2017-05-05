import React from 'react';
import ReactDOM from 'react-dom';
import Toolbar from './toolbar';

export default class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.tagName = `${this.props.pie}-pie-item`;
  }

  id() {
    return `pie-item-${this.props.pie}`;
  }

  componentWillMount() {
    const script = document.createElement("script");
    script.addEventListener('load', () => {
    });
    script.src = `/pie-website/assets/pies/${this.props.pie}/pie-item.js`;
    script.async = true;
    document.body.appendChild(script);
  }

  onEnvChanged(env) {
    ReactDOM.findDOMNode(this).querySelector(this.tagName).env = env;
  }
  
  render() {
    const TagName = this.tagName;
    return <div id={this.id()}>
      <Toolbar onEnvChanged={this.onEnvChanged.bind(this)}></Toolbar>
      <TagName></TagName>
    </div>;
  }

}