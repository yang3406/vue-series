const path = require("path");
const webpack = require("webpack");

/* const isDev = process.env.NODE_ENV === 'development'; */

module.exports = {
  entry: path.join(__dirname, "testPack.js"), //入口文件
  output: {
    path: path.join(__dirname, 'dist'),  //文件出口
    filename: "[name]-[chunkhash].js"            //文件名称
  }
}
