exports.config = {
  bundles: [
    { components: ['my-app', 'app-home', 'app-message'] },
  ],
  collections: [
    { name: '@stencil/router' }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
