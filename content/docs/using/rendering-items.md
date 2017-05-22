# Rendering Items

The PIE [Packaging Tool](../packaging-items.md) is used to assemble and package the Javascript and HTML into files needed to render an Assessment Item in the browser.

An Assessment Item packed by the Packaging Tool may have some or all of the following files:

| File              | Description                                                        |
|-------------------|--------------------------------------------------------------------|
| config.json       | JSON data that defines the questions & interaction PIEs in an item |
| index.html        | Markup for adding the PIEs to html document                        |
| pie-view.js       | Assembled Javascript for rendering the UI for the Assessment Item  |
| pie-controller.js | Packaged controller code for the PIEs defined in the config        |
| pie-configure.js  | Packaged configure code (if defined) for the PIEs defined in the config        |
| pie-item.js       | Single file containing all code and config to render the item  (`--includeComplete`)    |


## Simple Usage - Client Side Only

The simplest way to preview a `pie` item is to use the `pie-item.js` file that is built when you run `pie pack --includeComplete`. This defines a custom element that contains the `pie-player` and the item's markup and config. 

Example:
```html
<script src="pie-item.js" type="text/javascript"></script>
<pie-item></pie-item>
```

However this view doesn't provide any control over the player, it's really just so you can preview.

## Advanced & Server-Side Usage

For finer control over how to use the `pie` item, or to use it in a secure-testing environment where data, including correct-responses, are not sent to the client you can use the other files in a packaged item: `pie-view.js` and `pie-controller.js`

### Client Side Example

<a href="https://github.com/PieLabs/simple-pie-samples#pie-with-playerhtml" target="_blank">Here</a> is a link to a client side example.

### Server Side Example

In some cases, such as for secure test delivery, it is desirable to render items using a remote server to run the controller logic provided by the PIEs in an assessment item. 

<a href="https://github.com/PieLabs/pie-remote-controller-demo" target="_blank">Here</a> is a link to a server side example. 

> Note: The code below is just for illustration, see the link above for a working sample.


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

  
  player.addEventListener('ready', function(event){
    loadJson('config.json')
      .then(config => { 

        /* someendpoints that our controller can call with sessions/env */ 
        const endpoints = {
          model: {
            method: 'POST',
            path: '/model'
          },
          outcome: {
            method: 'POST',
            path: '/outcome'
          }
        }

        player.controller = new RemoteController(endpoints);
      })
      .then(() => player.env(env))
      .then(() => player.sessions(sessions))
      .catch(e => console.error(e));
  });
</script>
```

Below is an example of a simple server implementation running as a commonjs node module:

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







