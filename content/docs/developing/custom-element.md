# Custom Element

The user interface for a PIE is provided in the browser by a [Custom Element](https://www.w3.org/TR/custom-elements/).

It should be defined in an ES6 module which is included as the main entry point the package (see [Packaging](packaging.md))

> The most basic definition of an Element module is an ES6 module (CommonJS is also supported).
> For information on developing and building your Custom Element module with framework support see [Using Modules](using-modules.md)


```javascript
export default class MyPie extends HTMLElement {

  constructor() {
    super();
    this._model = null;
    this._session = null;
    this._env = null;
  }

  set model(m) {
    this._model = m;
  }

  get session() {
    return this._session;
  }

  set session(s) {
    this._session = s;
  }

  set env(e) {
    this._env = e;
  }

  connectedCallback() {
    // the pie-player will capture this event and set the model and session properties
    this.dispatchEvent(new CustomEvent('pie.register', { bubbles: true }));   
  }
}
```


The Element receives properties that are set by the PIE Player and may emit events to communicate out to the Player.


### Reserved Element Properties

As a developer of a PIE, you can define the configuration model for your Custom Element and the properties it will receive. However the two properties `model` and `session` are reserved. They will be set by the `pie-player` in the client and should not be defined as part of your configuration model.

#### `model`

If you provide a controller with your PIE, then your controller will be called to set this property on your Custom Element, see [Controller](./controller.md).

The controller is passed the complete configuration defined for the assessment item, along with the user's session data, and current [Environment](./environment.md) properties.

This allows you to set the model to an appropriate state based on the current settings. For example if in the `environment` property the `view` was set to `evaluate` you would need the correct responses to a question available in your model so your Custom Element can display information about the responses. Or if the environment indicated that the current user had certain accessibility requirements, you can modify the model to support those.



#### `session`

The session property represents the state of a user's interaction with the PIE. If a setter is provided in the Custom Element this property will be set by the PIE player when loading an assessment item. 

The Element can modify this object and should emit a `sessionChanged` event (see below) when it does so, so that if need be the session response may be persisted.

As with `model` the structure of this data is entirely up to the developer of the PIE that uses it.

#### `env`

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


### `pie.register` Event (required)

A PIE should emit this event when the Custom Element is connected in the DOM. This event is handled by the PIE Player which will then set the `model` and `session` properties on the element.


###  `pie.responseComplete` (optional)

This event should be emitted if the data captured from a user (stored in `session` property) is sufficient to consider the response complete.

For example, if you had a had a multi choice question that required the student to pick at least 3 choices you would emit this event when when 3 choices had been selected.


```javascript
    var event = new CustomEvent('pie.responseComplete', {
      bubbles: true
    });

    this.dispatchEvent(event);
```

###  `pie.responseChanged`  (optional)

This event should be emitted when the user respose has been modified, but not necessarily completed. 
Typically, the system hosting the Item using your PIE would be expected to persist the modified session upon receving this event.

```javascript
    var event = new CustomEvent('pie.responseChanged', {
      bubbles: true
    });

    this.dispatchEvent(event);
```




### Brower Support

Custom Elements are natively supported in Chrome and are available in other browsers via a polyfill. (Firefox = In development,  and Webkit = done - Dec 2016)
