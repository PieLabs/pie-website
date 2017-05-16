module.exports = (config) => {
  return [
    // require("stylelint")(),
    require("postcss-font-magician")({
      variants: {
        'Open Sans': {
          '300': [],// light
          '400': [],// regular
          '700': [] // bold
        },
        'Source Sans': {
          '300': [],// light
          '400': [],// regular
          '700': [] // bold 
        },
        'Source Sans Pro': {
          '300': [],// light
          '400': [],// regular
          '700': [] // bold 
        }
      },
      foundries: ['google']
    }),
    require('lost'),
    require("postcss-cssnext")({
      browsers: "last 2 versions",
      features: {
        customProperties: {
          variables: {
            'header-height': '70px',
            'examples-list-width': '300px',
            'color-text': 'black',
            'color-text-mid': 'rgb(117, 117, 117)',
            maxWidth: '1200px',
            //'unit': '10px',
            'color-primary': '#EE4923',
            'color-primary-dark': '#292b2c',
            'color-primary-light': 'white',
            'color-primary-grey': '#cccccc'
          },
        },
      },
    }),
    require("postcss-reporter")(),
    ...!config.production ? [
      require("postcss-browser-reporter")(),
    ] : [],
  ]
}
