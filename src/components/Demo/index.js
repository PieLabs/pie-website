import React from 'react';
import ReactDOM from 'react-dom';
import Toolbar from './toolbar';
import styles from './index.css';

export default class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      elementsRegistered: false
    }
  }

  applyConfigModel() {
    const { config } = this.props;
    this.configElement.model = config.models[0];
    this.configElement.addEventListener('model.updated', e => {
      this.updatePlayer(e.detail.update);
    })
  }

  get controller() {
    const { tag } = this.props;
    const controllerId = `pie-controller-${tag}`
    return window[controllerId][tag];
  }

  updatePlayer(model) {

    model = model || this.props.config.models[0];

    console.log('update player: config: ', model);
    return this.controller.model(model, this.session, this.env)
      .then(uiModel => {
        this.renderElement.session = this.session;
        this.renderElement.model = uiModel;
      })
      .catch(e => {
        console.error(e);
      });
  }

  componentDidMount() {
    this.linkUpElements();
  }

  componentDidUpdate() {
    this.linkUpElements();
  }

  linkUpElements() {

    console.log('link up elments.. ', this.state.elementsRegistered);

    if (this.state.elementsRegistered) {
      return;
    }

    const { tag } = this.props;
    this.configElement = ReactDOM.findDOMNode(this).querySelector(`${tag}-configure`);
    this.applyConfigModel();

    this.renderElement = ReactDOM.findDOMNode(this).querySelector(tag);

    this.session = {};
    this.env = { mode: 'gather' };

    this.renderElement.addEventListener('pie.register', () => {
      this.updatePlayer();
    });

    this.updatePlayer();

    this.setState({ elementsRegistered: true });
  }

  componentWillReceiveProps(next) {
    this.setState({ elementsRegistered: false });
  }

  onEnvChanged(env) {
    this.env = env;
    this.updatePlayer();
  }

  render() {
    const { tag, config } = this.props;
    const ConfigureTag = `${tag}-configure`;
    const RenderTag = tag;

    return <div className={styles.root}>
      <div className={styles.configure}>
        <ConfigureTag />
      </div>
      <div className={styles.render}>
        <Toolbar onEnvChanged={this.onEnvChanged.bind(this)} langs={config.langs} />
        <RenderTag></RenderTag>
      </div>
    </div>;
  }
}