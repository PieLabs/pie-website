import './index.global.css';
import "./highlightjs.global.css"

import React, { PropTypes } from 'react';

import DefaultHeadMeta from '../src/components/DefaultHeadMeta';

class AppContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;
    return <div>
      <DefaultHeadMeta />
      {children}
    </div>
  }
}

AppContainer.propTypes = {
  children: PropTypes.node,
}

export default AppContainer
