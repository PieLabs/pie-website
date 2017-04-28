import React, { PropTypes } from 'react';
import { Link } from 'phenomic';
import styles from './index.css';

export default (props) => {
  const { to, label } = props;
  const { root, link } = styles;
  return <div className={root}>
    <Link
      className={link}
      to={to}>
      {props.children}
    </Link>
  </div>;
}