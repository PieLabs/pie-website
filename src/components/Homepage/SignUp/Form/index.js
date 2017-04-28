import { Button, IconButton } from 'react-toolbox/lib/button';

import Checkbox from 'react-toolbox/lib/checkbox';
import Input from 'react-toolbox/lib/input';
import React from 'react';
import checkboxTheme from './checkbox-theme.css';
import inputTheme from './input-theme.css';
import styles from './index.css';
import { validate } from 'email-validator';

export default class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '', 
      betaTester: undefined
    }

    this.handleEmail = this.handleEmail.bind(this);
    this.handleBetaTester = this.handleBetaTester.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }

  handleEmail(email) {
    this.setState({ email, emailError: '' });
  }

  handleBetaTester(betaTester) {
    this.setState({ betaTester });
  }

  onSignUp() {
    const { email, betaTester } = this.state;

    if (!email) {
      this.setState({ emailError: 'Required' });
    } else if (!validate(email)) {
      this.setState({ emailError: 'Not a valid email' });
    } else {
      console.log('plug this into something...');
      this.props.onSignUp({ email, betaTester });
    }
  }

  render() {

    const { betaTester, email, emailError } = this.state;

    return <div className={styles.inputs}>
      <div className={styles.formInput}>
      <Input
        label="email address"
        theme={inputTheme}
        error={emailError}
        value={email}
        onChange={this.handleEmail} />
      
      <Checkbox
        label="I'd like to be a beta tester"
        theme={checkboxTheme}
        checked={betaTester}
        onChange={this.handleBetaTester} />

      </div>
      <Button
        className={styles.button}
        label={'keep me posted'}
        raised
        primary
        onMouseUp={this.onSignUp}
      />
    </div>;
  }
}