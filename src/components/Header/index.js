import React, { PropTypes } from 'react';

import Brand from '../Brand';
import Link from '../Link';
import { Link as PLink } from 'phenomic';
import styles from './index.css'
import { IconMenu, MenuItem, MenuDivider, Menu } from 'react-toolbox/lib/menu';
import FontIcon from 'react-toolbox/lib/font_icon';
import MediaQuery from 'react-responsive';


function Header(props) {

  const { header, nav, link, links, navHolder, brandHolder } = styles;

  const onMatchDesktop = (matches) => {

    if (matches) {
      return <div className={links}>
        <Link to="/about">About</Link>
        <Link to="/docs">Docs</Link>
        <Link to="/faq">FAQ</Link>
      </div>;
    } else {

      return <IconMenu inverse={true}
        position="topRight" menuRipple>
        <MenuItem value='/mission' caption='Mission' />
        <MenuItem value='/team' caption='Team' />
        <MenuItem value='/faq' caption='FAQ' />
      </IconMenu>;
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
