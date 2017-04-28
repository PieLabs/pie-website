## Summary
summary

## Table of Contents
[Table of Contents]: #table-of-contents
* [Summary](#summary)
* [Table of Contents]
* [PIE Components]
* [PIE Roadmap]


## PIE Components

PIE cli
PIE Player 
PIEs - Interactions and Tools
PIE TDS - reference systems and libraries that will 

## PIE Roadmap


# Interactions

Build a suite of Open Source interaction types

# Tools, Utilities, Accessibility 

Build a set of Open Source Custome Elements for delivering accessiblity requirements.




# Draft PIE Authoring Proposal

Developers can create configuration panels for PIEs that allow content authors to configure interactions. This capability will be made available in a similar style to how PIEs are developed.


- A Custom Element that renders a configuration panel can be created by a developer as an ES6 Javascript module and ES6 Imports.
- The configuration module is a standard independent NPM package
- A property added to the `package.json` will define which PIE(s) and version(s) (semver) the configuration module targets
- If a configuration module package is included within a PIE in an `configure` directory, the `pie info` command will load the package when previewing a PIE. Alternatively a 

## Handling File Uploads

> We need to do some prototyping on this to determine the best API.

The Configuration Panel itself does not upload files to a server. It can can emit an Event with a FileReader object

TODO: how best to handle this?
Can use FileReader, but upload might need to be chunked for large files, could...
- have Configure Element emit an event with a `File` or `File[]` and get a `Progress` reader object property set back? 

- An Open Source utility Custom Element for select/drop upload will be made available. Similar to `https://customelements.io/winhowes/file-upload/`




Authoring module can be packaged as am independent NPM package, with definitions of what PIEs it supports.
This package can be included within a PIE in `authoring` directory.

PIE Author Element
This Element, similar to the PIE player
Asset Uploader


# Packaging and Delivery

Optimization
- Support tree-shaking
Switch to Yarm

# Test Delivery

Reference Implementation
