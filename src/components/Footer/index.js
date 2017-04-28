import Link from '../Link';

import React from 'react';
import styles from './index.css';

import Twitter from 'react-icons/lib/ti/social-twitter';
import Facebook from 'react-icons/lib/ti/social-facebook';
import Vimeo from 'react-icons/lib/ti/social-vimeo';


const Footer = () => {

  const { nav, footer, social } = styles;

  return <footer className={footer}>
    <nav className={nav}>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/docs">Docs</Link>
      <Link to="/faq">FAQ</Link>
    </nav>
    <div>Contact Info</div>

    <div className={social}>
      <Twitter />
      <Facebook />
      <Vimeo />
    </div>

  </footer>;
}

export default Footer
