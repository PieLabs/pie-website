# Controller

The PIE Controller is logic that can be provided by your PIE to set the model for the PIE Element for the user interface and to process a user's session to provide an outcome. 

This module should export two functions, `model` and `outcome`


```javascript

export function model(config, session, env) {
    ...
}

export function outcome(config, session, env) {

}
```

### Function: model(config, session, env)

This function is used to set the `model` property on the PIE Element. 

It receives three objects as its arguments: **config**, **session**, and **[env](environment.md)**

#### Object: config

This is the definition of the question/configuration for the question as provided by the author using the PIE to create an interaction or question.

It is up to you as the PIE developer to define what the structure of this object should be based on the needs of the interaction type.



#### Object: session

This is the state of a users' response/interaction with the PIE. The PIE developer defines the structure of this object and uses it to store user responses or other data about the user's interaction.

#### Object: env

This object provides parameters that describe the current context in which a user is using the PIE.

See [environment](environment.md) page for more information.



### Function: outcome(config, session, env)

The outcome function provides a result of the user's interaction with the PIE

The model for the `outcome` should be:


| Property   | Type    | Description                                                          | Required |
|------------|---------|----------------------------------------------------------------------|----------|
| score      | Object  | The score attained for the session                                   | Optional |
| success    | Boolean | Indicates whether or not the attempt on the Activity was successful. | Optional |
| completed  | Boolean | Indicates whether or not the Activity was completed.                 | Optional |
| duration   | String  | ISO 8601 with a precision of 0.01 seconds. Period of time over which the interaction occurred.               | Optional |
| extensions | Object  | <draft> xAPI style extension to Object model for outcome             | Optional |


The `outcome.score` property has the following model:


| Property | Type   | Description                                                                        | Required    |
|----------|--------|------------------------------------------------------------------------------------|-------------|
| scaled   | Number | number between -1 and 1                                                            | Recommended |
| raw      | Number | Decimal number between min and max (if present, otherwise unrestricted), inclusive | Optional    |
| min      | Number | Decimal number less than max (if present)                                          | Optional    |
| max      | Number | Decimal number greater than min (if present)                                       | Optional    |



