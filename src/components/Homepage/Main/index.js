import React from 'react';
import SignUp from '../SignUp';
import styles from './index.css';
import ReactDOM from 'react-dom';
import Svg from "react-svg-inline"
import { Button, IconButton } from 'react-toolbox/lib/button';
import logoSvg from "../../../../content/assets/pie-logo.svg"
import { Link } from 'phenomic';

export default class Main extends React.Component {

  getStartedLink() {
    
  }

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
         <Link to="/docs/using/quick-start/">
          <Button
            className={styles.button}
            label={'Start Development'}
            raised
            primary
            onMouseUp={this.onSignUp}
          />
       </Link>
      </div>
    </div>;
  }


}
