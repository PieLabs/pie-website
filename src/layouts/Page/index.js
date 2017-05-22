import React, { PropTypes } from 'react';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Helmet from 'react-helmet';
import styles from './index.css';

export default function Page(props) {
  const { children, head, body } = props;
  const metaTitle = head.metaTitle ? head.metaTitle : head.title;

  const { holder, contentHolder } = styles;
  const meta = [
    { name: "description", content: head.description }
  ]; // TODO.. add og fields etc..

  return <div>
    <Helmet title={metaTitle} >
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet" />
    </Helmet>
    <Header layout={head.layout} />
    <div className={holder}>
      <div className={contentHolder}>
        {children}
        <div dangerouslySetInnerHTML={{ __html: body }}></div>
      </div>
    </div>
    <Footer />
  </div>;
} 