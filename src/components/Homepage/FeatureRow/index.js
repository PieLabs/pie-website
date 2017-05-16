import React from 'react';
import styles from './index.css';
import Svg from "react-svg-inline"
import choiceSvg from "../../../../content/assets/choice.svg"
import networkSvg from "../../../../content/assets/network.svg"
import developerSvg from "../../../../content/assets/developer.svg"
import authorSvg from "../../../../content/assets/author.svg"
import standardsSvg from "../../../../content/assets/standards.svg"
import innovateSvg from "../../../../content/assets/innovate.svg"

export default class FeatureRow extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const features = this.props.features;
        const { feature, featureRow, description, image } = styles;

        return <div className={featureRow}>

                <div className={feature}>
                    <div className={image}>
                        <Svg svg={choiceSvg}/>
                    </div>
                    <div className={description}>
                        <h2>Freedom & Choice</h2>
                        <p>PIE is an Open Source Framework. Any content (or new question types) you create belong to you. You do not require a licence, payment or partnership with any organization to us or share your content.</p>
                    </div>
                </div>
                <div className={feature}>
                    <div className={image}>
                        <Svg svg={networkSvg}/>
                    </div>
                    <div className={description}>
                        <h2>Simple Distribution</h2>
                        <p>PIE provides a non-proprietary format for Assement Content that preserves the design and functionality that the content developer intended. Both for simpler question types and more advanced interactions.</p>
                    </div>
                </div>                
                <div className={feature}>
                    <div className={image}>
                        <Svg svg={developerSvg}/>
                    </div>
                    <div className={description}>
                        <h2>Developer Friendly</h2>
                        <p>Use the capabilities of HTML5 and modern javascript development to deliver engaging, interactive question types that will work on web or mobile devices.</p>
                    </div>
                </div>                
                <div className={feature}>
                    <div className={image}>
                        <Svg svg={authorSvg}/>
                    </div>
                    <div className={description}>
                        <h2>Content Authoring</h2>
                        <p>Integrate Technology Enhanced item authoring to your site, using free Open Source question types. </p>
                    </div>
                </div>
                <div className={feature}>
                    <div className={image}>
                        <Svg svg={standardsSvg}/>
                    </div>
                    <div className={description}>
                        <h2>Standards Compatible</h2>
                        <p>The PIE Framework is not itself a standard, but a working set of software tools. It can work within and support a number of existing education technology standards.</p>
                    </div>
                </div>                
                <div className={feature}>
                    <div className={image}>
                        <Svg svg={innovateSvg}/>
                    </div>
                    <div className={description}>
                        <h2>Quality and Innovation</h2>
                        <p>You can create new and innovative interactions to deliver a more engaging and effective assessment experience. Or create or modify existing question types so they perfectly represent your educational and design standards.</p>
                    </div>
                </div> 

        </div>

    }
}

