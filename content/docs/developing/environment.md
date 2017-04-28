# Environment

The environment `env` Object helps to define the current runtime context for PIEs as they are being viewed by a user.
Any time this property is updated the [PIE Player](../pie-player.md) will set it on the Custom Element for a PIE. It also will be passed to to the `model` function implemented by a PIE [controller](controller.md). The result of this will be set as the `model` property in the PIE Custom Element. This allows a developer to update or filter the model as neccesary to have the appropriate data available to render the view in the current context.


## Environment Properties

```json
{
    "view": "gather" | "view" | "evaluate" | "preview",
    "role": "student" | "instructor",
    "lang": [BCP 47 language tag],
    "options": {...}
}
```

### Property: `view` 

The `view` property indicates which view the PIE should render. The following values may be provided:

| value    | Description                                                                                                                                                                     |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| gather   | The PIE should present a view that allows a response to be captured                                                                                                             |
| evaluate | The PIE should present the response in a way that provides an evaluation of the response provided by a user                                                                     |
| view     | The PIE should present a response with no inflection, and without allowing modification of the response.                                                                        |
| preview  | The PIE should present the interaction for a user who is finding questions/interactions to use. For example an instructor previewing questions before including them in a test. |


### Property: `role` 

Indicates the role of the current user viewing the PIE. 
Possible values are `instructor` and `student`

It is up to the PIE developer to determine what to do with these properties. For example a PIE might present the `evaluate` view differently to a user with role `student` or `instructor`, but may not have any difference in presentation for roles when the view is `gather`.

### Property: `lang` 

For localisation, the `lang` property informs the PIE of the primary language setting for the user. 
The values will be [BCP 47](https://www.w3.org/International/articles/language-tags/) tags like `en_US`


### Property: `options`

### Reserved `options` Properties

The following properties are reserved properties that can be passed in the `options` object.

They are used to enable/disable and configure certain features that may be available in the assessment item.

| Property           | Property Type | Summary                                      |
|--------------------|---------------|----------------------------------------------|
| calculator         | Object        | Calculator Tool, basic and advanced          |
| notepad            | Boolean       | Note taking tool                             |
| ruler              | Boolean       | Ruler Tool                                   |
| protractor         | Boolean       | Protractor Tool                              |
| masking            | Boolean       | Masking Tool                                 |
| glossary           | Object        | Glossary Tool                                |
| highlighter        | Boolean       | Highlighter Tool                             |
| textToSpeech       | Boolean       | Text-to-Speech                               |
| stackedTranslation | Boolean       | Show translations in-place near content      |
| asl                | Boolean       | Show ASL video content if available          |
| braille            | Object        | Options for presenting content using Brailly |
| expandablePassages | Boolean       | Allow expanding of passage content           |
| spellCheck         | Boolean       | Allow spell check                            |
| zoom               | String        | Support zoom-level                           |
| colorContrast      | String        | Support alternate color contrast             |
| closedCaptioning   | String        | Provide closed captioning for media          |
| strikeThrough      | Boolean       | Provide ability to strike-through options    |


> BETA Release Note: full specification of these properties will be documented in upcoming releases of PIE framework

### Custom `options` Properties

PIEs that need to allow for configuration options to be added when rendering their UI may define properties that will be passed in the `env.options`.

By convention, these properties should be scoped by organization name, e.g.

```json
{ 
    "options":{
        "corespring": {
            "myCustomOption": "someValue"
        }
    } 
}
``` 