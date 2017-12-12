exports.config = {
  bundles: [
    { components: ['app-chat', 'app-home', 'app-message'] },
  ],
  collections: [
    { name: '@stencil/router' }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
