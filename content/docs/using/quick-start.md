# Quick Start

This is a quick demonstration of how to define, package and render an Assessment Item. 


## Getting Started

To package and view the example Assessment Item we will use the PIE CLI toolkit, this can be installed by using the following command in a terminal window.

```shell
npm install -g pie
```

> `npm` is included as part of the Node.js system. To use the command above you should first download and install node: https://nodejs.org/en/download/

## Download the sample assessment item

In this example, we will use a sample assessment item definition to package and view an item using the PIE CLI. You can run `pie serve` and edit the sample definition files and see the changes come through in the browser.

* [Download this zip file](/pie-website/assets/demo-item.zip)
* extract the zip
* open a terminal in the directory of the extracted zip.

Or run the following script:

```bash 
mkdir pie-item && \
cd pie-item && \
curl http://pielabs.github.io/pie-website/assets/demo-item.zip -o demo-item.zip && \
unzip demo-item.zip && \
rm -rf demo-item.zip
```

## Packing the item 

This will generate the javascript code needed to render the assessment item.

It will also build a sample html file for loading the item in a browser.


```bash
pie pack --includeComplete
```

## Previewing the item 

This will launch a server and you will be able to view the assessment item by opening the url:

`http://localhost:4000`

The example includes a control panel which allows you to modify the environment properties for viewing the item (for entering or evaluating a response for example.)


```bash
pie serve 
# then go to http://localhost:4000
```
