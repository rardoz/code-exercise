const
    webpack = require('webpack'),
    glob = require('glob'),
    ENV = process.env.NODE_ENV || 'development',
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HappyPack = require('happypack'),
    OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
    path = require('path'),
    compiledFiles = './src/spas/**/index.js',
    modules = { main: ['babel-polyfill', './src/index.js'] }


//code splitting
global.BUNDLE_HELPER = require('./src/utils')

glob.sync(compiledFiles)
  .forEach((file)  => {
    modules[BUNDLE_HELPER.path(file.replace('/index.js', ''))] = file
  })

module.exports = {
    entry: modules,
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name]/index.js'
    },
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
        },
        contentBase: './dist',
        historyApiFallback: {
            index: 'index.html'
          },
    },
    devtool: 'source-map',
    module: {
        loaders: [{
          test: /\.js$/,
          include: [
            path.resolve(__dirname, 'src')
          ],
          exclude: /(\.font\.js|node_modules)/,
          loaders: ['happypack/loader?id=js']
        },
        {
          test: /\.svg$/,
          exclude: /node_modules/,
          loaders: ['happypack/loader?id=svg']
        },
        {
          test: /\.json$/,
          use: 'json-loader'
        },
        {
          test: /\.font\.js$/,
          include: [
            path.resolve(__dirname, 'src')
          ],
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader?sourceMap',
              `webfonts-loader?${JSON.stringify({
                fontName: 'best-font-ever',
                fixedWidth: true
              })}`
            ]
          })
        },
        {
          test: /(\.scss|\.css)$/,
          use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'happypack/loader?id=sass' })
        }]
      },
      resolve: {
        modules: ['src', 'node_modules']
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new ExtractTextPlugin('[name]/styles.css'),
        new HappyPack({
          cacheContext: {
            env: ENV
          },
          tempDir: '/tmp/happypack-js',
          // threadPool: new HappyPack.ThreadPool({ size: 1 }),
          id: 'js',
          loaders: [
            // 'react-hot-loader',
            'babel-loader'
          ]
        }),
        new HappyPack({
          cacheContext: {
            env: ENV
          },
          tempDir: '/tmp/happypack-svg',
          // hreadPool: new HappyPack.ThreadPool({ size: 1 }),
          id: 'svg',
          loaders: [
            // 'react-hot-loader',
            `babel-loader!react-svg-loader?${JSON.stringify({
              svgo: {
                // svgo options
                plugins: [{ removeTitle: false }],
                floatPrecision: 3
              }
            })}`
          ]
        }),
        new HappyPack({
          cacheContext: {
            env: ENV
          },
          tempDir: '/tmp/happypack-sass',
          // threadPool: new HappyPack.ThreadPool({ size: 1 }),
          id: 'sass',
          loaders: [
            'css-loader?sourceMap',
            'sass-loader?sourceMap',
            'postcss-loader?sourceMap'
          ]
        })
      ]
    }
    
    if (ENV === 'production') {

      module.exports.plugins.push(
         new OptimizeCSSAssetsPlugin({
           assetNameRegExp: /\.css$/,
           cssProcessorOptions: { discardComments: { removeAll: false } }
         })
      )
    }