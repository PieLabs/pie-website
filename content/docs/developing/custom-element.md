# Custom Element

The user interface for a PIE is provided in the browser by a [Custom Element](https://www.w3.org/TR/custom-elements/).

It should be defined in an ES6 module which is included as the main entry point the package (see [Packaging](packaging.md))

> The most basic definition of an Element module is an ES6 module (CommonJS is also supported).
> For information on developing and building your Custom Element module with framework support see [Using Modules](using-modules.md)


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
    // the pie-player will capture this event and set the model and session properties
    this.dispatchEvent(new CustomEvent('pie.register', { bubbles: true }));   
  }
}
```

The Element receives 2 properties: `model` and `session`, that the `pie` instance uses to build a UI.


#### `set model`

If you provide a controller with your PIE, then your controller will be called to set this property on your Custom Element, see [Controller](./controller.md).

The controller is passed the complete configuration defined for the assessment item, along with the user's session data, and current [Environment](./environment.md) properties.

This allows you to set the model to an appropriate state based on the current settings. For example if in the `environment` property the `view` was set to `evaluate` you would need the correct responses to a question available in your model so your Custom Element can display information about the responses. Or if the environment indicated that the current user had certain accessibility requirements, you can modify the model to support those.



#### `set session`

The session property represents the state of a user's interaction with the PIE. If a setter is provided in the Custom Element this property will be set by the PIE player when loading an assessment item. 

The Element can modify this object and should emit a `sessionChanged` event (see below) when it does so, so that if need be the session response may be persisted.

As with `model` the structure of this data is entirely up to the developer of the PIE that uses it.

#### `set env`

The `env` property contains data that reflect the current user context. Any updates do these properties will be passed to the Custom Element by setting this property.

For a complete description of the properties in `env` see: [Environment](environment.md)

### Custom Element Properties

If you do not provide a controller and only provide a Custom Element, your element may receive configuration data to its properties in two ways:

#### JSON configuration

config.json
```json
  ...
  models: [
    {
      "id":"1",
      "element":"my-pie",
      "fooBar": "some data"
    }
  ]
```

MyPie.js:
```javascript
class MyPie extends HTMLElement {
  set fooBar(value) {
    // == 'some data'
  }
}
```


### Events

A PIE should emit the following events:


### `pie.register` (required) TODO: -> `register`

A PIE should emit this event when the Custom Element is connected in the DOM. This event is handled by the PIE Player which will then set the `model` and `session` properties on the element.


###  `response-changed` (optional)

This event should be dispatched if the data captured from a user (in `session`) has changed. 

#### `{ detail: { complete }` - whether the session is deemed to be complete.

Set this to describe whether the response is now complete. For example, if you had a had a multi choice question that required the student to pick at least 3 choices you would emit this event when when 3 choices had been selected.

```javascript
    var event = new CustomEvent('response-changed', {
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
