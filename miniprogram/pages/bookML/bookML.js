// pages/bookML/bookML.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    chapterId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options.id)
    this.setData({
      id:options.id,
      booklist:[],
      count:'',
      a:"ssss"
    })
    this.getMl()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getMl() {
    wx.showLoading({
      title: "加载中，请稍后",
      mask: true,
    });
    wx.cloud.callFunction({
      name:"getBooklist",
      data:{
        $url:"getMl",
        id:this.data.id
      }
    }).then((res)=>{
      //this.data.count=res.result.data[0].book.result.length
      this.setData({
        booklist:res.result.data[0].book.result,
        count:res.result.data[0].book.result.length
      })
      wx.hideLoading()
    }).catch((err)=>{
      console.log(err)
    })
  },
  DX() {
    var list= this.data.booklist.reverse()
  this.setData({
    booklist: list
  })
  },
  getBookcontent (e) {
    wx.showLoading({
      title: "加载中，请稍后",
      mask: true,
    });
    // console.log(e.currentTarget.dataset.id)
     this.setData({
      chapterId:e.currentTarget.dataset.id
     })

     wx.navigateTo({
      url: `../pagea/Pagea?id=${this.data.id}&chapterId=${this.data.chapterId}`,
      success: (result)=>{
        wx.hideLoading();
      },
      fail: ()=>{},
      complete: ()=>{}
    });
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