# choice-input

A wrapper for `material-ui`'s checkbox and radio button with configurable extras like feedback.

## Usage

### Install

    npm install --save choice-input


### Import

    import ChoiceInput from 'choice-input';


### Element

      <ChoiceInput
        choiceMode={this.props.choiceMode}
        checked={this.isChecked(choice.value)}
        correct={this.correct(choice)}
        correctness={this.correctness(choice)}
        disabled={disabled}
        display-key={this.displayKey}
        feedback={this._feedback(choice)}
        label={choice.label}
        onChange={this.onChange}
        value={choice.value} />