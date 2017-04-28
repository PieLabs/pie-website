# PIE Authoring

> Status: Draft

PIE Interaction developers can create configuration panel UI that allow content authors to configure interactions. 


- A Custom Element that renders a configuration panel can be created by a developer as an ES6 Javascript module.
- The configuration module is a standard independent NPM package, it may be included within a pie in a `configure` directory.
- the PIE cli `pie info` command will load the package when previewing a PIE. 

## Handling File Uploads

An uploader property will be set on the Config Panel Element that supports handling user file uploads.

See the [Uploader API](uploader.md)


