# Client Side API

### IGNORE THIS PAGE! TO BE REMOVED.

The `pie-player` element and the `_pie_controller` object from `controller.js` provide APIs that can be used to work with an Assessment Item.

> the `controller.js` can also be loaded in the 



We should maybe provide a utlility lib for using the controllers server-side.



controllers['pie-name'].model()

controllers.call('pie-name', 'functionname', args);


controllers.call('function-name', ['pie-name', args]);

controllers.get('pie-name','function-name')


controllers: {
    endpoint: '/my-server-endpoint/',
    getController(pieName) => {
        if (endpoint) {
            // 
        }
        controller_map[pieName]
        };
}


GET /endpoint/get-outcome
PUT | GET /endpoint/[pie-name]/model
PUT | GET /endpoint/[pie-name]/outcome