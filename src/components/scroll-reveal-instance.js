//Stub for React Server Side Render build.
let instance = {
  reveal: () => { }
}

if (typeof window !== "undefined") {
  instance = require('scrollreveal')();
}

export default instance;