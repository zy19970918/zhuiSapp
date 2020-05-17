// miniprogram/pages/search/search.js
Page({
  mixins: [require('../../mixin/themeChanged')],
  data: {
    inputShowed: false,
    inputVal: "",
    list:[]
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
  Search(e) {
    console.log(e.detail.value)

    const db = wx.cloud.database()
    db.collection('booklist').where({
      name: e.detail.value
    }).get().then(res => {
      console.log(res.data)
      this.setData({
       list:res.data
      })
    })
  }
});