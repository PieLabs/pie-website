import React, { PropTypes } from 'react';

import Head from '../Head';
import Intercom from '../../components/Intercom';

export default function Page(props) {
  const { children, head, className } = props;
  return <div className={className} ref={props.getRef}>
    <Head head={head} />
    {children}
    <Intercom />
  </div>;
} 