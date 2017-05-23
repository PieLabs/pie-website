import MediaQuery from 'react-responsive';
import React from 'react';
import sr from '../../scroll-reveal-instance';
import styles from './index.css';

export default class Block extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    const { image } = this.props;
    const distance = '300px';
    const config = {
      origin: image === 'left' ? 'left' : 'right',
      duration: 1000,
      delay: 300,
      distance,
      scale: 1,
      easing: 'ease'
    }
    sr.reveal(this.root, config);
  }

  render() {
    const { leader, text, subtext, url, image, imgHeight } = this.props;

    const { img, imgCol, textCol, textContent, hline } = styles;

    const blockStyle = image === 'left' ? styles.reversedBlock : styles.block;

    return <div ref={r => this.root = r}>
      <MediaQuery minDeviceWidth="600px">{
        (wideEnough) => {
          return <div className={blockStyle}>
            <div className={textCol}>
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
      </MediaQuery>
    </div>;

  }
}

Block.propTypes = {
  image: React.PropTypes.oneOf(['left', 'right'])
}

Block.defaultProps = {
  image: 'left'
}
