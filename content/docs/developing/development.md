# Development

The [PIE CLI](https://github.com/pielabs/pie-cli) tool supports development of Portable Interactions and Element by providing module packaging tools and live-reload features.

## Quick Start

To create a new PIE:

1. Install the PIE CLI tool: `npm install -g pie`
2. Create a directory with the required files. See [Packaging PIEs](packaging.md) and implement your [Custom Element](custom-element.md)
3. Create an Assessment item config by defining `config.json` and `index.html`. See [Defining Items](../using/defining-items.md). 
4. In the `config.json` define and `element` for your pie, and point it to the root directory of the package from step 1.
5. Load your item with `pie serve` edit your source code, and PIE CLI's *live reload* will automatically reload your changes


See the [Development Totorial](tutorial/development-tutorial.md) for a more complete walkthrough on creating a PIE.

> See the [PIE Elements](https://github.com/pieelements) organization on github for example PIEs.



## Using Modules

PIE Custom Elements are defined as javascript modules. In their most simple form, they can be provided as self-contained ES5 or ES6 module that exports an HTMLElement and has no external dependencies.

In practice, however, most web developers use frameworks such as React to build user interfaces and often rely on external /shared libraries as dependencies.

To support this kind of development the PIE Framework provides packaging and development tools through the [PIE CLI](https://github.com/PieLabs/pie-cli) (which is built on top of the popular [webpack](https://webpack.github.io/) and [babel](https://babeljs.io) tools)

These PIE CLI tools:

 - Support the use of ES6 modules in PIEs (ES6 is recommended, commonJS is supported)
 - Will bundle external dependencies defined in the PIE's `package.json`
 - Support loading other assets (css/images)
 - Provide hot-module loading for PIE development so developers can view code changes in real-time
 - Support framework-specific file processing (such as `.jsx` or `.vue`) through webpack loaders.
 - Provide packaging, transpilation and optimization for questions/assessments that use PIEs

## ES6 Imports

As a best practice PIEs should be written using ES6 and using ES6 imports. 

```javascript

import Main from './main.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

```

## Framework & Loaders Support

> Pre-release note, this is not yet implemented. Currently plain ES6, React and Less are built-in. See: https://github.com/PieLabs/pie-cli/issues/47


A PIE can define the framework used for development and other preferences for module building by adding properties to the `pie-packaging` property in the `package.json` file for the PIE. 


```json
{
    "pie-packaging": {
        "framework": "react",
        "css": "sass"
    }
}
```


### `pie-packaging` properties

#### `"framework": ['react', 'vue'] `

Defines the framework used to build the PIE. Currently, ReactJS and Vue.js are supported [contact us](evan@corespring.org) if you're interested in having support added for another framework. 

If `react` is specified: `.jsx` files may be imported,  and `.js` files that contain JSX code will be handled correctly.

### Defaults

The following loaders are enabled by default:

- React
- Less



## Examples



### React JS Example

In this example, React JS is used as the framework for developing the PIE.
The main React Component is defined in `main.jsx`, in this example module below, that component is wrapped in a Custom Element which is the interface to communicate with the PIE Player. 

```javascript

import Main from './main.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

export default class MyReactElement extends HTMLElement{

  constructor(){
    super();
    this._model = null;
    this._session = null;
  }
  
  set model(s){
    this._model = s;
    this._rerender();
  }
  
  set session(s){
    this._session = s;
    this._rerender();
  }

  _rerender() {
    if (this._model && this._session) {
      var element = React.createElement(Main, { model: this._model, session: this._session });
      ReactDOM.render(element, this, function () {
        console.log('rendered');
      });
    } else {
      console.log('skip');
    }
  }

  connectedCallback() {
    this._rerender();
  }

}

```

### Vue.js Example

```javascript
import Vue from 'vue'
import Main from './main.vue'

export default class CorespringMultipleChoiceVueElement extends HTMLElement{
  constructor(){
    super();
    this._model = null;
    this._session = null;
  }

  set model(s){
    this._model = s;
    this._rerender();
  }

  set session(s){
    this._session = s;
    this._rerender();
  }

  connectedCallback() {
    console.log('created');
    this.innerHTML = "<root-component></root-component>";
    this._rerender();
  }

  _rerender() {
    console.log('_rerender...');
    if (this._model && this._session) {
      Vue.component('root-component', Main)
      let vm = new Vue({
        el: this
      })
     console.log("vue rendered");

    } else {
      console.log('skip');
    }
  }

}
```


