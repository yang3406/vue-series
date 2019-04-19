const path = require('path');
const glob = require('glob');

const ROOT_PATH = path.resolve(__dirname, '../'); //获取项目根路径
const SRC_PATH = path.resolve(__dirname, '../src/'); //获取项目src路径
console.log(SRC_PATH + "===========");

const entries = function () {
  let entryEntriesJs = glob.sync(ROOT_PATH + "/*.js");  //读取根目录js文件数组
  let srcPath = glob.sync(SRC_PATH + "/*.js");//读取第一层目录的js文件数组
  let srcSecondPath = glob.sync(SRC_PATH + "/**/*.js");//读取第二层目录的js文件数组
  let map = {};
  var jspaths = [].concat(entryEntriesJs, srcPath, srcSecondPath);
  jspaths.forEach(filePath => {
    /* let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.')); */
    //map[filename] = filePath;
    let filename = filePath.match(/webpack-learn\/(\S*)(.js)$/)[1]; //获取文件在项目中的路径 做为key值 保证打包后的路径和打包前的路径一致 webpack-learn为项目名称
    if (filename != "" && !filename.includes(".min")) {
      map[filename] = filePath;
      //对已经压缩过的文件 做复制处理
    }
  });
  return map;
}

//取css遍历路径
const cssentries = function () {
  let entryEntriesCSS = glob.sync(ROOT_PATH + "/*.css");  //读取根目录css文件数组
  let srcPathCSS = glob.sync(SRC_PATH + "/*.css");//读取第一层目录的css文件数组
  let srcSecondPathCSS = glob.sync(SRC_PATH + "/**/*.css");//读取第二层目录的css文件数组
  let mapCss = {};
  var jspaths = [].concat(entryEntriesCSS, srcPathCSS, srcSecondPathCSS);
  jspaths.forEach(filePath => {
    /* let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.')); */
    //mapCss[filename] = filePath;
    let filename = filePath.match(/webpack-learn\/(\S*)(.css)$/)[1]; //获取文件在项目中的路径 做为key值 保证打包后的路径和打包前的路径一致 webpack-learn为项目名称
    if (filename != "" && !filename.includes(".min")) {
      mapCss[filename] = filePath;
      //对已经压缩过的文件 做复制处理
    }
  });
  return mapCss;
}
module.exports = {
  entries,
  cssentries
}