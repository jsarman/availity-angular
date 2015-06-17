var webpack = require('webpack');
var path = require('path');

var workflowConfig = require('../config');
var utils = require('./utils');

var pkg = require('../../package.json');

var config = {
    context: path.join(workflowConfig.project.path, 'project/app'),
    entry: {
        index: utils.entry(),
        vendor: ['vendor']
    },
    output: {
        path: utils.output(),
        filename: utils.fileName(),
        hash: utils.isProduction(),
        pathinfo: utils.isDevelopment()
    },
    devtool: utils.maps(),
    debug: utils.isDevelopment(),
    cache: utils.isDevelopment(),
    watch: utils.isDevelopment(),
    resolve: {
        root: [path.join(workflowConfig.project.path, '/lib')],
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.json']
    },
    module: {
        loaders: [{
            test: /[\\\/]lodash\.js$/,
            loader: 'expose?_'
        }]
    },
    plugins: [

        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor'],
            minChunks: Infinity
        }),
        function() {
            this.plugin("done", function(stats) {
                require("fs").writeFileSync(
                    path.join(__dirname, "stats.json"),
                    JSON.stringify(stats.toJson())
                );
            });
        }
    ]
};



if(utils.isProduction()) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      compress: {
        drop_console: true
      },
      output: { comments: false }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  );
}

module.exports = config;