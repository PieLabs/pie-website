import React from 'react';
import styles from './index.css';
import Svg from "react-svg-inline"
import logoSvg from "../../../content/assets/pie-logo.svg"

export default function Brand(props) {
  return <div className={styles.brand}>
    <div className={styles.logo}>
      <Svg width="42" svg={ logoSvg } className={styles.svg}/>
    </div>
    <div className={styles.logoText}>
      Pie
  </div>
    <small>
      framework
  </small>
  </div>

}
