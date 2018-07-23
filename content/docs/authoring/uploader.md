# Image Upload

> Status: Draft

# Insert Image 

> See [pie-configure-events](https://github.com/pieelements/pie-elements) for information on the events dispatched.


Configure elements dispatch a `'insert.image'` event. The `event.detail` is a handler object with the following api: 

### `cancel()`

Cancels the insert image process. 

### `done(err?: Error, src:string)`

Completes the insert image process, if `err` is present must be an `Error` with information on why the insertion failed. If `src` is present, it will be used as the href for a new `<img>` element.

### `fileChosen(file:File)`

Notifies the handler that the user has chosen a file.

### `progress(percent:number, bytes: number, total:number)`

Notifies the handler that progress has been made on uploading the image.


# Delete Image 

Configure elements dispatch a '`delete.image`' event. The `event.detail` will contain: 

* src - the src of the image
* done - a function with the following type: `(err?: Error) => void`.


