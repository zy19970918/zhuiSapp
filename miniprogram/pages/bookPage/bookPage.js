// miniprogram/pages/bookPage/bookPage.js
const app = getApp()
Page({
  mixins: [require('../../mixin/themeChanged')],
  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    value: "加入书架",
    id: '', //列表项传过来的id
    content: '',
    open: '',
    pinLun: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
    })
    var openid = wx.getStorageSync("openid");
    wx.cloud.callFunction({
      name: "getBooklist",
      data: {
        "$url": "getMybook",
        "openid": openid
      }
    }).then((res) => {
      wx.hideLoading()
      var dbs=res.result.data
      var arr=[]
      dbs.forEach(item=>{
          arr.push(item.name)
      })
    
      this.setData({
        mybooks:arr
      })
    arr.forEach(item=>{
      console.log(item.id+"========="+this.data.id)
      if(item.id==this.data.id){
      this.setData({
        flag:false
      })
      }
    })
     // app.globalData.list=arr
    })
    
///////////////////////////////////////////////////////////////////////////
    // console.log(options)
    //console.log(app.globalData)

  

    wx.cloud.callFunction({
      name: "getBooklist",
      data: {
        $url: "getDeyil",
        id: this.data.id
      }
    }).then((res) => {
      // console.log(res)
      this.setData({
        content: res.result.res.data[0]
      })

    })


  },
  to_ml() {
    wx.showLoading({
      title: "加载中",
      mask: true
    });
    wx.navigateTo({
      url: `/pages/bookML/bookML?id=${this.data.id}`,
      success: (result) => {
        wx.hideLoading();
      }
    });
  },
  join() {
    var openid = wx.getStorageSync("openid");
    if (openid) {
      const db = wx.cloud.database()
      var float = parseInt(this.data.id)
      db.collection('booklist').where({ id: float }).get().then((res) => {
        // console.log(res.data[0])
        var book = res.data[0]
        console.log(book)
        db.collection('myBooklist').add({
          data: { name: book },
          success: res => {
            this.setData({
              flag: false
            })
            wx.showToast({
              title: '添加成功关注',
            })
          }
        })
      })
    } else {
      wx.showToast({
        title: '你没有登录，请登录添加',
        icon: 'none',
      });
    }
  },
  delate() {
    console.log(this.data.content)
    wx.cloud.callFunction({
      name: "getBooklist",
      data: {
        "$url": "delate",
        "name": this.data.content
      }
    }).then((res) => {
      console.log(res)
      this.setData({
        flag: true
      })
      wx.showToast({
        title: '移除成功',
        icon: 'none',
      });


    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getDetil()
   

  },
  getDetil() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getsay()
  },

  getsay() {

    var ids = this.data.id
    console.log(ids)
    const db = wx.cloud.database()
    db.collection('say').where({
      id: ids
    }).get()
      .then(res => {
        console.log(res.data)
        this.setData({
          pinLun: res.data
        })
      })
      .catch(console.error)

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

  },
  look() {
    console.log(this.data.id)
    wx.navigateTo({
      url: `../pagea/Pagea?id=${this.data.id}&chapterId=0`,
      success: (result) => {
        wx.hideLoading();
      },
      fail: () => { },
      complete: () => { }
    });
  }
})