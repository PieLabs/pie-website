import PropTypes from 'prop-types';
import React from 'react';

export default class Intercom extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

    const { metadata: { pkg } } = this.context;
    const { appId } = pkg.intercom;

    const jsCode = `
      (function(){var intercomSettings = {};var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/${appId}';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()
    `;
    new Function(jsCode)();

    setTimeout(() => {
      if (typeof window !== undefined) {
        if (window.Intercom) {
          window.Intercom('boot', { app_id: appId })
        }
      }
    }, 1000);
  }

  render() {
    //Not a react ui component
    return null;
  }
}

Intercom.contextTypes = {
  metadata: PropTypes.object.isRequired,
}