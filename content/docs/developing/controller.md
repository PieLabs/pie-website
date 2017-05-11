# Controller

The PIE Controller is logic that can be provided by your PIE to set the model for the PIE Element for the user interface and to process a user's session to provide an outcome. 

This module should export two functions, `model` and `outcome`


```javascript

export function model(config, session, env) {
  return new Promise((resolve, reject) => {
    //...
  });
}

export function outcome(config, session, env) {
  return new Promise((resolve, reject) => {
    //...
  });

}
```


## `model(config, session, env): Promise<{}>`

This function builds the `model`  used by the PIE Element to render the ui. Think of it as the ui model. 

The output of this function is dependent on the `pie` and how it builds a ui. The key thing is that this method will only return an appropriate model for the env settings. For example if `env.mode` is `gather` or `view` the returned model should not contain any data that would indicate what the correct response might be.

## `outcome(config, session, env) : Promise<{}>`

The outcome function provides a result of the user's interaction with the PIE

The result should have the following properties; 

| Property   | Type    | Description                                                          | Required |
|------------|---------|----------------------------------------------------------------------|----------|
| score      | number  | The score between 0.0 - 1.0 for the session                          | Optional |
| completed  | Boolean | Indicates whether or not the Activity was completed.                 | Optional |
| extensions | Object  | <draft> xAPI style extension to Object model for outcome             | Optional |


## parameters 

Both methods share the following parameters.

### config

This is the definition of the question/configuration for the question as provided by the author using the PIE to create an interaction or question.

It is up to you as the PIE developer to define what the structure of this object should be based on the needs of the interaction type.


### session

This is the state of a users' response/interaction with the PIE. The PIE developer defines the structure of this object and uses it to store user responses or other data about the user's interaction.

### env

This object provides parameters that describe the current context in which a user is using the PIE.

See [environment](environment.md) page for more information.
