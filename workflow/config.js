var path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var pjson = require('../package.json');

module.exports = {
  args: {
    verbose: !!argv.verbose,
    environment: process.env.NODE_ENV || 'development'
  },
  project: {
    path: path.resolve(__dirname, '..')
  },
  readme: {
    src: ['docs/readme/readme.config.md'],
    name: 'README.md',
    dest: './'
  },
  js: {
    src: ['gulpfile.js', 'gulp/**/*.js'],
    jshintrc: '.jshintrc'
  },
  app: {
    src: 'lib/core/index.js',
    dest: './build' // webpack requires absolute paths
  },
  // vendor: {
  //   src: 'project/app/vendor.js',
  //   dest: './build'
  // },
  polyfill: {
    name: 'polyfill.js',
    src: [
      'bower_components/html5shiv/dist/html5shiv.min.js',
      'bower_components/respond/dest/respond.min.js'
    ],
    dest: './build/js'
  },
  markup: {
    src: 'lib/core/index.html',
    dest: './build'
  },
  templates: {
    name: 'availity-angular-ui-templates.js',
    src: './lib/**/*-tpl.html',
    destDist: './dist',
    destMaps: './maps', // this is relative path to the destDist above,
    dest: 'build/guide/js',
    jshintrc: 'lib/.jshintrc'
  },
  // tests: {
  //   src: [
  //     'specs.js',
  //     {
  //       pattern: path.join(__dirname, '..', '/project/app/**/*-spec.js'),
  //       included: false,
  //       served: false,
  //       watched: true
  //     }
  //   ]
  // },
  packages: {
    src: ['./package.json', './bower.json']
  },
  sync: {
    src: 'build/guide'
  }
  // deploy: {
  //   src: './build',
  //   dest: '../availity-web/projects/' + pjson.name
  // }
};
