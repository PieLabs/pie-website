# corespring-feedback-panel

`corespring-feedback-panel` is a panel that allows for the display of feedback properties, for use within a PIE. It is very much a work in progress.

## Usage

### Install

    npm install --save corespring-feedback-panel


### Import

    import FeedbackPanel from 'corespring-feedback-panel';


### Element

    <FeedbackPanel 
      feedback={this.props.model.feedback} 
      correctness={this.props.model.correctness} />