import React, { PropTypes } from 'react';

import Helmet from 'react-helmet';
import _ from 'lodash';

const toName = (n) => {
  if (n) {
    return _.last(n.split('/')).replace('.md', '');
  } else {
    return '';
  }
}

export default class Head extends React.Component {

  render() {

    /*const meta = [
      { name: "description", content: head.description }
    ]; // TODO.. add og fields etc..
    */

    const { head, __filename } = this.props;

    const title = head.metaTitle || head.title || toName(__filename);
    const favIcon = `${process.env.PHENOMIC_USER_URL}assets/pie-logo-orange.ico`;

    return <Helmet title={title}>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet" />
      <link rel="icon" href={favIcon} />
    </Helmet>;
  }

}

Head.propTypes = {
  head: PropTypes.object.isRequired
}

