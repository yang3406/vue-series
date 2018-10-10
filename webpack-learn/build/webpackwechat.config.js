/* 多入口文件打包 */

/**
 * Created by Administrator on 2018\10\9 0009.
 */
const utils = require('./utils')
const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: utils.entries(),
  output: {
    filename: "[name].js",            //文件名称
    path: path.resolve(__dirname, '../dist'), //文件出口
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../src/'),  //从哪里复制
      to: path.resolve(__dirname, '../dist/src'),  //复制到哪里
      //ignore: ['/!.min.js$/', '/!.min.css$/']   //复制以min.js和min.css结尾的文件
      ignore: ['test.css']   //过滤没压缩js
    }])
  ]
}