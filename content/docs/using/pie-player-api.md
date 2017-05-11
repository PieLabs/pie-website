# pie-player 

> Pre-release note: Some of these APIs are not finalized and not fully implemented. Will be finalized for release.

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

* triggers a call to `controller.model`.
* returns a `Promise` with the env object that was passed in.
* if the `Promise` fails the env will not be set.

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

Set the sessions for each pie instance. A session must contain at a minimum: `{id, response}`. These will be passed down to the `pie` instances, which will then make changes to the object.

* triggers a call to `controller.model`
* returns a `Promise` with the sessions array that was passed in.
* if the `Promise` fails the sessions will not be set or passed on to the pie instances.

The pies can use the session to store session related data like the order of options for example.
     
```javascript
  player.session([{id: '1', response:[]} ] )
    .then((sessions) => console.log('sessions successfully set'))
    .catch(e => console.error(e));
```

####  `set controller`

Set the controller. The controller must have the following api: 

* `model(sessions, env) : Promise<model>`
* `outcome(sessions, env) : Promise<outcome>`

> The controller will typically delegate down to the `pie` elements' controller module and assemble the results. See a ready to roll implemenation [here](http://todo.ocm).

```javascript
player.controller = { model: () => { /*...*/}, outcome: () => {/*...*/} }; 
```
 
#### Method: `outcome() : Promise<outcome>` 

Return the outcome for the the currently rendered `sessions`.

* triggers a call to `controller.outcome`.

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

Return the status for the `sessions`.

returns an array in the form: `[ {id: '1', complete: true|false}, ...]`.

```javascript
player.status()
.then((statuses) => {
    console.log(statuses);
})
.catch(e => console.error(e));
```


#### `reset() : Promise<?>` 
Reset the `sessions` so that they are like new. For each object in the `sessions` array, remove all properties except `id`.

> TODO: Polish flow here, we only want to complete the reset if the context is happy to proceed. So either: `reset() : Promise<updatedSessions>`, that can then be checked or `reset(predicate) : Promise<?>`, where predicate checks the changes to make sure they are ok for the outer context.

```javascript
    player.reset()
      .then(() => console.log('session has been reset'))
      .catch(e => console.error(e))
```

#### `resetResponse() : Promise<?>` 
Reset the `sessions` so that any user responses have been removed (other data will be retained). For each object in the `sessions` array, remove the `response` field.

> TODO: Polish flow here, we only want to complete the reset if the context is happy to proceed. So either: `resetResponse() : Promise<updatedSessions>`, that can then be checked or `resetResponse(predicate) : Promise<?>`, where predicate checks the changes to make sure they are ok for the outer context.

```javascript
    player.reset()
      .then(() => console.log('session has been reset'))
      .catch(e => console.error(e))
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

#### `model-updated`

Dispatched after `controller.model` has successfully returned a model and it's data has been applied to the `pie` instances.

#### `model-update-failed`

Dispatched after `controller.model` has failed. 

> TODO: Is this still required now that we have the 2 functions that can handle `controller.model` failures? aka: `env()` and `sessions()`.
