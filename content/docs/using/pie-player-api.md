# pie-player 


The `pie-player` is a custom element that simplifies working with a set of rendered pies. 



## Html
 
 ```html
  <pie-player>
    <!-- add your pie elements here... -->
  </pie-player>
 ```
    
## Element Api
 

####  `env(e) : Promise<env>` 

Set the env. The env can contain `{mode: 'gather|view|evaluate'}`. 

* returns a `Promise` with the env object that was passed in.
* if the `Promise` fails the env will not be set.
* setting this propery triggers a call to the PIE's [controller.model](../../developing/controller) function.


```javascript
player.env({view:'gather'})
  .then(() => {
    console.log('the env has been set successfully');
  })
  .catch(e => {
    console.error(e);
  });
```
  
  
#### `sessions(s : [{id, ...}, ...]) : Promise<[]>`

Set the sessions for each `pie` instance defined in the [config json](defining-items). 

When loading an assessment item for a previously saved response this `sessions` object should be set by loading it from a database/storage system. If `sessions` is undefined a new empty `sessions` object will be initialized and passed to the `pie` instances. 


* returns a `Promise` with the sessions array that was passed in.
* if the `Promise` fails the sessions will not be set or passed on to the pie instances.
* setting this propery triggers a call to the PIE's [controller.model](../../developing/controller) function.

     
```javascript
  player.sessions(/* load from server, or don't pass any param to create a new session */ )
    .then((sessions) => console.log('sessions successfully set'))
    .catch(e => console.error(e));
```


####  `set controller`

Set the player controller. The controller brokers passing of requests to the individual controller methods of the `pie` instances. These may be located client-side or on a server. For client-side usage the PIE CLI provides an implementation for client-side controller as part of a packaged item so you do not need to create one. For server-side uses the Framework provides example implementations that you can use to send the requests to a server environment. 

The controller must have the following api: 

* `model(sessions, env) : Promise<model>`
* `outcome(sessions, env) : Promise<outcome>`



```javascript
player.controller = { model: () => { /*...*/}, outcome: () => {/*...*/} }; 
```
 
#### `outcome() : Promise<outcome> ` (optional)

* triggers a call to `controller.outcome`.

If available, this returns the outcome for the the currently rendered `sessions`.
This is for use in non-secure environments, this function may not be available and return an error in some environments. 


```javascript
 player.outcome() 
  .then(o => console.log('got outcome: ', o))
  .catch(e => console.error(e));
```
The outcome object has the form: 
```javascript 
{
  summary: { max: 1, min: 0, score: 1, percentage: 100 },
  pies: [
     {id: '1', score: 1.0},
     //...
  ],
  weights: [
    {id: '1', weight: 1},
    //...
  ]
}
``` 

####  `status() : Promise<status[]>`

Returns the status for the `sessions`. Each `pie` instance updates its status whenever a user changes their response. Using this method you can determine if every interaction that expects a response has one by checking the `complete` property. The status information is also returned in the `sessions-changed` event detail (see below).

returns an array in the form: `[ {id: '1', complete: true|false}, ...]`.

```javascript
player.status()
.then((statuses) => {
    let allComplete = _.find(statuses, s => s.complete !== true).length > 0
    console.log("all interactions are complete?": + allComplete);
})
.catch(e => console.error(e));
```

 
#### `languages() : Promise<string[]>`

TODO!! Return an array of languages available for the assessment item.
Using this information a developer loading a PIE Item can decide to switch the language to the user's locale or offer buttons to do this. 

### Events

#### `ready` 
Dispatched when the `pie-player` instance has mounted. 
    
```javascript
player.addEventListener('ready', () => {
  player.controller = controller;
  player.env(env)
    .then(() => player.sessions(sessions)
    .catch(e => console.error(e));
});
```

#### `sessions-changed`

When this event is emitted it indicates that `sessions` property will have updated state, and is a good time to save the sessions state to store completed user responses or if you want to let the user leave the view and resume later. 

The event `detail` contains an array of statuses for `pie` instances, this the same as returned by `player.status()` method. 

#### `{ detail: [ {id: '1', complete: true|false}, ...] }` 



#### `model-updated`

Dispatched after `controller.model` has successfully returned a model and it's data has been applied to the `pie` instances.

#### `model-update-failed`

Dispatched after `controller.model` has failed. 

> TODO: Is this still required now that we have the 2 functions that can handle `controller.model` failures? aka: `env()` and `sessions()`.
