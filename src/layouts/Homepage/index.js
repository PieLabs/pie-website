import {
  Block,
  Main,
  FeatureRow
} from '../../components/Homepage';

import Link from '../../components/Link';
import Page from '../Page';
import Head from '../Head';
import React from 'react';
import styles from './index.css';
import FontIcon from 'react-toolbox/lib/font_icon';


export default (props) => {


  const {
    bottomLinkText,
    main,
    promoVideo,
    publishers,
    developers,
    features
  } = props.head;

  const { bottom, bigSection, featuresSection } = styles;

  return <Page { ...props }>
      <Head head={props.head} />
      <section className={bigSection}>
        <Main {...main}/>
      </section>
      <div className={featuresSection}>
      <FeatureRow features={features}/>
      </div>
      <Block {...publishers} image={'right'}/>
      <Block {...developers}/>
      


  </Page>;
}
