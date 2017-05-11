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

  console.log('propz', main);

  const { bottom, bigSection, featuresSection } = styles;
  return <Page { ...props }>
    <Head head={props.head} />
    <h1>{main.title}</h1>
    <p>{main.subtitle}</p>
    {
      pies.map((p, index) => 
        <Demo key={index} { ...p } />
      )
    }
  </Page>;
}
