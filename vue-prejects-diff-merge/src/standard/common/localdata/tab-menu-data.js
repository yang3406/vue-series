let img1 = require('../img/tab-menu/recharge.svg');
let img2 = require('../img/tab-menu/record.svg');
let img3 = require('../img/tab-menu/parkpayment.svg');
let img4 = require('../img/tab-menu/search.svg');
export const tabMenuDataObj = {
  list: [
    { url: img2, id: 'fastRecharge', title: '快速充值', path: '/fastRecharge' },
    { url: img1, id: 'parkingrecord', title: '停车记录', path: '/orderrecord' },
    { url: img3, id: 'parkingPay', title: '停车缴费', path: '/parkingPay' },
    { url: img4, id: 'parkinginfo', title: '停车场信息', path: '/parkinginfo' }
  ]
};
