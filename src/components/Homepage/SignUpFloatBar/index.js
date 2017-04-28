import { Button, IconButton } from 'react-toolbox/lib/button';

import Checkbox from 'react-toolbox/lib/checkbox';
import Input from 'react-toolbox/lib/input';
import React from 'react';
import ScrollIn from './ScrollIn';
import checkboxTheme from './checkbox-theme.css';
import inputTheme from './input-theme.css';
import styles from './index.css';
import { validate } from 'email-validator';

class Form extends React.Component {

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

    return <div className={styles.form}>
      <Input
        label="email"
        theme={inputTheme}
        error={emailError}
        value={email}
        onChange={this.handleEmail} />
      <Checkbox
        label="I'd like to be a beta tester"
        theme={checkboxTheme}
        checked={betaTester}
        onChange={this.handleBetaTester} />
      <Button
        label={'keep me posted'}
        raised
        primary
        onMouseUp={this.onSignUp}
      />
    </div>;
  }
}

const SignedUpMessage = (props) => {

  const { signedUp, message } = styles;
  return <div className={signedUp}>
    <div className={message}>
      You're all set! You will be the first to know about news and launch info
      </div>
    <IconButton icon="close" inverse onClick={props.onClose} />
  </div>;
}


export default class SignUpFloatBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      signedUp: false
    }

    this.onSignUp = this.onSignUp.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onSignUp(data) {
    this.setState({ signedUp: true });
  }

  onClose() {
    this.setState({ closed: true });
  }


  render() {
    const { root, contents } = styles;
    const { signedUp } = this.state;

    const view = {
      hidden: this.state.closed
    }

    return <ScrollIn offset="100">
      <div ref={(d) => this.root = d} className={root} {...view }>
        <div className={contents}>
          {signedUp ?
            <SignedUpMessage onClose={this.onClose} /> :
            <Form onSignUp={this.onSignUp} />}
        </div>
      </div>
    </ScrollIn>;
  }
}