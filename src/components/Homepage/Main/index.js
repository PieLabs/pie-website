import React from 'react';
import ReactDOM from 'react-dom';
import SignUp from '../SignUp';
import Svg from "react-svg-inline"
import edSvg from "../../../../content/assets/ed-logo.svg"
import styles from './index.css';

export default class Main extends React.Component {


  render() {
    const { title, subtitle } = this.props;
    return <div className={styles.hero}>
      <div className={styles.logo}>
        <Svg width="10rem" svg={edSvg} className={styles.svg} />
      </div>
      <div className={styles.heroSubtitle}>
        {subtitle}
      </div>
    </div>;
  }


}
