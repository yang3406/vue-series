/* 多入口文件打包 */

/**
 * Created by Administrator on 2018\10\9 0009.
 */
const utils = require('./utils')
const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //只支持webpack4 该插件用于将css提取到单独的文件 为每个包含css的JS文件创建一个css文件
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //对css优化
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //css优化话 对css打包 不会内嵌到js bundle中

module.exports = [{
  mode: 'production', // production  webpack会根据mode进行对Js打包，development压缩，production下面自动压缩
  devServer: {  //配置webpack-dev-server  要全局安装才生效 
    contentBase: './dist',//默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器 
    port: '8383',//监听端口
    inline: true,//设置为true，当源文件改变的时候会自动刷新
    historyApiFallback: true,//在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    hot: true//允许热加载
  },
  entry: utils.entries(),
  output: {
    filename: "[name].js",            //文件名称
    path: path.resolve(__dirname, '../dist'), //文件出口
  },
  module: {
    rules: [
      {
        test: '/\.js$/',
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      /** { 
        test: '/\.css$/',
        use: [{
          loader: 'style-loader!css-loader'//webpack需要css-loader对css文件进行处理，才能进行打包等操作
          // 首先也是用正则选取要处理的css文件，然后loader字段中，配置了从右往左执行的loader，也就是说先找到css文件，然后对其执行css-loader出路，css-loader处理完了，将文件扔给style-loader处理，这里用到的style-loader的作用是将文件引入都页面中，也就是把这个处理好的css文件link进html页面中 
        }
        ]
      }
   */
      /* {
        test: '/\.css/',
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
        include: [
          path.resolve(__dirname)
        ]
      }, */
      /* {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: { loader: 'style-loader' },
          //publicPath: '../src',
          use: {
            loader: 'css-loader',
            options: { minimize: true }
          }
        })
      }, */
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../src/'),  //从哪里复制
      to: path.resolve(__dirname, '../dist/src'),  //复制到哪里
      ignore: ['*.css']
      //ignore: ['/!\.min\.js$/', '/!\.min\.css$/']   //复制以min.js和min.css结尾的文件 没生效
    }]),
    new CleanWebpackPlugin(
      ['dist'], //删除匹配的文件   要安装webpack-dev-server才生效
      {
        root: path.resolve(__dirname, '../'),      //根目录
        verbose: true,        　　　　//开启在控制台输出信息
        dry: false,        　　　　　　//flase启用删除文件 true不删除文件
        exclude: ['test.html']  //排除他不删除
      }
    ),
    /* new MiniCssExtractPlugin({ //提取html中css代码到单独文件  http://wangweilin.net/static/pages/npm_minicssextractplugin.html
      filename: "../dist/src/min.css",
      chunkFilename: "[id].[hash].css",
    }), */
    /* new HtmlWebpackPlugin({ //压缩html
      minify: {
        collapseWhitespace: true //折叠空白区域 也就是压缩代码
      },
    }) */
  ],
},
{
  entry: utils.cssentries(),
  output: {
    filename: "[name].css",            //文件名称
    path: path.resolve(__dirname, '../dist'), //文件出口
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: { loader: 'style-loader' },
        use: {
          loader: 'css-loader',
          options: { minimize: true }
        }
      })
    },]
  },
  plugins: [
    //压缩单独的css  这里主要要npm install extract-text-webpack-plugin@next --save-dev
    new ExtractTextPlugin({
      filename: '[name].css',
      /* filename: (getPath) => {
        console.log("999999999999999");
        return getPath('css/[name].css').replace('css/js', 'css');
      }, */
      allChunks: false,
    }),
    // 用于优化css文件
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        safe: true,
        autoprefixer: { disable: true }, // 这里是个大坑，稍后会提到
        mergeLonghand: false,
        discardComments: {
          removeAll: true // 移除注释
        }
      },
      canPrint: true,
    }),
  ]
}
]
//UglifyJsPlugin插件