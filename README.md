## 简介

这是一个用微信小程序写的小说APP，支持搜索小说、加入书架、发布评论、阅读等功能。

Githup代码地址：<https://github.com/zy19970918/zhuiSapp>

------



### 效果图

![1589783730635](C:\Users\19380\AppData\Roaming\Typora\typora-user-images\1589783730635.png)

![1589783778753](C:\Users\19380\AppData\Roaming\Typora\typora-user-images\1589783778753.png)

------

### 目录结构

```
miniprogram-9.
├── miniprogram               # 小程序端        
│   ├── components            # 自定义组件
│   ├── pages                 # 页面
│   ├── imgs                  # 图片
│   ├── lib                   # 工具文件夹
│   └── style                 # 全局css样式
└── cloudfunctions            # 云端
```

------

### 技术栈

1. TcbRouter云函数业务处理

   - tcb-router基于 koa 风格的小程序·云开发云函数轻量级类路由库，主要用于优化服务端函数处理逻辑。
   - 由于微信小程序本身关于上传云函数数量有限制，为了解决这一问题 需要使用tcbrouter

   2.数据管理

应用中所有的数据都是直接储存在云数据库中。 应用中储存的公共数据储存在APP.js文件中，用户信息和标识符openid存放在本地储存中storage中。

```
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
           
              app.globalData.userInfo = userInfo  //获取用户信息存到app.js中
    // 登录
    
    wx.cloud.callFunction({
      name: "login",
    }).then((res) => {
      console.log(res.result.openid)
      wx.setStorageSync("openid", res.result.openid)  //获取用户openid存到本地缓存中
    })
   
    
  },
```

3.数据请求

​       微信小程序统一为每个用户生成一个唯一的标识符openid，只需要用户每次带上这个标识符去请求数据即可，首先需要获取登录凭证code传到开发者服务器调用 获取到openid等数据

```
//根据code获取openid等信息
wx.login({
        //获取code
        success: function (res) {
          var code = res.code; //返回code
          console.log(code);
          var appId = '...';
          var secret = '...';
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
            data: {},
            header: {
              'content-type': 'json'
            },
            success: function (res) {
              var openid = res.data.openid //返回openid
              console.log('openid为' + openid);
            }
          })
        }
      })

//正常返回的JSON数据包
{
      "openid": "OPENID",
      "session_key": "SESSIONKEY",
      "unionid": "UNIONID"
}
//错误时返回JSON数据包(示例为Code无效)
{
    "errcode": 40029,
    "errmsg": "invalid code"
}
```

**注意** ：这种方式获取的openid 在使用的时候 会出现问题  具体为什么 不太清楚 所以在这里 我换了方式获取 通过

调用云函数 来获取openid

```
 wx.cloud.callFunction({
            name: "login",
          }).then((res) => {
            console.log(res.result.openid)
            wx.setStorageSync("openid", res.result.openid)
          })
```

------

### 功能

- 下拉刷新

- 免费小说

- 发布评论

- 添加书架

- 阅读模式切换/字体调节

  ### 

------

### 安装

```
https://github.com/zy19970918/zhuiSapp.git
npm install
```

### 开发环境

微信小程序开发者工具

------

## License

仅供学习使用