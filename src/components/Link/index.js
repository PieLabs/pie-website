import React, { PropTypes } from 'react';

import { Link } from 'phenomic';
import styles from './index.css';

export default (props) => {
  const { to, label } = props;
  return <div className={styles.root}>
    <Link
      className={styles.link}
      to={to}>
      {props.children}
    </Link>
  </div>;
}