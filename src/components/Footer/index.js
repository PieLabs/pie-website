import { Facebook, Medium, Snapchat, Twitter, Vimeo } from './icons';

import Link from 'phenomic/lib/Link';
import React from 'react';
import styles from './index.css';

export default class Footer extends React.Component {

  componentDidMount() {
    const jsCode = `
     window.Intercom("boot", { app_id: "jgcm12je"});
    `;
    new Function(jsCode)();
  }
  
  render() {
    return <footer className={styles.footer}>
      <div className={styles.center}>
        <div className={styles.content}>
          <nav className={styles.nav}>
            <Link to="/docs">Docs</Link>
          </nav>

          <div className={styles.social}>
            <Facebook />
            <Twitter />
          </div>
        </div>
        <span className={styles.copyright}>© CoreSpring 2017</span>
      </div>
    </footer>;
  }
}
