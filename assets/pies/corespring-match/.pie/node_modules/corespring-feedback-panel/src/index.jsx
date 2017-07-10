import React from 'react';

import _ from 'lodash';

import CorrectIcon from 'corespring-icon/correct-icon.jsx';
import PartiallyCorrectIcon from 'corespring-icon/partially-correct-icon.jsx';
import IncorrectIcon from 'corespring-icon/incorrect-icon.jsx';
import NothingSubmittedIcon from 'corespring-icon/nothing-submitted-icon.jsx';


require('./index.less');

class FeedbackPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      icon: this.getIcon(this.props.correctness),
      correctness: this.props.correctness,
      feedback: this.props.feedback
    };
  }

  componentWillReceiveProps(props) {
    console.log('update feedback');
    this.setState({
      icon: this.getIcon(props.correctness),
      correctness: props.correctness,
      feedback: props.feedback
    })
  }

  getIcon(correctness) {
    switch (correctness) {
      case 'correct':
        return CorrectIcon;
      case 'incorrect':
        return IncorrectIcon;
      case 'warning':
        return NothingSubmittedIcon;
      default:
        return PartiallyCorrectIcon;
    }
  }
  

  render() {
    return (!_.isEmpty(this.state.feedback)) ? (
      <div className="feedback-panel">
        <div className={`icon ${this.state.correctness}`}>
          <this.state.icon iconSet={FeedbackPanel.iconSet} shape="square" />
        </div>
        <div dangerouslySetInnerHTML={{__html: this.state.feedback}}/>
      </div>
    ) : <div/>;
  }

}

// TODO: Configurable?
FeedbackPanel.iconSet = 'emoji';

export default FeedbackPanel;