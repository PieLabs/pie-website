import Demo from '../Demo';
import React from 'react';
import styles from './index.css';

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

function loadScripts(scripts) {
  return Promise.all(scripts.map(s => loadScriptPromise(s)));
}

export default class DemoLoader extends React.Component {
  constructor(props) {
    super(props);

    this.loadedPies = [];

    this.state = {
      loading: [],
      loaded: [],
      configs: {}
    }
  }


  isLoaded(pie) {
    return this.loadedPies.find(p => p.name == pie) !== undefined;
  }

  loadConfig(pie) {
    return fetch(`/pie-website/assets/pies/${pie}/config.json`)
      .then(r => r.json())
      .catch(e => {
        console.error('error loading config: ', e.message);
      });
  }

  loadPie(pie) {

    const scripts = ['pie-view.js', 'pie-configure.js', 'pie-controllers.js'];
    const paths = scripts.map(s => `/pie-website/assets/pies/${pie}/${s}`);

    loadScripts(paths)
      .then(() => this.loadConfig(pie))
      .then((config) => {
        const loading = this.state.loading.filter(p => p !== pie);
        const loaded = this.state.loaded.indexOf(pie) === -1 ? this.state.loaded.concat([pie]) : this.state.loaded;
        const configs = { ...this.state.configs, [pie]: config };
        this.setState({ loading, loaded, configs });
      })
      .catch(e => {
        console.error(e);
      });
  }

  componentWillReceiveProps(next) {
    if (next.currentPie && this.state.loaded.indexOf(next.currentPie) === -1) {
      const nextPie = next.currentPie;
      const loading = this.state.loading;
      const update = loading.indexOf(next.currentPie) === -1 ? loading.concat([nextPie]) : loading;
      this.setState({ loading: update });
      this.loadPie(nextPie);
    }
  }

  render() {
    const { pies, currentPie } = this.props;

    if (currentPie) {
      if (this.state.loaded.find(n => n === currentPie)) {
        const config = this.state.configs[currentPie];
        return <Demo
          config={config}
          tag={currentPie} />;
      } else {
        return <div>Loading {currentPie}</div>;
      }
    } else {
      return <div>DemoLoader</div>;
    }
  }
}