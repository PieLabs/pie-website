import React from 'react';
import SignUp from '../SignUp';
import styles from './index.css';
import ReactDOM from 'react-dom';
import Svg from "react-svg-inline"
import logoSvg from "../../../../content/assets/pie-logo.svg"

export default class Main extends React.Component {


  render() {
    const { title, subtitle } = this.props;
    return <div className={styles.hero}>
      <div className={styles.logo}>
        <Svg width="10rem" svg={logoSvg} className={styles.svg}/>
      </div>
      <div>
        <div className={styles.heroTitle}>
          {title}
        </div>
        <div className={styles.heroSubtitle}>
          {subtitle}
         </div>
      </div>
    </div>;
  }


}
