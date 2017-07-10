 
  //auto generated on: Mon Jul 10 2017 10:34:09 GMT+0100 (IST)
  
  module.exports = {
  "module": {
    "rules": [
      {
        "test": /\.css$/,
        "use": [
          "style-loader",
          "css-loader"
        ]
      },
      {
        "test": /\.less$/,
        "use": [
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      },
      {
        "test": /\.(jsx)?$/,
        "use": [
          {
            "loader": "babel-loader",
            "options": {
              "babelrc": false,
              "presets": [
                "/Users/edeustace/dev/github/PieLabs/pie-cli/node_modules/babel-preset-react/lib/index.js"
              ]
            }
          }
        ]
      }
    ]
  },
  "resolveLoader": {
    "modules": [
      "/Users/edeustace/dev/github/PieLabs/pie-website/content/assets/pies/corespring-match/.pie/node_modules",
      "node_modules",
      "/Users/edeustace/dev/github/PieLabs/pie-cli/node_modules",
      "/Users/edeustace/dev/github/PieLabs/pie-cli/node_modules/pie-support-less/node_modules"
    ]
  },
  "context": "/Users/edeustace/dev/github/PieLabs/pie-website/content/assets/pies/corespring-match/.pie",
  "entry": "./controllers.entry.js",
  "output": {
    "filename": "pie-controllers.js",
    "path": "/Users/edeustace/dev/github/PieLabs/pie-website/content/assets/pies/corespring-match",
    "library": "pie-controller-corespring-match",
    "libraryTarget": "umd"
  },
  "resolve": {
    "extensions": [
      ".js",
      ".jsx"
    ],
    "modules": [
      "/Users/edeustace/dev/github/PieLabs/pie-website/content/assets/pies/corespring-match/.pie/.configure/node_modules",
      "/Users/edeustace/dev/github/PieLabs/pie-website/content/assets/pies/corespring-match/.pie/.controllers/node_modules",
      "/Users/edeustace/dev/github/PieLabs/pie-website/content/assets/pies/corespring-match/.pie/node_modules",
      "node_modules",
      "/Users/edeustace/dev/github/PieLabs/pie-cli/node_modules",
      "/Users/edeustace/dev/github/PieLabs/pie-cli/node_modules/pie-support-less/node_modules"
    ]
  }
};
  