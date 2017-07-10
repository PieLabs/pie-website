 
  //auto generated on: Mon Jul 10 2017 10:34:40 GMT+0100 (IST)
  
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
      "/Users/edeustace/dev/github/PieLabs/pie-website/content/assets/pies/corespring-number-line/.pie/node_modules",
      "node_modules",
      "/Users/edeustace/dev/github/PieLabs/pie-cli/node_modules",
      "/Users/edeustace/dev/github/PieLabs/pie-cli/node_modules/pie-support-less/node_modules"
    ]
  },
  "context": "/Users/edeustace/dev/github/PieLabs/pie-website/content/assets/pies/corespring-number-line/.pie",
  "entry": "./controllers.entry.js",
  "output": {
    "filename": "pie-controllers.js",
    "path": "/Users/edeustace/dev/github/PieLabs/pie-website/content/assets/pies/corespring-number-line",
    "library": "pie-controller-corespring-number-line",
    "libraryTarget": "umd"
  },
  "resolve": {
    "extensions": [
      ".js",
      ".jsx"
    ],
    "modules": [
      "/Users/edeustace/dev/github/PieLabs/pie-website/content/assets/pies/corespring-number-line/.pie/.configure/node_modules",
      "/Users/edeustace/dev/github/PieLabs/pie-website/content/assets/pies/corespring-number-line/.pie/.controllers/node_modules",
      "/Users/edeustace/dev/github/PieLabs/pie-website/content/assets/pies/corespring-number-line/.pie/node_modules",
      "node_modules",
      "/Users/edeustace/dev/github/PieLabs/pie-cli/node_modules",
      "/Users/edeustace/dev/github/PieLabs/pie-cli/node_modules/pie-support-less/node_modules"
    ]
  }
};
  