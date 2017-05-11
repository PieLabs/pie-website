import React from 'react';
import ReactDOM from 'react-dom';
import Toolbar from './toolbar';

function loadScript(src, done) {
  var script = document.createElement('script');
  script.src = src;
  script.async = true;
  script.onload = function () {
    done();
  }
  script.onerror = done.bind(null, new Error('script load failed for ' + src));
  document.head.appendChild(script);
}

function loadScriptPromise(src) {
  return new Promise(function (resolve, reject) {
    loadScript(src, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export default class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.tagName = `${this.props.pie}-pie-item`;
  }

  _loadScripts(scripts) {
    return Promise.all(scripts.map(s => loadScriptPromise(s)));
  }

  _loadConfig(name) {

    if (this._loadedConfig) {
      return Promise.resolve(this._loadedConfig);
    } else {
      return fetch(`/pie-website/assets/pies/${name}/config.json`)
        .then(r => r.json())
        .then(json => {
          this._loadedConfig = json;
          return json;
        })
        .catch(e => {
          console.error('error loading config: ', e.message);
        })
    }
  }


  componentDidMount() {
    this._session = {};

    ReactDOM.findDOMNode(this).addEventListener('pie.register', e => {
      this.renderEl = e.target;
    });

    const { name } = this.props;
    const scripts = ['pie-view.js', 'pie-configure.js', 'pie-controllers.js'];

    this._loadScripts(scripts.map(s => `/pie-website/assets/pies/${name}/${s}`))
      .then(() => {
        return Promise.all([
          customElements.whenDefined('corespring-choice-configure'),
          this._loadConfig(name)]);
      })
      .then(([d, config]) => {
        ReactDOM.findDOMNode(this).querySelector('corespring-choice-configure').model = config.models[0];
      })
      .then(() => {
        const config = this._loadedConfig;
        const controller = window['pie-controllers']['corespring-choice'];
        return controller.model(config.models[0], this._session, { mode: 'gather' })
      })
      .then(uiModel => {
        this.renderEl.session = this._session;
        this.renderEl.model = uiModel;
      })
      .catch(e => {
        console.error(e);
      });
  }

  onEnvChanged(env) {
    ReactDOM.findDOMNode(this).querySelector(this.tagName).env = env;
  }

  render() {
    const { path, name } = this.props;
    const ConfigureTag = `${name}-configure`;
    const RenderTag = name;
    const styles = {
      width: '50%',
      'vertical-align': 'top',
      display: 'inline-block',
      padding: '10px'
    };
    return <div>
      <ConfigureTag style={styles}></ConfigureTag >
      <RenderTag style={styles}></RenderTag>
    </div >;
  }

}