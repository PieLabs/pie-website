import { List, ListCheckbox, ListDivider, ListItem, ListSubHeader } from 'react-toolbox/lib/list';

import DemoLoader from '../../components/DemoLoader';
import FontIcon from 'react-toolbox/lib/font_icon';
import Footer from '../../components/Footer';
import Head from '../Head';
import Header from '../../components/Header';
import Helmet from 'react-helmet';
import Link from '../../components/Link';
import Page from '../Page';
import React from 'react';
import selectedListItem from './selected-list-item.css';
import styles from './index.css';

const Root = (props) => {

  const metaTitle = '?';
  const { children, body, head } = props;

  return <div>
    <Helmet title={metaTitle} >
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet" />
    </Helmet>
    <Header layout={head.layout} />
    <div className={styles.holder}>
      <div className={styles.contentHolder}>
        {children}
        <div dangerouslySetInnerHTML={{ __html: body }}></div>
        {/*<Footer />*/}
      </div>
    </div>
  </div>
};

export default class Examples extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPie: null
    }

    this.onClickPie = this.onClickPie.bind(this);
  }

  onClickPie(pie) {
    this.setState({
      currentPie: pie.name
    });
  }

  render() {

    const { head } = this.props;
    const {
      bottomLinkText,
      main,
      promoVideo,
      publishers,
      developers,
      features,
      pies } = head;

    const { currentPie } = this.state;

    return <Root { ...this.props }>
      <Head head={head} />

      <div className={styles.panes}>
        <aside className={styles.list}>
          <List selectable ripple>
            <ListSubHeader caption={main.title} />
            <li className={styles.subtitle}><span>{main.subtitle}</span></li>
            <ListDivider />
            {pies.map((p, index) => {
              const selected = currentPie === p.name;
              const onClick = this.onClickPie.bind(this, p);
              return <ListItem
                theme={selected ? selectedListItem : null}
                key={index}
                caption={p.title}
                legend={p.description}
                onClick={onClick} />;
            })}
          </List>
        </aside>
        <div className={styles.examples}>

          <DemoLoader pies={pies} currentPie={currentPie} />
          {/*{pies.map((p, index) => <Demo key={index} { ...p } />)}*/}
        </div>
      </div>
    </Root>;
  }
}