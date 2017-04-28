import React from 'react';
import styles from './index.css';


export default class FeatureRow extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const features = this.props.features;
        const { feature, featureRow, description, image } = styles;
        debugger;

        return <div className={featureRow}>
            {features.map(content =>

                    <div className={feature} key={content.title}>
                        <div className={image}>
                            <img src={content.image}/>
                        </div>
                        <div className={description}>
                            <h2>{content.title}</h2>
                            <p>{content.text}</p>
                        </div>
                    </div>

            )}

        </div>

    }
}

