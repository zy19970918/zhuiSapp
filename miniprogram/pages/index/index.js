//index.js
const app = getApp()

Page({
  //mixins: [require('../../mixin/themeChanged')],
  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    switeImages:[
      { imageUrl:"https://plf-new.zhuishushenqi.com/management/images/20200430/cd97d11046e9444bb518a369125551a0.jpg"},
      { imageUrl: "https://plf-new.zhuishushenqi.com/management/images/20200430/54440b8e3abc4e53882b1ddb212cf9af.jpg" },
      { imageUrl: "https://plf-new.zhuishushenqi.com/management/images/20200424/77293f7b772e4545963d1a7988e6d6d3.jpg" },
      { imageUrl: "https://plf-new.zhuishushenqi.com/management/images/20200417/18e848de81824016bb9fe89ae06d4a60.jpg" },
      { imageUrl: "https://plf-new.zhuishushenqi.com/management/images/20200424/86297f4ac530477b9da08c0f29f4ae73.jpg" },
      { imageUrl: "https://plf-new.zhuishushenqi.com/management/images/20200430/cd97d11046e9444bb518a369125551a0.jpg" },
    ],
    bookTypea:[], //畅销短篇
    bookTypeb:[], //女生佳作
    bookTypec:[], //女生红文区
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  getBooklist () {
    wx.cloud.callFunction({
      name:'getBooklist',
      data:{
        $url:"getTypea"
      }
    }).then((res)=>{
     this.setData({
       bookTypea:res.result.data
     })
    })
    wx.cloud.callFunction({
      name:'getBooklist',
      data:{
        $url:"getTypeb"
      }
    }).then((res)=>{
      this.setData({
        bookTypeb:res.result.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBooklist()
  },

  srarch() {
      wx.navigateTo({
        url: '../search/search',
      });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
