import config from './config';

/* mixin 定义组件公用的内容 如图片地址*/
export const getImgPath = {
  methods: {
    /**
     * 
     * @param {*} photopath 图片存储路径
     * @param {*} photoname 图片名字 
     */
    getImgPath(photopath, photoname) {
      let imgurl;
      //访问本地的地址
      if (process.env.NODE_ENV == 'development') {
        imgurl = photoname;
        return imgurl;
      } else if (process.env.NODE_ENV == 'production') {
        imgurl = photoname;
        console.log(config.fsHost);
        return imgurl;
        /* if (!photoname) {
          return;
        } else {
           imgurl = location.protocol + "//" + config.fsHost + config.approot + "/image?module=sys&service=File&method=view&type=" + photopath + "&fileName=" + photoname + "&t=" + new Date().getTime(); 

        } */
      }
    }
  }
};
