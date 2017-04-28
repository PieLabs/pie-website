## Packaging

PIEs are defined as NPM packages, and as a best practice follow a structure for including documentation and a demonstration of the PIE.

## NPM Package


The following directory structure and files should be present in the package (and included when it is installed with npm):


| File | Description | Required? |
|----------------------------|----------------------------------------------------------------------------------------------------------------------|-------------|
| `README.md` | Documentation to describe the PIE to users  | yes |
| `package.json` | Definition for the PIE as an NPM package. Including dependencies needed for rendering | yes |
| `controller/` | Folder containing controller code | no |
| `controller/package.json` | Used to define dependencies and `main` file for the controller. Dependencies should be kept to a minimum and should not use IO | no |
| `docs/schema.json` | JSON schema document that defines the configuration model for the PIE | recommended |
| `docs/demo` | Directory that defines a demonstration assessment item that uses this PIE | recommended |
| `docs/demo/index.html` | The HTML markup for the demo assessment item | recommended |
| `docs/demo/config.json` | The JSON config for the demo assessment item | recommended |
| `src/` | Directory for the PIE Element source code*  | recommended |
| `test/` | Directory for the test code  | recommended |

> \* The PIE element source code can be placed in any directory as long as the `main` property in `package.json` points to the main module for this code. 


> Additional directories and files may be added at the discretion of the developer, but care should be taken so that only necessary files are included with the package using the `files` property in package.json and `.npmignore` file as necessary. 



The package definition is contained in `package.json` see [npm documentation](https://docs.npmjs.com/files/package.json) for full documentation on npm packages.

Example Package.json:

```json
{
  "name": "my-pie",
  "version": "0.0.1",
  "main": "src/index.js",
  "dependencies": {...},
  "files": ["docs", "src", "controller"],
}
``` 


#### name (required)

The package `name` property will be used as the Custom Element name. Elements should be named according to W3C [rules](https://www.w3.org/TR/custom-elements/#concepts) for Custom Elements (all-lowercase, must contain a hyphen). The name of the PIE should be unique, as such, we recommend using your organization name as the first part of the name, e.g. `organization-pie-name`

### version (required)

This is the [semver](semver.org) version for your PIE. The semver rules should be followed so that breaking changes will not be applied to existing questions that use your pie.

### main (required) 

This is the entry point for defining the Custom Element for your PIE. 

This file will be defined as a `.js` file and should be an ES6 module that is the entry point module for your Custom Element. (See examples in [Custom Element](custom-element.md))

> Important: You should not bundle / pack your PIE's dependencies in this file, The [PIE CLI packaging tool](https://github.com/PieLabs/pie-cli) will do that on your behalf.


### dependencies

Define dependencies that need to be included with your PIE when it is run in the browser. 
Care should be taken to only define dependencies that are used in the PIE and to not add too much download size to the PIE when distributed.

### files

Defines what files should be downloaded when the package is installed.

> `README.md`, and `package.json` and some [other files](https://docs.npmjs.com/files/package.json#files) will always be included by npm 



## Demo and Docs

The [pie-cli] `serve` utility helps load and preview PIEs, it enforces some conventions about how a PIE is structured so that it can be easily reviewed in a consistent way.

To support this, as described above, the following files should be present in a PIE package:

```
README.md
docs/
  schema.json
  demo/
    index.html
    config.json
```

#### README.md

This markdown file should describe and document how to use the PIE.

#### schema.json

This file should be a json schema document, describing the model for the `config` object that needs to be provided by a content author to use an instance of the PIE.

#### demo/

This should contain a sample usage of the PIE, see [Defining Questions](../using/defining-questions.md).
