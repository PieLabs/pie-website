# Packaging

PIEs are defined as NPM packages.

> The package definition is contained in `package.json` see [npm documentation](https://docs.npmjs.com/files/package.json) for full documentation on npm packages.

There are up to 3 parts that make up a pie:

| Name | Description | Required? |
|----------------------------|----|--|
| `element` | the custom element that renders in an assessment context | yes |
| `controller` | the logic for preparing the data model for the `element` | no|
| `configure` | the custom element that renders a configuration ui for editing the data model. | no|


### Internal vs External components

A pie may define external or internal packages for `element`, `controller` and `configure` (or any combination thereof).

#### Defining external components

* add a dependency declaration to the npm package you want to use.
* add a `pie` object to the package.json and within that map either `element`, `controller` or `configure` to the dependency.

Here is an example: 

```javascript
{
  "name" : "foo",
  "dependencies" : {
    "my-el" : "^1.0.0",
    "my-controller" : "^1.0.0",
    "my-configure" : "^1.0.0"
  },
  "pie" : {
    "element" : "my-el",
    "controller" : "my-controller",
    "configure" : "my-configure"
  }
}
```

With the above this pie will use `my-el` as the element, `my-controller` as the controller and `my-configure` as the configure element.

#### Defining internal components

To define internal components you add the source directly to the package.
* for `element` add it to the npm root package
* for `controller` and `configure` add a 'controller' or 'configure' directory (which should also be an npm package) and add the source within that.

Your directory structure will look like this: 

```bash
foo/
  package.json
  configure
    package.json
    src/ #configure src here
  controller/
    package.json
    src/ #controller src here
  src/ # element src here
```

> Don't forget to set the `main` key in your package.json files to point to your npm package's entry point.

> When using internal packages for controller and configure, the name in their package.json files must be `${mainPackageName}-${controller|configure}`.

#### Defining a combination

You can mix the two techniques above when defining your pie. If you only want to use an external `element` package, but keep `configure` and `controller` internal, you can do the following: 

```javascript
{
  "name" : "foo",
  "dependencies" : {
    "my-el" : "1.0.0"
  },
  "pie" : {
    "element" : "my-el"
  }
}
```

```bash
foo/
  package.json
  configure # internal configure package 
    package.json
    src/ #src here
  controller/ # internal controller package
    package.json
    src/ #src here
  # no need for element logic - we use an external package
```

## Demo directory 

It is useful to add a demo pie item to your package. By default pie expects this to be in `docs/demo`. The demo pie item should consist of: 

* index.html - the markup for the item
* config.js OR config.json - the data for the item

See [defining items](/docs/using/defining-items/) for information on how to define a pie item.

## Schema directory

It is useful to add a schema directory. By default pie expects this to be in `docs/schemas`.

> Note: There may be changes coming in how one defines a schema and how it is validated.

