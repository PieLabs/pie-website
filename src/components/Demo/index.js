import React from 'react';
import Toolbar from './toolbar';

export default class Demo extends React.Component {

  constructor(props) {
    super(props);
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
  
  render() {
    return <div id={this.id()}>
      <Toolbar></Toolbar>
      <pie-item></pie-item>
    </div>;
  }

}