# File Uploader

> Status: Draft

The File Uploader is provided to Configuration Elements to support uploading of assets that may be needed in a question. 
The details of delivering the file to a storage system are external to the Configuration Element. The page  


## How can I use it?

An `uploader` property is set on the Config Panel Element by the page that contains the Element:


To allow files to be selected and drag-dropped, you need to assign a drop target or a DOM item to be clicked for browsing for files:

    uploader.assignBrowse(document.getElementById('browseButton'));
    uploader.assignDrop(document.getElementById('dropTarget'));

After this, interaction with `uploader` is done by listening to events:

    uploader.on('fileAdded', function(file, event){
        ...
      });
    uploader.on('fileSuccess', function(file, message){
        ...
      });
    uploader.on('fileError', function(file, message){
        ...
      });



## `uploader` API


#### Properties

* `.files` An array of `UploadFile` file objects added by the user (see full docs for this object type below).

#### Methods

* `.assignBrowse(domNodes, isDirectory)` Assign a browse action to one or more DOM nodes.  Pass in `true` to allow directories to be selected (Chrome only).
* `.assignDrop(domNodes)` Assign one or more DOM nodes as a drop target.
* `.on(event, callback)` Listen for event from `uploader` (see below)
* `.upload()` Start or resume uploading.
* `.pause()` Pause uploading.
* `.cancel()` Cancel upload of all `UploadFile` objects and remove them from the list.
* `.progress()` Returns a float between 0 and 1 indicating the current upload progress of all files.
* `.isUploading()` Returns a boolean indicating whether or not the instance is currently uploading anything.
* `.addFile(file)` Add a HTML5 File object to the list of files.
* `.removeFile(file)` Cancel upload of a specific `UploadFile` object on the list from the list.
* `.getFromUniqueIdentifier(uniqueIdentifier)` Look up a `UploadFile` object by its unique identifier.
* `.getSize()` Returns the total size of the upload in bytes.

#### Events

* `.fileSuccess(file, message)` A specific file was completed. `message` is the response body from the server.
* `.fileProgress(file)` Uploading progressed for a specific file.
* `.fileAdded(file, event)` A new file was added. Optionally, you can use the browser `event` object from when the file was added.
* `.filesAdded(arrayAdded, arraySkipped)` New files were added (and maybe some have been skipped).
* `.fileRetry(file)` Something went wrong during upload of a specific file, uploading is being retried.
* `.fileError(file, message)` An error occurred during upload of a specific file.
* `.uploadStart()` Upload has been started on the Resumable object.
* `.complete()` Uploading completed.
* `.progress()` Uploading progress.
* `.error(message, file)` An error, including fileError, occurred.
* `.pause()` Uploading was paused.
* `.beforeCancel()` Triggers before the items are cancelled allowing to do any processing on uploading files.
* `.cancel()` Uploading was canceled.
* `.preparationStart(file)` Started preparing file for upload
* `.preparationProgress(file,ratio)` Show progress in file preparation
* `.preparationComplete(file)` File is ready for upload
* `.catchAll(event, ...)` Listen to all the events listed above with the same callback function.

### `UploadFile` API

#### Properties

* `.uploaderObj` A back-reference to the parent `uploader` object.
* `.file` The correlating HTML5 `File` object.
* `.fileName` The name of the file.
* `.relativePath` The relative path to the file (defaults to file name if relative path doesn't exist)
* `.size` Size in bytes of the file.
* `.uniqueIdentifier` A unique identifier assigned to this file object. This value is included in uploads to the server for reference, but can also be used in CSS classes etc when building your upload UI.


#### Methods

* `.progress(relative)` Returns a float between 0 and 1 indicating the current upload progress of the file. If `relative` is `true`, the value is returned relative to all files in the `uploader` instance.
* `.abort()` Abort uploading the file.
* `.cancel()` Abort uploading the file and delete it from the list of files to upload.
* `.retry()` Retry uploading the file.
* `.bootstrap()` Rebuild the state of a `UploadFile` object, including reassigning chunks and XMLHttpRequest instances.
* `.isUploading()` Returns a boolean indicating whether file chunks is uploading.
* `.isComplete()` Returns a boolean indicating whether the file has completed uploading and received a server response.

