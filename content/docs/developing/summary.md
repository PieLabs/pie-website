# Summary

Each PIE is an individual UI Element or interaction that is designed to be re-used in the context of assessment. An example of a PIE might be a multi-choice question-type or a question-type that allows a student to make a bar chart or plot points on a graph. However a PIE does not to be a question type, it can be any Custom Element. 

Users can configure one or more instances of PIEs to create questions/assessment experiences for students. See [Rendering Items](/using/rendering-items.md)

To create a PIE a developer implements:

1. [Required] A [Custom Element](https://www.w3.org/TR/custom-elements/) that provides the user interface for the PIE
2. [Required]* An NPM package that allows users/systems to install and use your PIE
3. [Optional] A Controller that manipulates the model for the UI and/or processes user input to generate results/outcomes and learning activity 


> A PIE that implements a controller will referred to as an Interaction in these documents.


#### Example

This is a quick example of how these components of a PIE are defined. Each will be explained in detail in the next few sections.

**Custom Element**

A CustomElement provides the UI for a PIE and exposes an API to the PIE Player: 

```javascript
export default class MyPie extends HTMLElement {

  constructor() {
    super();
    this._model = null;
    this._session = null;
  }

  connectedCallback() {
    this._rerender();
  }

  }

```

> As a best-practice the PIE Custom Element should be written in ES6 (although CommonJS modules are also supported) The PIE project provides development [tools](https://github.com/PieLabs/pie-cli) that handle transpilation and bundling. 

**Controller**

A Controller can be implemented by the PIE, this provides a model for the PIE Element to use in the UI and provides logic for analyzing a response and providing an outcome.

```javascript
export function model(config, session, env) {
   // called when PIE is initialized and anytime `env` (environment) properties change
}

export function outcome(config, session, env) {
  // called to produce an outcome from the user interaction with the pie (score, etc)
}
```

**NPM Package**

Each PIE is provided as a standard NPM package, using semver versioning.

```json
{
  "name": "my-pie",
  "version": "0.0.1",
  "main": "dist/index.js",
  "dependencies": {...},
  ...
}
``` 


_* A Custom Element can in fact be defined as a local JS file relative to an Item configuration. This may be useful for testing during developemtn, however for effective re-use elements should be defined in an NMP package_