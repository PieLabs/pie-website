import React, { PropTypes } from 'react';

import Helmet from 'react-helmet';

export default class Head extends React.Component {

  componentDidMount() {
    const jsCode = `
      (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/jgcm12je';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()
    `;
    new Function(jsCode)();
  }

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

