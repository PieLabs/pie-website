## corespring-icon

CoreSpring icon sets for use in PIEs.

### Demo

    npm install
    npm run serve

And navigate to [http://localhost:8080](http://localhost:8080), or see [https://PieLabs.github.io/corespring-icon/](https://PieLabs.github.io/corespring-icon/) for live examples.

### Usage

    npm install corespring-icons

Import with the following:

    import CorrectIcon from 'corespring-icon/correct-icon.jsx';
    import PartiallyCorrectIcon from 'corespring-icon/partially-correct-icon.jsx';
    import IncorrectIcon from 'corespring-icon/incorrect-icon.jsx';
    import NothingSubmittedIcon from 'corespring-icon/nothing-submitted-icon.jsx';
    import ShowRationaleIcon from 'corespring-icon/show-rationale-icon.jsx';
    import LearnMoreIcon from 'corespring-icon/learn-more-icon.jsx';
    import CorrectResponseIcon from 'corespring-icon/correct-response-icon.jsx';
    import InstructionsIcon from 'corespring-icon/instructions-icon.jsx';

    ....

    <CorrectIcon iconSet="emoji" shape="round"/>
    <PartiallyCorrectIcon iconSet="emoji" shape="square" open={true} />
    <IncorrectIcon iconSet="check" shape="square"/>
    <NothingSubmittedIcon iconSet="emoji" shape="square"/>
    <ShowRationaleIcon iconSet="emoji" />
    <LearnMoreIcon open={true} />
    <CorrectResponseIcon open={false} />
    <InstructionsIcon open={true} />