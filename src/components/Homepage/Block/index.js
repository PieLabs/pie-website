import React from 'react';
import styles from './index.css';
import MediaQuery from 'react-responsive';


export default class Block extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { leader, text, subtext, url, image, imgHeight } = this.props;

    const {img, imgCol, textCol, textContent, hline } = styles;

    const blockStyle = image === 'left' ? styles.reversedBlock : styles.block;
  
    return <MediaQuery minDeviceWidth="600px">{
      (wideEnough) => {
        return <div className={blockStyle}>
          <div className={textCol}>
            &nbsp;
           <div className={hline}></div>
            <div className={textContent}>
              <h3>{text}</h3>
              <h5>{subtext}</h5>
            </div>
          </div>
          <div className={imgCol}>
            <img className={img} src={url}></img>
          </div>
        </div>
      }
    }
    </MediaQuery>;

  }
}

Block.propTypes = {
  image: React.PropTypes.oneOf(['left', 'right'])
}

Block.defaultProps = {
  image: 'left'
}