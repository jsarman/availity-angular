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
  test: {
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
  lib: {
    name: 'availity-angular.js',
    src: [
     './lib/core/index.js',
      './lib/core/utils/strings.js',
      './lib/core/utils/uuid.js',
      './lib/core/utils/urls.js',
      './lib/core/utils/throttle.js',
      './lib/core/logger/logger.js',
      './lib/core/logger/logger-config.js',
      './lib/core/polling/polling.js',
      './lib/core/api/api-factory.js',
      './lib/core/api/api-users.js',
      './lib/core/api/api-coverages.js',
      './lib/core/api/api-configurations.js',
      './lib/core/api/api-log-messages.js',
      './lib/core/api/api-documents.js',
      './lib/core/api/api-organizations.js',
      './lib/core/api/api-codes.js',
      './lib/core/api/api-user-permissions.js',
      './lib/core/authorizations/user-authorizations.js',
      './lib/core/session/session.js',
      './lib/core/idle/idle.js',
      './lib/core/idle/idle-interceptor.js',
      './lib/core/validation/validator.js',
      './lib/core/validation/validators/validator-utils.js',
      './lib/core/validation/validators/validator-size.js',
      './lib/core/validation/validators/validator-pattern.js',
      './lib/core/validation/validators/validator-required.js',
      './lib/core/validation/validators/validator-date-range.js',
      './lib/core/validation/validators/validator-date-format.js',
      './lib/core/utils/globals.js',
      './lib/core/analytics/analytics.js',
      './lib/core/analytics/analytics-util.js',
      './lib/core/analytics/analytics-splunk.js',
      './lib/core/analytics/analytics-piwik.js',
      './lib/core/analytics/analytics-exceptions.js',
      './lib/core/utils/date-polyfill.js'
    ],
    specs: './lib/core/**/*spec.js',
    destDist: './dist',
    destMaps: './maps', // this is relative path to the destDist above,
    dest: 'build/js',
    // dest: 'build/guide/js',
    jshintrc: 'lib/.jshintrc'
  },
  ui: {
    name: 'availity-angular-ui.js',
    src: [
      './lib/ui/index.js',
      './lib/ui/templates/template.js',
      './lib/ui/modal/modal.js',
      './lib/ui/validation/form.js',
      './lib/ui/validation/field.js',
      './lib/ui/popover/popover.js',
      './lib/ui/validation/messages.js',
      './lib/ui/validation/adapter-bootstrap.js',
      './lib/ui/validation/adapter.js',
      './lib/ui/dropdown/dropdown.js',
      './lib/ui/datepicker/datepicker.js',
      './lib/ui/idle/idle-notifier.js',
      './lib/ui/mask/mask.js',
      './lib/ui/permissions/has-permission.js',
      './lib/ui/analytics/analytics.js',
      './lib/ui/placeholder/placeholder.js'
    ],
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
