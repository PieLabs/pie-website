import React from 'react';
import Svg from "react-svg-inline"
import edLogo from "../../../content/assets/ed-logo.svg";
import logoSvg from "../../../content/assets/pie-logo.svg";
import styles from './index.css';

export default function Brand(props) {
  return <div className={styles.brand}>
    <div className={styles.logo}>
      <Svg width="42" svg={edLogo} className={styles.svg} />
    </div>
    <small>
      framework
  </small>
  </div>

}
