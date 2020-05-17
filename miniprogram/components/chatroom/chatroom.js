// components/add.js
//var base64 = require("../images/base64");
Component({
  mixins: [require('../../mixin/themeChanged')],
  /**
   * 组件的属性列表
   */
  properties: {
    booktypea:{
      type:Array
    }
  },
  options: {
    multipleSlots: true
  },
  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toBookPage(e) {
      var id=e.currentTarget.dataset.id
     wx.showLoading({
       title: "加载中",
       mask: true
     });
       
      wx.navigateTo({
        url: `/pages/bookPage/bookPage?id=${id}`,
        success: (result) => {
          wx.hideLoading();
        },
        fail: () => {},
        complete: () => {}
      });
        
    }
  },
 created() {
 
 }
})
