import PropTypes from 'prop-types';
import React from 'react';
import styles from './index.css';

export default class Centered extends React.Component {

  render() {
    return <div className={styles.root + ' ' + (this.props.className || '')}>
      <div className={styles.centered}>
        <div className={styles.content + ' ' + (this.props.contentClassName || '')} >
          {this.props.children}
        </div>
      </div>
    </div>;
  }
}

Centered.propTypes = {
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(React.PropTypes.node),
    PropTypes.node
  ])
};