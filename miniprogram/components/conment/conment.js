// components/conment/conment.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    id:{
      type:Number
    },
    pinLun:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    id:'',
    
  },
  created() {
 
 
    
  },

  /**
   * 组件的方法列表
   */
  methods: {

  //判断是否授权登录
  



    todetai() {
  var id=this.id
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userInfo']) {
         wx.showToast({
           title: '请登录后发布',
           icon:"none"
         })
          } else {
            wx.navigateTo({
              url: `../../editor/editor?id=${id}`
            })
          }
        }
      })
    }
  }
})
