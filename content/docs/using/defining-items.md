# Defining Items

Using PIEs (Portable Interactions and Elements) an author can define an Assessment Item which comprises one or more questions, interactions, and UI elements that can be presented to a user in a browser. 

A simple example is a single Multi-Choice question with text prompt and choices. A more advanced example might include more than one question or interaction type, include content like text passages, video or charts, and include tools to support a user like a calculator or accessiblity tools.


To define an Assessment Item a user (or more typically an authoring system) creates a JSON and HTML file: 


- **config.json** - Contains the definition and configuration data for the PIEs used in the item.
- **index.html** - Contains the Custom Element declarations within html markup.

These files are placed in a directory structure which may also contain any assets that the Item needs such as images, media or metadata.


```
    config.json
    index.html
    picture-one.png
```


> note: formats for metadata for Items is outside the scope of PIE Framework itself. 


### Config JSON

The `config.json` file defines the configuration model for the Assessment Item and for the PIEs in the Item. For example a configuration for a mult-choice PIE question would include the choices, and the correct responses. 

The JSON definition contains the following properties:


#### player (optional)

```json
   "player": {"pie-player": "^1.0.0"}
```

This defines the PIE Player npm package to use for rendering the item.
If this property is not defined, the latest version of `pie-player` will be used by the packaging tool when assessment item.



#### `elements` (required)

The `elements` object defines all the PIEs that are used in the Assessment Item. 

Each property in the `elements` object defines the Element name, and the value defines the version of the Element.


```json
{
    "elements" : {
        "my-pie-element": "1.0.0",
        "another-element": "~1.0.0" 
    }
}
```

Versions are defined using the [Semantic Versioning Specification](http://semver.org).  

For example using, `~1.0.1` will indicate that any 'patch' / bug fix version of version 1.0 of the Element can be used, such as 1.0.1, 1.0.2 etc.

> For advanced use, `elements` can be defined as local files or directories, see [advanced](#advanced) section below.



#### `models` 

An array of Objects providing configuration data for Interaction Elements in the Assessment Item.


The properties for PIE Elements differ for each Element or Interaction type, so the documentation for the PIE should be consulted to learn how to configure it, however in addition to any specific element-type configuration, the following properties are required: 


##### `id` (required)

Unique id (within the definition) for the defined PIE.

> this correlates with the `pie-id` property in the [html](#html) markup.

##### `element` (required)

This is the Element name/tag name. This must correlate to one of the Elements defined for inclusion with the Item in the `elements` property (see above).


Model Example:

```json
    "models": [
        {
            "id": "1",
            "element":"my-multi-choice-pie",
            "choices": ["apple", "orange", "banana", "cucumber", "pea"],
            "correctChoices": ["cucumber", "pea" ],
            {
                // any other configuration for the Interaction Element
            }
        },

        {
            "id": "2",
            "element": "my-other-pie",
            {
               // any other configuration for the Interaction Element
            }
        }
    ]
```



#### `weights` (optional)

This Object defines the score weighting for each PIE included in the definition.
A calculated score for the assessment item will take these weights into account.

```json
    "weights": [
        {
            "id":"1", // unique identifier for the PIE (within the definition)
            "weight": "2" // relative weight to be given to the scaled score for this PIE when calculating overall score
            }
    ]
```



#### Complete Example:

`config.json`
```json
{
    "player": {"pie-player": "~1.0.1"},
    "elements": {
        "my-multi-choice-pie": "^1.0.0",
        "my-other-pie": "2.0.1"  
    }
    "models": [
        {
            "id": "1",
            "element": "my-multi-choice-pie",
            "choices": ["apple", "orange", "banana", "cucumber", "pea"],
            "correctChoices": ["cucumber", "pea" ],
            {
                //other configuration for the PIE
            }
        },
        {
            "id": "2",
            "element": "my-other-pie",
            {
                //other configuration for the PIE
            }
        }
    ]
    "weights": [
        {"id":"1", "weight": "2"},
        {"id":"2", "weight": "1"}
    ]
}
```




#### HTML

The HTML file defines the placement of the PIEs within HTML markup.

The `pie-id` attribute in the html references the `id` of the PIE defined in the JSON.

Example:

`index.html`
```html
Here is question one:
<my-multi-choice-pie pie-id="1"></my-multi-choice-pie>
<p/>
Here is question two:
<my-other-pie pie-id="2"></my-other-pie>
```

## Advanced 

As an author of Assessment Items you will almost always define PIE elements as described above, by name and version.

However it is sometimes useful - particularly for development - to point to a local package or alternate branch/version of a package for a PIE.

To support this the PIE CLI allows you to:

- use alternate NPM style references to packages [see npm docs](https://docs.npmjs.com/files/package.json)
- link directly to a local `.js` file for Custom Elements

Example:

```json
"elements": {
    "my-interaction-type": "MyGithubOrganization/my-github-repo#my-branch",
    "my-other-interaction": "../interactions/my-other-interaction",
    "calculator-tool": "my-calculator.js"
}
```

When defined in this way, the CLI will package them from the local / custom sources.

