# pie-player 

> Pre-release note: Some of these APIs are not finalized and not fully implemented. Will be finalized for release.

## Html

### Custom Element <pie-player>  
This element renders the pies.      
It serves as the main access object for the api described below.
 
 ```
  <pie-player id="my-player"></pie-player>
 ```
    
## Javascript Api
 

#### Setter: `env` 
The player view mode can be set via the env.
 
 ```
 player.env = {view:'gather'}
 ```
  
#### Setter: `session`
The various user inputs are collected in this object.   
The pies can use the session to store session related data like the order of options for example.
     
 ```
  player.session = {value:[]}
 ```
 


#### Setter: `controller`
The controller is used by the player to calculate model changes and outcomes.
 
 ```
  var config = ... //load json
  player.controller = new pie.Controller(config.pies, pie.controllerMap); 
 ```
 
#### Method: `completeResponse()`

 ```
 /**
  * Mark the current session as complete.
  * @returns The method returns a Promise 
  */
  function completeResponse() 
  
 ```

##### Example
 ```
   player.completeResponse().then(function(){
      var isComplete = player.isComplete();
      console.log(isComplete) 
   });
    
   //output 
   true
 ```
 
#### Method: `getOutcome()` 

 ```
  /**
   * Calculate the outcome for the current session.  
   * @returns The method returns a Promise with the outcome 
   */
   function getOutcome() 
   
  ```

##### Example 

  ```
 player.getOutcome().then(function(outcome){
    console.log(outcome);
 });
  
 //output
 {
    summary: { maxPoints: 7, points: 7, percentage: 100 },
    pies: [
       {id: "01", score: {scaled: 1, min: 0, max:7, raw: 7}}
    ] 
 }
 ``` 
 

#### Method: `getSessionStatus()`

```
  /**
   * Get the status of the session
   * 1. allInteractionsHaveResponse: Boolean 
   * 2. interactionCount: Number
   * 3. interactionsWithResponseCount: Number
   * 4. isComplete: Boolean
   * @returns The method returns a Promise with the session status 
   */
   function getSessionStatus() 
   
  ```

##### Example 
 ```
    player.getSessionStatus().then(function(sessionStatus){
      console.log(sessionStatus);
    });
     
    //output
    {
      status: {
        allInteractionsHaveResponse: true,
        interactionCount: 2,
        interactionsWithResponseCount: 2,
        isComplete: true,
      },
      session: {...}
    }
      
  ```

#### Method: `isComplete() `


  ```
  /**
   * Is the session complete
   * @returns The method returns a Promise with the value of isComplete 
   */
   function isComplete() 
   
  ```

##### Example 
  ```
    player.isComplete().then(function(isComplete){
      console.log(isComplete);
    })
    
    //output
    false 
  ```

#### Method: `reset()` 
  ```
  /**
   * Reset the session, as if it is loaded for the first time.    
   * This includes everything stored in the session, including stashed orders.
   * @returns The method returns a Promise
   */
   function reset() 
  ```

##### Example 

  ```
    player.reset().then(function(){
       console.log("session has been reset");
    });
  ```

        
#### Method: `resetResponse()` 
  ```
  /**
   * Reset all the changes a user has done to the interactions.   
   * This is different from player.reset() in that it doesn't reset other things, 
   * that have been stored in the session, eg. a random order of multiple choice options    
   * @returns The method returns a Promise
   */
   function resetResponse() 
  ```
##### Example 
  
  ```
    player.resetResponse().then(function(){
       console.log("responses have been reset");
    });
  ```
 
#### Method `getLanguages()`

Return an array of languages available for the assessment item.
Using this information a developer loading a PIE Item can decide to switch the language to the user's locale or offer buttons to do this. 


### Events

#### Event: `pie-player-ready` (bubbles=true) 
This event is dispatched, when the api of a pie-player is ready to be used.   
    
 ```
 document.addEventListener('pie-player-ready', function(){
    var player = event.target;
    player.env = env;
    player.session = session;
    player.controller = controller;
    player.addEventListener(...)
 });
 ```

#### Event: `response-change` (bubbles=true)
The event is dispatched, whenever the status of the current response has changed, eg. when a question is loaded, when the user interacts with a question, when a session is reset.
The event.detail contains a sessionStatus object    

 ```
  player.addEventListener('response-change', function(evt){
     console.log(evt.detail.sessionStatus); 
     
     //output
      {
        status: {
          allInteractionsHaveResponse: true,
          interactionCount: 2,
          interactionsWithResponseCount: 2,
          isComplete: true
        },
        session: {...}
      }
  });
  ```
   

