# Quick Start

This is a quick demonstration of how to define, package and render an Assessment Item. 


## Getting Started

To package and view the example Assessment Item we will use the PIE CLI toolkit, this can be installed by using the following command in a terminal window.

```shell
npm install -g pie
```

> `npm` is included as part of the Node.js system. To use the command above you should first download and install node: https://nodejs.org/en/download/

## Defining an Assessment Item

In this example, we will use a sample assessment item definition to package and view an item using the PIE CLI. You can edit the sample definition and run the the packaging step again to view changes.

Download these item definition files and save them in a directory on your system.

> [config.json](demo-item/config.json)

> [index.html](demo-item/index.html)



## Packaging the Example

In a terminal, cd into the directory in which you downloaded the sample files above. Then run the following command:

```pie pack```

This will generate the javascript code needed to render the assessment item.

It will also build a sample html file for loading the item in a browser.


## Viewing the Example

To view the assesment item, you can then run the command:

```pie serve```

In the same directory.

This will launch a server and you will be able to view the assessment item by opening the url:

`http://localhost:4000`

The example includes a control panel which allows you to modify the environment properties for viewing the item (for entering or evaluating a response for example.)




