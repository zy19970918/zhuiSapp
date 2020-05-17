// miniprogram/pages/min/min.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:true,
    flags:false,
    url:'',
    name:''
  },
  getUserInfo  (e) {
    console.log(e)
    var userInfo = e.detail.userInfo
    wx.setStorageSync("userInfo", userInfo)        
          this.setData({
            name: userInfo. nickName,
            url: userInfo.avatarUrl,
             flag: false,
             flags:true
          })
           
              app.globalData.userInfo = userInfo
    // 登录
    
    wx.cloud.callFunction({
      name: "login",
    }).then((res) => {
      console.log(res.result.openid)
      wx.setStorageSync("openid", res.result.openid)
    })
   
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

   var that=this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.removeStorage({key:"openid"})
          console.log("没授权")
          that.setData({
            flags: false,
            flag: true,
            name:"",
            url:""
          })
        }else{
          wx.cloud.callFunction({
            name: "login",
          }).then((res) => {
            console.log(res.result.openid)
            wx.setStorageSync("openid", res.result.openid)
          })
          var coun = wx.getStorageSync("userInfo")
          console.log("授权了")
         that.setData({
            flags:true,
           flag: false,
           name: coun.nickName,
           url: coun.avatarUrl

          })
        }
      }
    })
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
    this.onLoad()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.onLoad()
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