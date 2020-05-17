// miniprogram/pages/bookRack/bookRack.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mybooks: [],
    mybooklist: [],
    mybook: [],
    openid:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var a= wx.getStorageSync("openid");
    this.setData({
      openid:a
    })

    wx.cloud.callFunction({
      name:"getBooklist",
      data:{
        "$url":"getMybook",
        "openid":this.data.openid
      }
    }).then((res)=>{
      console.log(res)
      this.data.mybooks=res.result.data
      var dbs = res.result.data
       var arr=[]
      dbs.forEach(item => {
           arr.push(item.name)
       })
      this.setData({
         mybooks:arr
       })
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

    var a = wx.getStorageSync("openid");
    this.setData({
      openid: a
    })

    wx.cloud.callFunction({
      name: "getBooklist",
      data: {
        "$url": "getMybook",
        "openid": this.data.openid
      }
    }).then((res) => {
      console.log(res)
      this.data.mybooks = res.result.data
      var dbs = res.result.data
      var arr = []
      dbs.forEach(item => {
        arr.push(item.name)
      })
      this.setData({
        mybooks: arr
      })
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var a = wx.getStorageSync("openid");
    this.setData({
      openid: a
    })

    wx.cloud.callFunction({
      name: "getBooklist",
      data: {
        "$url": "getMybook",
        "openid": this.data.openid
      }
    }).then((res) => {
      console.log(res)
      this.data.mybooks = res.result.data
      var dbs = res.result.data
      var arr = []
      dbs.forEach(item => {
        arr.push(item.name)
      })
      this.setData({
        mybooks: arr
      })
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  add() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

    var openid = wx.getStorageSync("openid");
    wx.showLoading({
      title: "加载中",
      mask: true,
    });
    wx.cloud.callFunction({
      name: "getBooklist",
      data: {
        "$url": "getMybook",
        "openid": openid
      }
    }).then((res) => {
      // console.log(res)
      var arr = []
      res.result.data.forEach((item) => {
        //console.log(item.myBookid)

        arr.push(item.myBookid)
      })
      wx.hideLoading()
      

      this.setData({
        mybook: arr
      })
  
      this.getadd()

    }).then(res => {
      app.globalData.list = this.data.mybook
      app.globalData.onload = this.onLoad
      // this.onReady()
    })


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