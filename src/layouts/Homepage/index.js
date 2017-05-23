import {
  Block,
  FeatureRow,
  Main,
} from '../../components/Homepage';

import Centered from '../../components/Centered';
import Header from '../../components/Header';
import Page from '../Page';
import React from 'react';
import styles from './index.css';

export default class Homepage extends React.Component {

  render() {
    const {
      bottomLinkText,
      main,
      promoVideo,
      publishers,
      developers,
      features
  } = this.props.head;

    return <Page
      className={styles.root}
      { ...this.props }
      getRef={r => this.pageRoot = r} >
      <Header />
      <Centered>
        <section className={styles.bigSection}>
          <Main {...main} />
        </section>
        <div className={styles.featuresSection}>
          <FeatureRow features={styles.features} />
        </div>
        <Block {...developers} image={'left'} />
        <Block {...publishers} image={'right'} />
      </Centered>
    </Page >;
  }
}
