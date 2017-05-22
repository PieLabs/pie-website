# Packaging Items


The `config.json` and `index.html` files, along with other assets such as media files make up the definition of an Assessment Item.

For this Item to be presented in a browser the Javascript code for rendering the PIE Custom Elements and Controller logic needs to be assembled.

The [PIE CLI](https://github.com/PieLabs/pie-cli) has a `pack` command that will package and assemble the PIE code and all dependencies needed for rendering. 

```bash
pie pack
```

```bash
pie help pack # to see options
```

When an Assessment Item is packaged the packaging tool adds the following javascript files to the item definition by default: 

| File              | Description                                                        |
|-------------------|--------------------------------------------------------------------|
| `pie-view.js`       | Assembled Javascript for rendering the UI for the Assessment Item  |
| `pie-controllers.js` | Packaged controller code for the PIEs defined in the config        |
| `pie-configure.js` | Packaged configuration UI for the PIEs (if defined).        |



## Packaging example item 

The `pie` cli has a flag `-C --include-complete` that will additionally add the following files to the packaged item:

| File              | Description                                                        |
|-------------------|--------------------------------------------------------------------|
| `pie-item.js`            | defines a custom element: `pie-item` that contains view, controller and model internally.     |
| `example.html`            | markup that renders `<pie-item></pie-item>`      |


`pie-item.js` is provided to allow simple rendering in HTML and does not require any server-side rendering capability. See [rendering items](rendering-items.md)


## Distributing Items

When sharing PIE Assessment Items between systems, the best practice is to share them in their packaged form (including the basic definition and assets along with the assembled javascript code). The system receiving the items may choose to re-package if necessary using the basic item definition.


Example:

```bash
  config.json
  index.html
  pie-item.js
  pie-view.js
  pie-controllers.js
  pie-configure.js
  picture-one.png
  ...
```

> Extra metadata that may (and should) be included with an Assessment Item is outside the scope of the PIE project.



## Advanced Packaging - Code Reuse

> Note: The `manifest` command is currently disabled and under review.

If you are packaging a lot of assessment items, you can optimize the process by reusing the same javascript code for items that use the same sets of `pies`.

When you pack an Assessment Item there are 2 files generated that are reusable, `pie-view.js` and `pie-controller.js`. This is because they contain logic only related to the `pies` used by the item. They don't contain any logic relating to the item itself. 

If we have 1 assessment item that has: 

```javascript
{
  "elements": {
    "my-pie": "1.0.0"    
  },
  "models": [
    {
      "id": "1",
      "element": "my-pie",
      prompt: "question 1"
    }
  ]
}

```

And another that has:

```javascript
{
  "elements": {
    "my-pie": "1.0.0"    
  },
  "models": [
    {
      "id": "1",
      "element": "my-pie",
      prompt: "question 1"
    },
    {
      "id": "2",
      "element": "my-pie",
      prompt: "question 2"
    }
  ]
}
```

Both of these assessment items use `my-pie@1.0.0`, so the `pie-view.js` + `pie-controller.js` built for question 1 would work for question 2. 

The PIE cli tool provides a command to help with reusing generated code:

`pie manifest [item directory, defaults to current directory] --outfile myManifest.txt`

Writes a JSON file which includes a unique hash ID that represents the PIEs (and their versions) that are included in the config.
Using this ID you can store generated code by ID and reference to see if it has already been created before packing a new item.






