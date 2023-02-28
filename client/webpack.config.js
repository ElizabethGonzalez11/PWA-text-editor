const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },

    plugins: [

    /*
      TODO:

      We need to configure some plugins for Wepack to use. They 
      have already been required in above.
      When all three plugins are configured this work is done.
    */
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'J.A.T.E'
      }),

      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js'
      }),

      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E',
        description: 'A PWA web application for text editing. Load in the browser, save to the machine, and edit text anywhere.',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons')
          }
        ]
      })   

    ],

    module: {
      rules: [

        /*
          TODO: In this array, we need to configure the rules 
          for when Webpack should "bundle-ize" our files. Each rule 
          is an object. We will be setting up two rules. 
          
          You will find both rules in the solutiom for the mini 
          project. 

          When you copy and paste them below, you'll be done here.
        */
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            // babel-loader is used in order to use ES6.
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
              },
            },
          }
      ],
    },
  };
};