import React, { PropTypes } from 'react';

import Helmet from 'react-helmet';
import _ from 'lodash';
import { joinUri } from 'phenomic';

const toName = (n) => {
  if (n) {
    return _.last(n.split('/')).replace('.md', '');
  } else {
    return '';
  }
}

export default class Head extends React.Component {

  render() {
    const { head, __filename, __url } = this.props;
    const { metadata: { pkg } } = this.context;

    const socialImage = head.hero && head.hero.match("://") ? head.hero
      : joinUri(process.env.PHENOMIC_USER_URL, head.hero);

    const url = joinUri(process.env.PHENOMIC_USER_URL, __url);

    const title = head.metaTitle || head.title || toName(__filename);
    const favIcon = `${process.env.PHENOMIC_USER_URL}assets/pie-logo-orange.ico`;

    const meta = [
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: title },
      { property: 'og:url', content: url },
      { property: 'og:image', content: socialImage },
      { property: 'og:description', content: head.description },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:creator', content: `@${pkg.twitter}` },
      { name: 'twitter:description', content: head.description },
      { name: 'twitter:image', content: socialImage },
      { name: 'description', content: head.description },
    ];


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

Head.contextTypes = {
  metadata: PropTypes.object.isRequired,
}


