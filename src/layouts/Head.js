import React, { PropTypes } from 'react';

import Helmet from 'react-helmet';

export default class Head extends React.Component {


  render() {

    /*const meta = [
      { name: "description", content: head.description }
    ]; // TODO.. add og fields etc..
    */

    const { head } = this.props;

    const metaTitle = head.metaTitle ? head.metaTitle : head.title;

    return <Helmet title={metaTitle}>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet" />
    </Helmet>;
  }

}

Head.propTypes = {
  head: PropTypes.object.isRequired
}

