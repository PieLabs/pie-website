# Rendering Items

The PIE [Packaging Tool](packaging-items.md) is used to assemble and package the Javascript and HTML into files needed to render an Assessment Item in the browser.

An Assessment Item packed by the Packaging Tool may have some or all of the following files:

| File              | Description                                                        |
|-------------------|--------------------------------------------------------------------|
| pie.js            | Single file containing all code and config to render the item      |
| config.json       | JSON data that defines the questions & interaction PIEs in an item |
| index.html        | Markup for adding the PIEs to html document                        |
| pie-view.js       | Assembled Javascript for rendering the UI for the Assessment Item  |
| pie-controller.js | Packaged controller code for the PIEs defined in the config        |





## Simple Usage - Client Side Only

The simplest way to load a PIE-formatted item is to use the `pie.js` file. This file includes everything needed to render the item in a user's browser. 

Example:
```html

<!-- all the configuration, javascript and html for rendering 
the assessment item is bundled in pie.js -->
<div id="player-holder"></div>
<script src="pie.js" type="text/javascript"></script>
<script type="text/javascript">
  env = {mode: 'gather'};
  session = [];
  var player = pie.bootstrapPlayer('#player-holder', env, session);
</script>

```

For complete documentation on interacting with the `pie-player` element, see the [PIE Player API](api/pie-player.md)


## Advanced & Server-Side Usage

For finer control over how to use the PIE-formatted assessment item, or to use it in a secure-testing environment where data, including correct-responses, are not sent to the client you can use the other files in a packaged item: `pie-view.js` and `pie-controller.js`

### Client Side Example


The example below renders a single `pie-player` with a client side controller. Using this approach gives you finer grained control over initialization, but all the data for the config is downloaded to the browser. 

```html 
<script src="pie-view.js"></script>
<script src="pie-controller.js"></script>
<!-- we declare a `pie-player` and within that tag is the markup from `index.html` -->
<pie-player>
  <my-pie pie-id="1"></my-pie>
</pie-player>
<script type="text/javascript">
  env = {mode: 'view'};
  session = [];
  function loadJson(path){
    return new Promise((function(resolve, reject){
      //load the json here ...
    }));
  }
  /** listen for the `pie.player-ready` event */  
  document.addEventListener('pie.player-ready', function(event){
    loadJson('config.json').then(config => {
      var player = event.target;
      player.env = env;
      player.session = session;
      /** 
       * instantiate a PieController and assign it to the `pie-player`. 
       * `pie.controllerMap` is where to find the controller map logic.
       */
      player.controller = new pie.PieController(config, pie.controllerMap);
    }).catch(e => throw e);
  });
</script>

```


### Server Side Example


In some cases, such as for secure test delivery, it is desirable to render items using a remote server to run the controller logic provided by the PIEs in an assessment item.  

> Note: For a simple working example of a server implementation, see [this project](https://github.com/PieLabs/pie-remote-controller-demo)

The example below renders a single `pie-player` with a remote controller.

```html 
<script src="pie-view.js"></script>
<script src="pie-remote-controller.js"></script>
<!-- we declare a `pie-player` and within that tag is the markup from `index.html` -->
<pie-player>
  <my-pie pie-id="1"></my-pie>
</pie-player>
<script type="text/javascript">
  env = {mode: 'view'};
  session = [];

  endpoints: {
    model: {
      method: 'POST',
      url: '/model'
    },
    outcome: {
      method: 'POST',
      url: '/outcome'
    }
  }

  function loadJson(path){
    return new Promise((function(resolve, reject){
      //load the json here ...
    }));
  }
  /** listen for the `pie.player-ready` event */  
  document.addEventListener('pie.player-ready', function(event){

      var player = event.target;
      player.env = env;
      player.session = session;
      /** 
       * instantiate a PieController and assign it to the `pie-player`. 
       */
      player.controller = new PieRemoteController(endpoints);
  });
</script>
```


Below is an example of a possible server implementation running as a commonjs node module:

```javascript
const http = require('http');
const pie = require('./pie-controller');
const config = JSON.parse(fs.readFileSync('./config.json'));
const controller = new pie.PieController(config, pie.controllerMap);

let handleError = (res) => {
  return (err) => {
    res.writeHead(500, {'Content-Type' : 'text/plain'});
    res.write(err.toString());
    res.end();
  }
}

server = http.createServer((req, res) => {

  if(req.url === '/model' && req.method === 'POST'){

    //parse session + env from the request body ...
    controller.model(config, session, env)
      .then(model => {
        res.writeHead(200, {'Content-Type' : 'application/json'});
        res.write(JSON.stringify(model));
        res.end();
      }).catch(handleError(res))
  } else if (req.url = '/outcome' && req.method === 'POST'){
    //parse session + env from the request body ...
    controller.outcome(config, session, env)
      .then(outcome => {
        res.writeHead(200, {'Content-Type' : 'application/json'});
        res.write(JSON.stringify(outcome));
        res.end();
      }).catch(handleError(res))
  } else {
    res.writeHead(404)
    res.write('');
    res.end();
  }
}

server.on('listening', () => console.log('server listening...'));
server.listen(process.env.PORT || 5001);

```







