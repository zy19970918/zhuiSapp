Page({
  data: {
    formats: {},
    readOnly: false,
    placeholder: '请输入要BB的内容...',
    editorHeight: 300,
    keyboardHeight: 0,
    isIOS: false,
    id:'',
    text:'',
    url:'',
    name:"",
    time:"",
    
  },
  readOnlyChange() {
  
    this.setData({
      readOnly: !this.data.readOnly
    })
  },
  aaaae(e) {
  
     this.setData({
       text: e.detail.text
     })
  },
  onLoad(options) {
    console.log(options)
    var url = wx.getStorageSync('userInfo')
    this.setData({
      id:options.id,
      url:url.avatarUrl,
      name:url.nickName,



    })
    const platform = wx.getSystemInfoSync().platform
    const isIOS = platform === 'ios'
    this.setData({ isIOS})
    const that = this
    this.updatePosition(0)
    let keyboardHeight = 0
    wx.onKeyboardHeightChange(res => {
      if (res.height === keyboardHeight) return
      const duration = res.height > 0 ? res.duration * 1000 : 0
      keyboardHeight = res.height
      setTimeout(() => {
        wx.pageScrollTo({
          scrollTop: 0,
          success() {
            that.updatePosition(keyboardHeight)
            that.editorCtx.scrollIntoView()
          }
        })
      }, duration)

    })
  },
  updatePosition(keyboardHeight) {
    const toolbarHeight = 50
    const { windowHeight, platform } = wx.getSystemInfoSync()
    let editorHeight = keyboardHeight > 0 ? (windowHeight - keyboardHeight - toolbarHeight) : windowHeight
    this.setData({ editorHeight, keyboardHeight })
  },
  calNavigationBarAndStatusBar() {
    const systemInfo = wx.getSystemInfoSync()
    const { statusBarHeight, platform } = systemInfo
    const isIOS = platform === 'ios'
    const navigationBarHeight = isIOS ? 44 : 48
    return statusBarHeight + navigationBarHeight
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
    }).exec()
  },
  blur() {
    this.editorCtx.blur()
  },
  format(e) {
    let { name, value } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.editorCtx.format(name, value)

  },
  onStatusChange(e) {
    const formats = e.detail
    this.setData({ formats })
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function () {
        console.log('insert divider success')
      }
    })
  },
  clear() {
    this.editorCtx.clear({
      success: function (res) {
        console.log("clear success")
      }
    })
  },
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },
  insertImage() {
    const that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.editorCtx.insertImage({
          src: res.tempFilePaths[0],
          data: {
            id: 'abcd',
            role: 'god'
          },
          width: '80%',
          success: function () {
            console.log('insert image success')
          }
        })
      }
    })
  },

  son() {
    var d = new Date();
    var date = d.getFullYear() + ":" + (d.getMonth() + 1) + ":" + d.getDate() + ":";
    wx.showLoading({
      title: "发布中",
      mask: true,
    });
    const db = wx.cloud.database()
    db.collection('say').add({
      // data 字段表示需新增的 JSON 数据
      data: {
         name:this.data.name,
         url:this.data.url,
         text:this.data.text,
         id:this.data.id,
         time:date
      }
    })
    .then(res => {
     wx.showToast({
       title: '发布成功'
     });
    })
    .catch(console.error)
  }
})
