import { IconMenu, Menu, MenuDivider, MenuItem } from 'react-toolbox/lib/menu';
import React, { PropTypes } from 'react';

import Brand from '../Brand';
import FontIcon from 'react-toolbox/lib/font_icon';
import Link from '../Link';
import MediaQuery from 'react-responsive';
import { Link as PLink } from 'phenomic';
import styles from './index.css'

function Header(props) {

  const { header, nav, link, links, navHolder, brandHolder } = styles;

  const onMatchDesktop = (matches) => {

    if (matches) {
      return <div className={links}>
        <Link to="/docs">Docs</Link>
        <Link to="/examples">Examples</Link>
      </div>;
    } else {
      return <div>..</div>;
    }
  }

  return <header className={header}>
    <div className={navHolder}>
      <div className={brandHolder}>
        {
          props.layout != 'Homepage' &&
          <PLink to="/"><Brand /></PLink>
        }
      </div>
      <nav className={nav}>
        <MediaQuery minDeviceWidth={600}>{onMatchDesktop}</MediaQuery>
      </nav>
    </div>
  </header>;
}

export default Header
