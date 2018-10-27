/* 图片引用地址会被编译  导致引入不到 所以要先require引入进来 会被编译到static目录下 */
let index1 = require('@standard/mock/swiper-loopimg/img/index1.jpg');
let index2 = require('@standard/mock/swiper-loopimg/img/index2.jpg');
let index3 = require('@standard/mock/swiper-loopimg/img/index3.jpg');
let index4 = require('@standard/mock/swiper-loopimg/img/index4.jpg');
let index5 = require('@standard/mock/swiper-loopimg/img/index5.jpg');
const imgdataobj =
  {
    list: [
      { src: index1, url: 'https://www.baidu.com', id: 'img1' },
      { src: index2, url: 'http://news.baidu.com', id: 'img2' },
      { src: index3, url: 'https://tieba.baidu.com/index.html', id: 'img3' },
      { src: index4, url: 'http://image.baidu.com', id: 'img4' },
      { src: index5, url: 'http://v.baidu.com/', id: 'img5' },
    ]
  };
export { imgdataobj };
