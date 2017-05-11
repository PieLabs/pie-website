import React, { PropTypes } from 'react';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Helmet from 'react-helmet';
import { Link } from "phenomic"
import styles from './index.css';

export default function DocsPage(props) {
  const { children, head, body } = props;
  const metaTitle = head.metaTitle ? head.metaTitle : head.title;

  console.log('props: ', props);

  const { holder, contentHolder, sidebar, docContent, docPage } = styles;
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
        <div className={docPage}>
          <section className={sidebar}>
            <aside>
              <ul>
                <li><Link to="/docs/">Introduction</Link></li>
              </ul>
              <ul>
                <li>Using Pie Content</li>
                <ul>
                  <li><Link to="/docs/using/quick-start">Quick Start</Link></li>
                  <li><Link to="/docs/using/defining-items">Defning Items</Link></li>
                  <li><Link to="/docs/using/packaging-items">Packaging Items</Link></li>
                  <li><Link to="/docs/using/rendering-items">Rendering Items</Link></li>
                  <li><Link to="/docs/using/pie-player-api">PIE Player Api</Link></li>
                </ul>
                <li>PIE Development</li>
                <ul>
                  <li><Link to="/docs/developing/summary">Summary</Link></li>
                  <li><Link to="/docs/developing/development">Development</Link></li>
                  <li><Link to="/docs/developing/custom-element">Custom Element</Link></li>
                  <li><Link to="/docs/developing/controller">Controller</Link></li>
                  <li><Link to="/docs/developing/packaging">Packaging</Link></li>
                  <li><Link to="/docs/developing/environment">Environment</Link></li>
                  <li><Link to="/docs/developing/development-tutorial">Development Tutorial</Link></li>
                </ul>
                <li>Authoring Development</li>
                <ul>
                  <li><Link to="/docs/authoring/authoring">Authoring</Link></li>
                  <li><Link to="/docs/authoring/uploader">Uploader Api</Link></li>
                </ul>
              </ul>
              <ul>
                <li><Link to="/docs/open-source-pies">Open Source PIEs</Link></li>
              </ul>
              <ul>
                <li><Link to="/docs/design-decisions">Design Decisions</Link></li>
              </ul>
            </aside>
          </section>
          <section className={docContent}>
            <div dangerouslySetInnerHTML={{ __html: body }}>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </div>
  </div>;
} 