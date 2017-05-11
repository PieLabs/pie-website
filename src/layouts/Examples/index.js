import Demo from '../../components/Demo';
import FontIcon from 'react-toolbox/lib/font_icon';
import Head from '../Head';
import Link from '../../components/Link';
import Page from '../Page';
import React from 'react';
import styles from './index.css';

export default (props) => {
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
    {pies.map((p, index) => <Demo key={index} name={p.name} path={p.path} />)}
  </Page>;
}
