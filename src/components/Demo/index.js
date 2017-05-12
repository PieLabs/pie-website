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
    this._env = { mode: 'gather' };

    ReactDOM.findDOMNode(this).addEventListener('pie.register', e => {
      this.renderEl = e.target;
    });

    const { name } = this.props;
    const scripts = ['pie-view.js', 'pie-configure.js', 'pie-controllers.js'];

    this._loadScripts(scripts.map(s => `/pie-website/assets/pies/${name}/${s}`))
      .then(() => {
        return Promise.all([
          customElements.whenDefined(`${name}-configure`),
          this._loadConfig(name)]);
      })
      .then(([d, config]) => {
        this._configElement = ReactDOM.findDOMNode(this).querySelector(`${name}-configure`);
        this._configElement.model = config.models[0];
        this._configElement.addEventListener('model.updated', e => {
          this._loadedConfig.models[0] = e.detail.update;
          this._updatePlayer();
        })
      })
      .then(() => {
        const config = this._loadedConfig;
        this._controller = window[`pie-controller-${name}`][name];
        return this._controller.model(config.models[0], this._session, this._env)
      })
      .then(uiModel => {
        this.renderEl.session = this._session;
        this.renderEl.model = uiModel;
      })
      .catch(e => {
        console.error(e);
      });
  }

  _updatePlayer() {
    this._controller.model(this._loadedConfig.models[0], this._session, this._env)
      .then(m => {
        this.renderEl.model = m;
      });
  }

  onEnvChanged(env) {
    this._env = env;
    this._updatePlayer();
  }

  render() {
    const { path, name, title, description, locale } = this.props; 
    const ConfigureTag = `${name}-configure`;
    const RenderTag = name;

    const styles = {
      width: '50%',
      verticalAlign: 'top',
      display: 'inline-block',
      padding: '10px'
    };

    return <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <ConfigureTag style={styles}></ConfigureTag>
      <div style={styles}>
        <Toolbar onEnvChanged={this.onEnvChanged.bind(this)} locale={locale} />
        <RenderTag></RenderTag>
      </div>
    </div>;
  }

}