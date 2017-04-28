import React from 'react';
import styles from './index.css';
import Checkbox from 'react-toolbox/lib/checkbox';
import Form from './Form';

export default class SignUp extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { title, betaTester: betaTesterLabel } = this.props;
    const { signUp } = styles;

    return <div className={signUp}>
      <Form betaTester={betaTesterLabel} />
    </div>;
  }
}
