import Demo from '../../components/Demo';

import Link from '../../components/Link';
import Page from '../Page';
import Head from '../Head';
import React from 'react';
import styles from './index.css';
import FontIcon from 'react-toolbox/lib/font_icon';


export default (props) => {

  console.log('pies', pies);
  const {
    bottomLinkText,
    main,
    promoVideo,
    publishers,
    developers,
    features,
    pies
  } = props.head;

  const { bottom, bigSection, featuresSection } = styles;
  return <Page { ...props }>
      <Head head={props.head} />
      <Demo pie="corespring-choice"></Demo>
      <Demo pie="corespring-number-line"></Demo>

  </Page>;
}
