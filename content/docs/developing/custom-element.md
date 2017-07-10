# Custom Element

The user interface for a PIE is provided in the browser by a [Custom Element](https://www.w3.org/TR/custom-elements/).

It should be defined in an ES6 module which is included as the main entry point the package (see [Packaging](../packaging.md))

> The most basic definition of an Element module is an ES6 module (CommonJS is also supported).

> For information on developing and building your Custom Element module with framework support see [Using Modules](#using-modules) section below.


```javascript

/**
 * A custom element that renders a button. 
 * Once you click the button the session is updated and the message changes.
 * model: { clickedMsg: "You have clicked", notClickedMsg: "Click Me"}
 * session: { response: { clicked: true|false } } 
 */
export default class MyPie extends HTMLElement {

  constructor() {
    super();
    this._model = null;
    this._session = null;
    this._env = null;
  }

  set model(m) {
    this._model = m;
    this.dispatchEvent(new CustomEvent('model-set', {
      bubbles: true,
      detail: {
        hasModel: this._model !== null 
      }
    }));
    this._render();
  }

  set session(s) {
    this._session = s;
    this._render();
  }

  set env(e) {
    this._env = e;   
  }

  _render(){
    if(this._session && this._model){
      const { clicked } = (this._session.response || {});
      const msg = clicked ? this._model.clickedMsg : this._model.notClickedMsg;
      this.querySelector('button').textContent = msg;
    }
  }

  connectedCallback() {
    
    this.innerHTML = `<button>Click me</button>`;

    this.querySelector('button').addEventListener('click', e => {
      this._session.response = this._session.response || {}
      this._session.response.clicked = true;
      this._render();
      this.dispatchEvent(new CustomEvent('model-updated', {
        bubbles: true,
        detail: {
          complete: true 
        }
      }));
    });

  }
}
```

The Element receives 2 properties: `model` and `session`, that the `pie` instance uses to build a UI.


#### `set model`

If you provide a controller with your PIE, then your controller will be called to set this property on your Custom Element, see [Controller](../controller.md).

The controller is passed the complete configuration defined for the assessment item, along with the user's session data, and current [Environment](../environment.md) properties.

This allows you to set the model to an appropriate state based on the current settings. For example if in the `env` property the `mode` was set to `evaluate` you would need the correct responses to a question available in your model so your Custom Element can display information about the responses. Or if the environment indicated that the current user had certain accessibility requirements, you can modify the model to support those.

If no controller is provided by the pie definition, the `model` Promise will return: the `model` and `env` parameters that were passed in to it: `{model, env}`.


#### `set session`

The session property represents the state of a user's interaction with the PIE. If a setter is provided in the Custom Element this property will be set by the PIE player when loading an assessment item. 

The Element can modify this object and should emit a `session-changed` event (see below) when it does so, so that if need be the session response may be persisted.

As with `model` the structure of this data is entirely up to the developer of the PIE that uses it.


### Events

A PIE should emit the following events:


###  `session-changed` (optional)

This event should be dispatched if the data captured from a user (in `session`) has changed. 
This should be data contains the users responses and that you would need to restore the user's session correctly at a later point in time.

#### `{ detail: { complete }` - whether the session is deemed to be complete.

Set this to describe whether the response is now complete. For example, if you had a had a choice-style question that required the student to pick a minimum of 3 choices you would emit this event when when 3 choices had been selected but not before.

If your interaction doesn't need to determine 'completeness' you cam omit the `detail.complete` property.

```javascript
    var event = new CustomEvent('session-changed', {
      bubbles: true,
      detail: {
        complete: this.isComplete()
      }
    });

    this.dispatchEvent(event);
```

### `model-set` (optional)

This event should be dispatched when the `model` has been set.

#### `{ detail: { hasModel } }` 
Set this to true if the model is not undefined. `hasModel = this._model !== undefined`.

### Brower Support

Custom Elements are natively supported in Chrome and are available in other browsers via a polyfill. (Firefox = In development,  and Webkit = done - Dec 2016)


### Using Modules

PIE Custom Elements are defined as javascript modules. In their most simple form, they can be provided as self-contained ES5 or ES6 module that exports an HTMLElement and has no external dependencies.

In practice, however, most developers use frameworks such as React to build user interfaces and often rely on external /shared libraries as dependencies.

To support this kind of development the PIE Framework provides packaging and development tools through the [PIE CLI](https://github.com/PieLabs/pie-cli) (which is built on top of the popular [webpack](https://webpack.github.io/) and [babel](https://babeljs.io) tools)

These PIE CLI tools:

 - Support the use of ES6 modules in PIEs (ES6 is recommended, commonJS is supported)
 - Will bundle external dependencies defined in the PIE's `package.json`
 - Support loading other assets (css/images)
 - Provide hot-module loading for PIE development so developers can view code changes in real-time
 - Support framework-specific file processing (such as `.jsx` or `.vue`) through webpack loaders.
 - Provide packaging, transpilation and optimization for questions/assessments that use PIEs

 Currently loaders for React `jsx` support has been provided built-in, other frameworks are possible to add. Please contact us if you'd like to see loaders for other frameworks added. 
