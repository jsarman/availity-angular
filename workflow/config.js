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
  regex: {
    JSHINT: /([\/][\*][\s]*jshint\s.+[\*\/])/g,
    GLOBAL: /([\/][\*][\s]*global\s.+[\*\/])/g,
    VERSION: /(availity.VERSION = ')(v\d+.\d+.\d+)(')/g
  },
  readme: {
    src: ['docs/readme/readme.config.md'],
    name: 'README.md',
    dest: './'
  },
  js: {
    src: 'lib/**/*.js',
    srcAll: ['gulpfile.js', 'gulp/**/*.js'],
    jshintrc: 'lib/.jshintrc',
    specs: 'lib/**/*-spec.js',
    reportsDir: path.join(__dirname, '..', 'reports')
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
    dest: 'build/js',
    // dest: 'build/guide/js',
    jshintrc: 'lib/.jshintrc'
  },
  docs: {
    all: {
      src: [
          'docs/guide/pages/*.html',
          'docs/guide/pages/examples/*.html',
          'lib/**/docs/*-demo.html'
      ]
    },
    js: {
      name: 'docs-demos.js',
      src: [
          'docs/guide/js/index.js',
          'lib/**/docs/*-demo.js'
      ],
      dest: 'build/js'
      // dest: 'build/guide/js'
    },
    jsTemplates: {
      src: 'lib/**/docs/*-template.html',
      dest: 'build/templates'
      // dest: 'build/guide/templates'
    },
    partials: {
      src: 'docs/guide/templates/partials/*.hbs',
      targets: 'docs/guide/templates/partials/**/*.hbs'
    },
    templates: {
      src: './docs/guide/templates',
      targets: 'docs/guide/templates/**/*.hbs',
      extension: '.hbs'
    },
    dest: 'build'
    // dest: 'build/guide'
  },
  test1: {
    src: [
        'node_modules/sinon/pkg/sinon.js',
        'bower_components/jquery/dist/jquery.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-sanitize/angular-sanitize.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'bower_components/lodash-compat/lodash.js',
        'bower_components/select2/select2.js',
        'bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.js',
        'bower_components/moment/moment.js',
        'bower_components/jquery.inputmask/dist/inputmask/jquery.inputmask.js',
        'bower_components/angular-shims-placeholder/dist/angular-shims-placeholder.js',
        'bower_components/tracekit/tracekit.js',
        'test/index.js',
        'test/matchers.js',
        'test/helpers.js'
    ]
  },
  tests: {
    src: [
            'specs.js', {
              pattern: path.join(__dirname, '..', '/lib/**/*-spec.js'),
              included: false,
              served: false,
              watched: true
            },

        '../../test/matchers.js',
        '../../test/helpers.js'
        ],
        jshintrc: 'test/.jshintrc'
  },
  lib: {
    name: 'availity-angular.js',
    src: [],
    specs: './lib/core/**/*spec.js',
    destDist: './dist',
    destMaps: './maps', // this is relative path to the destDist above,
    dest: 'build/js',
    // dest: 'build/guide/js',
    jshintrc: 'lib/.jshintrc'
  },
  ui: {
    name: 'availity-angular-ui.js',
    src: [],
    specs: './lib/ui/**/*spec.js',
    destDist: './dist',
    destMaps: './maps', // this is relative path to the destDist above,
    dest: 'build/js',
    // dest: 'build/guide/js',
    jshintrc: 'lib/.jshintrc'

  },
  packages: {
    src: ['./package.json', './bower.json']
  },
  sync: {
    src: 'build'
  }
  // deploy: {
  //   src: './build',
  //   dest: '../availity-web/projects/' + pjson.name
  // }
};
