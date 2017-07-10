import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Expander from './expander';

require('./index.less');

/**
 * We export the raw unstyled class for testability. For public use please use the default export.
 */
export default class CorespringCorrectAnswerToggle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: props.show
    }
  }

  onClick() {
    this.props.onToggle(!this.props.toggled);
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.show
    });
  }

  render() {

    let chooseIcon = () => {
      if (this.props.toggled) {
        return (
          <svg key="hideIcon" preserveAspectRatio="xMinYMin meet" viewBox="-283 359 34 35">
            <circle className="hideIconBg" cx="-266" cy="375.9" r="14" />
            <path className="hideIconBg" d="M-280.5,375.9c0-8,6.5-14.5,14.5-14.5s14.5,6.5,14.5,14.5s-6.5,14.5-14.5,14.5S-280.5,383.9-280.5,375.9zM-279.5,375.9c0,7.4,6.1,13.5,13.5,13.5c7.4,0,13.5-6.1,13.5-13.5s-6.1-13.5-13.5-13.5C-273.4,362.4-279.5,368.5-279.5,375.9z" />
            <polygon className="hideIconFg" points="-265.4,383.1 -258.6,377.2 -261.2,374.2 -264.3,376.9 -268.9,368.7 -272.4,370.6         " />
          </svg>
        );
      } else {
        return (
          <svg key="showIcon" preserveAspectRatio="xMinYMin meet" viewBox="-129.5 127 34 35">
            <path style={{ fill: "#B3ABA4", "stroke": "#CDC7C2", "strokeWidth": 0.5, "strokeMiterlimit": 10 }} d="M-113.2,159c-8,0-14.5-6.5-14.5-14.5s6.5-14.5,14.5-14.5s14.5,6.5,14.5,14.5S-105.2,159-113.2,159z" />
            <circle className="showIconBg" cx="-114.2" cy="143.5" r="14" />
            <path className="showIconBorder"
              d="M-114.2,158c-8,0-14.5-6.5-14.5-14.5s6.5-14.5,14.5-14.5s14.5,6.5,14.5,14.5S-106.2,158-114.2,158zM-114.2,130c-7.4,0-13.5,6.1-13.5,13.5s6.1,13.5,13.5,13.5s13.5-6.1,13.5-13.5S-106.8,130-114.2,130z" />
            <polygon className="showIconFg" points="-114.8,150.7 -121.6,144.8 -119,141.8 -115.9,144.5 -111.3,136.3 -107.8,138.2" />
          </svg>
        );
      }
    }

    return (
      <div className={`correct-answer-toggle ${this.props.className || ''}`}>
        <Expander
          show={this.state.show}
          class="toggle-expander">
          <div
            onClick={this.onClick.bind(this)}>
            <div className="inner" >
              <ReactCSSTransitionGroup
                component="div"
                className="icon-holder"
                transitionName="icon"
                transitionEnterTimeout={200}
                transitionLeaveTimeout={200}>
                {chooseIcon()}
              </ReactCSSTransitionGroup>
              <div className="label">{this.props.toggled ? this.props.hideMessage : this.props.showMessage}</div>
            </div>
          </div>
        </Expander>
      </div>
    );
  }
}

CorespringCorrectAnswerToggle.propTypes = {
  onToggle: React.PropTypes.func,
  toggled: React.PropTypes.bool,
  show: React.PropTypes.bool,
  hideMessage: React.PropTypes.string,
  showMessage: React.PropTypes.string
};

CorespringCorrectAnswerToggle.defaultProps = {
  showMessage: 'Show correct answer',
  hideMessage: 'Hide correct answer',
  show: false,
  toggled: false
};
