
var vm = new Vue({
  el: '.page-container',
  data: function () {
    return {
      recordList: [{
        month: '5月',
        bills: [{
          id: 1,
          checked: false,
          carnum: '粤B 12345',
          plotname: '财富港停车场',
          time: '2017.05.11 12:12',
          amount: 23
        },
        {
          id: 2,
          checked: false,
          carnum: '粤A 12345',
          plotname: '财富港停车场2',
          time: '2017.05.11 10:12',
          amount: 6
        }, {
          id: 3,
          checked: false,
          carnum: '粤C 12345',
          plotname: '财富港停车场3',
          time: '2017.05.11 22:12',
          amount: 23
        },
        ]

      },
      {
        month: '4月',
        bills: [{
          id: 4,
          checked: false,
          carnum: '粤B 12345',
          plotname: '财富港停车场',
          time: '2017.05.11 12:12',
          amount: 31
        },
        {
          id: 5,
          checked: false,
          carnum: '粤A 12345',
          plotname: '财富港停车场2',
          time: '2017.05.11 10:12',
          amount: 6
        }, {
          id: 6,
          checked: false,
          carnum: '粤C 12345',
          plotname: '财富港停车场3',
          time: '2017.05.11 22:12',
          amount: 26
        },
        ]

      },
      ],
      checkedRecords: [],
      totalAmount: 0,
      isCheckAll: false,
      showIllustrate: false,
    }
  },
  filters: {
    formatPrice: function (val) {
      return val.toFixed(2);
    }
  },
  created: function () {
    var vm = this;
    /* $(".page-container").show(); */
    document.querySelector(".page-container").style.display = "block";

  },
  methods: {
    /**
     * 设置选择项状态
     * @param {object ?} item 设置的订单项，全选或取消全选传空
     * @param {string} type  全选或取消所有 all-所有，none-取消全选
     */
    setSelectState: function (item, type) {
      var vm = this;
      if (item) {
        item.checked = !item.checked;
      }
      var checkedRecords = [];
      var totalAmount = 0;
      var checkAll = true;
      vm.recordList.forEach(function (mItem) {
        mItem.bills.forEach(function (dItem) {
          if (type === 'all') {
            dItem.checked = true;
          } else if (type === 'none') {
            dItem.checked = false;
          }
          if (dItem.checked) {
            totalAmount += Number(dItem.amount);
            checkedRecords.push(dItem);
          } else {
            checkAll = false;
          }
        });
      });
      vm.isCheckAll = checkAll;
      vm.totalAmount = totalAmount;
      vm.checkedRecords = checkedRecords;
    },
    /**
     * 点击全选
     */
    selectAll: function () {
      var vm = this;
      vm.isCheckAll = !vm.isCheckAll;
      if (vm.isCheckAll) {
        vm.setSelectState(null, 'all');
      } else {
        vm.setSelectState(null, 'none');
      }
    },
    goNext: function () {
      window.location.href = './drawInvoice.html';
    },
    goInvoiceRecord: function () {
      window.location.href = './invoiceRecord.html';
    }
  },
});
