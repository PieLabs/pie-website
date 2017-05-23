import { IconMenu, Menu, MenuDivider, MenuItem } from 'react-toolbox/lib/menu';
import React, { PropTypes } from 'react';

import Brand from '../Brand';
import FontIcon from 'react-toolbox/lib/font_icon';
import Link from '../Link';
import MediaQuery from 'react-responsive';
import { Link as PLink } from 'phenomic';
import classNames from 'classnames';
import styles from './index.css'

export default class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { layout } = this.props;

    const onMatchDesktop = (matches) => {

      if (matches) {
        return <div className={styles.links}>
          <Link to="/docs">Docs</Link>
          <Link to="/examples">Examples</Link>
        </div>;
      } else {
        return <div>..</div>;
      }
    }

    return <header className={styles.root}>
      <div className={styles.navHolder}>
        <div className={styles.brandHolder}>
          {
            layout != 'Homepage' &&
            <PLink to="/"><Brand /></PLink>
          }
        </div>
        <nav className={styles.nav}>
          <MediaQuery minDeviceWidth={600}>{onMatchDesktop}</MediaQuery>
        </nav>
      </div>
    </header>;
  }
}

