import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Expander extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: props.show || false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.show
    });
  }

  render() {
    const className = `${this.props.class} ${this.state.show ? 'show' : 'hide'}`
    return <div className={className}>
      {this.props.children}
    </div>;
  }
}

Expander.propTypes = {
  show: React.PropTypes.bool.isRequired,
  class: React.PropTypes.string.isRequired
}