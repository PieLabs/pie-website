import React, { PropTypes } from 'react';

import Footer from '../../components/Footer';
import Head from '../Head'
import Header from '../../components/Header';
import Helmet from 'react-helmet';
import Intercom from '../../components/Intercom';
import { Link } from "phenomic"
import styles from './index.css';

const mkLi = (current) => ({ to, children }) => {
  const selected = current === to || `${to}/` === current;
  return <li className={selected ? styles.selectedLink : ''}>
    <Link to={to}>{children}</Link>
  </li>
}


export default function DocsPage(props) {
  const { children, head, body } = props;
  const metaTitle = head.metaTitle ? head.metaTitle : head.title;

  const { holder, contentHolder, sidebar, docContent, docPage } = styles;
  const meta = [
    { name: "description", content: head.description }
  ]; // TODO.. add og fields etc..

  const Li = mkLi(props.__url);

  return <div>
    <Head {...props} />
    <Header layout={head.layout} />
    <div className={styles.root}>
      <section className={sidebar}>
        <aside>
          <ul>
            <Li to="/docs/">Introduction</Li>
          </ul>
          <ul>
            <li>Using Pie Content</li>
            <ul>
              <Li to="/docs/using/quick-start">Quick Start</Li>
              <Li to="/docs/using/defining-items">Defining Items</Li>
              <Li to="/docs/using/packaging-items">Packaging Items</Li>
              <Li to="/docs/using/rendering-items">Rendering Items</Li>
              <Li to="/docs/using/pie-player-api">PIE Player Api</Li>
            </ul>
            <li>PIE Development</li>
            <ul>
              <Li to="/docs/developing/summary">Summary</Li>
              <Li to="/docs/developing/custom-element">Custom Element</Li>
              <Li to="/docs/developing/controller">Controller</Li>
              <Li to="/docs/developing/packaging">Packaging</Li>
              <Li to="/docs/developing/environment">Environment</Li>
              <Li to="/docs/developing/tutorial/development-tutorial">Development Tutorial</Li>
            </ul>
            <li>Authoring Development</li>
            <ul>
              <Li to="/docs/authoring/authoring">Authoring</Li>
              <Li to="/docs/authoring/uploader">Uploader Api</Li>
            </ul>
          </ul>
          <ul>
            <Li to="/docs/open-source-pies">Open Source PIEs</Li>
          </ul>
          <ul>
            <Li to="/docs/design-decisions">Design Decisions</Li>
          </ul>
        </aside>
      </section>
      <section className={styles.content}>
        <div dangerouslySetInnerHTML={{ __html: body }}>
        </div>
      </section>
    </div>
    <Intercom />
  </div>;
} 