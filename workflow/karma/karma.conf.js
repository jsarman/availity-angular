var webpack = require('webpack');
var webpackConfig = require('../webpack/webpack-config');
var BowerWebpackPlugin = require('bower-webpack-plugin');
var _config = require('../config');

webpackConfig.cache = true;
webpackConfig.module.postLoaders = [{
  test: /\.js$/,
  exclude: /(-spec|node_modules|bower_components)/,
  loader: 'istanbul-instrumenter'
}];

// Dynamically build preprocessors instructions from config.js
var _preprocessors = {};
_preprocessors['specs.js'] = ['webpack', 'sourcemap'];
_preprocessors[_config.js.specs] = ['webpack', 'sourcemap'];

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: _config.tests.src,
    preprocessors: _preprocessors,
    webpack: {
      output: {
        pathinfo: true
      },
      resolve: webpackConfig.resolve,
      module: webpackConfig.module,
      devtool: 'source-map',
      plugins: [
                new webpack.ProvidePlugin({
                  $: 'jquery',
                  jQuery: 'jquery',
                  'window.jQuery': 'jquery',
                  _: 'lodash'
                }),
                new BowerWebpackPlugin({
                  excludes: [
                      /.*\.(less|map)/,
                      /glyphicons-.*\.(eot|svg|ttf|woff)/,
                      /bootstrap.*\.css/,
                      /select2.*\.css/
                  ]
                })
            ]
    },
    webpackServer: {
      noInfo: true,
      quiet: false,
      stats: true
    },
    exclude: [
        '*.less',
        '*.html'
    ],
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      dir: _config.js.reportsDir,
      subdir: function(browser) {
        return browser.toLowerCase().split(/[ /-]/)[0];
      },
      reporters: [{
        type: 'text',
        file: 'text.txt'
      }, {
        type: 'text-summary',
        file: 'text-summary.txt'
      }, {
        type: 'html'
      }]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_DEBUG,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
    plugins: [
            'karma-jasmine',
            'karma-mocha-reporter',
            'karma-spec-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-sourcemap-loader',
            'karma-coverage',
            'karma-webpack',
            'karma-phantomjs-launcher'
        ]
    // List plugins explicitly, since auto-loading karma-webpack won't work here
    // plugins: [
    //     require('karma-jasmine'),
    //     require('karma-mocha-reporter'),
    //     require('karma-spec-reporter'),
    //     require('karma-chrome-launcher'),
    //     require('karma-firefox-launcher'),
    //     require('karma-sourcemap-loader'),
    //     require('karma-coverage'),
    //     require('karma-webpack'),
    //     require('karma-phantomjs-launcher')
    // ]

  });
};
