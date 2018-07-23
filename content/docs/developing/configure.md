# Configure

The configure package is used to render a configuration ui, that allows a user to update a data model for use with a pie `controller` and `element`.

The configure package should export a custom element so it can be used as follows:  

```javascript
import MyElConfigure from 'my-el-configure';
customElements.defined('my-el-configure', MyElConfigure);
```

> The default export from the configure package should not define a custom element, this will be handled by pie.

## Api

### `set model(m:Object)`

This sets the model on the element, which in turn should render a UI for the given model.

### `Event: 'model.updated'`

This event should be dispatched from the element if the `model` has been updated by the user.

### `Event: 'insert.image'`

This event should be dispatched if the user wishes to insert an image. See [Image Upload](/docs/authoring/uploader) for more information.

> You can used [pie-configure-events](http://github.com/pieelements/pie-configure-events) for the 2 events above.