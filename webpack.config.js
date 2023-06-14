const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TsImportPluginFactory = require('ts-import-plugin')
const pkg = JSON.parse(fs.readFileSync(path.resolve('package.json')).toString())

module.exports = (env, options) => {
  return {
    target: 'web',
    entry: {
      'app': path.resolve(__dirname, 'src', 'pages', 'App.tsx')
    },
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'scripts/[name].js',
      publicPath: '/'
    },
    module: {
      rules: [{
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        },
        exclude: /node_modules/
      },  {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'images'
          }
        }]
      }, {
        test: /\.css$/,
        use: [
          options.mode !== 'production' ? 'style-loader' : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
              publicPath: '../'
            }
          },
          'css-loader'
        ]
      }, {
        test: /\.scss$/,
        use: [
          options.mode !== 'production' ? 'style-loader' : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
              publicPath: '../'
            }
          },
          'css-loader', 'sass-loader'
        ]
      }, {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts'
        }
      }]
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin({
        'APP_VERSION': JSON.stringify(pkg.version)
      }),
      new CopyWebpackPlugin({
        patterns: [{
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'dist'),
          filter: (path) => !path.endsWith('index.html'),
          globOptions: {
            ignore: ['index.html']
          }
        }]
      }),
      new HtmlWebpackPlugin({
        title: `${options.mode === 'none' ? '（测试环境）' : ''}${options.mode === 'development' ? '（开发环境）' : ''}`,
        template: path.resolve(__dirname, 'public', 'index.html'),
        filename: 'index.html',
        publicPath: '/',
        hash: true
      }),
      new webpack.DefinePlugin({
        'ENV': JSON.stringify({
          application: {
            name: 'one2three',
            version: pkg.version
          }  
        }),
        'CONFIG': JSON.stringify({
          http: {
            timeout: 180000,
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              'Access-Control-Allow-Origin': '*'
            },
            crossdomain: true,
            baseURL: '/api',
            sourceUrl: '/api/afs/wsd',
            qrcode: 'https://api.one2three.com.cn/code'
          },
        })
      }),
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        // 'antd': path.resolve('node_modules'),
        '@': path.resolve('src'),
        '@scss': path.resolve('src', 'components', 'assets', 'scss')
      }
    },
    optimization: {
      minimize: options.mode === 'production'
    },
    devServer: {
      historyApiFallback: true,
      port: 8088,
      compress: true,
      proxy: {
        '/api': env.local ? {
          target: 'http://127.0.0.1:8980/',
          pathRewrite: { '^/api': '' },
        } : {
          target: 'https://api.endotube.cn',
          secure: false,
          changeOrigin: true
        }
      }
    }
  }
}