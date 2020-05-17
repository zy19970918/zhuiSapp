// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const app = new TcbRouter({
    event
  });
  app.router('getTypea', async(ctx, next) => {
    ctx.body = await db.collection('booklist').limit(5).get().then((res) => {
      console.log(res)
      return res
    }) //从集合中第几个索
  })

  app.router('getTypeb', async(ctx, next) => {
    ctx.body = await db.collection('booklist').where({
      bookCategory: 2
    }).limit(5).get().then((res) => {
      console.log(res)
      return res
    }) //从集合中第几个索
  })
  app.router('getDeyil', async(ctx, next) => {

    var a = parseInt(event.id)
    console.log(a)
    ctx.body = await db.collection('booklist').where({
      id: a
    }).get().then((res) => {
      return {
        res,
        code: event.id
      }
    }) //从集合中第几个索
  })

  app.router('getMl', async(ctx, next) => {
    var id = parseInt(event.id)
    console.log(id)
    ctx.body = await db.collection('books').where({
      bookId: id
    }).get().then((res) => {
      console.log(res)
      return res
    }) //从集合中第几个索
  })
  app.router('getTypeblist', async(ctx, next) => {
    var typeId = parseInt(event.id)
    ctx.body = await db.collection('booklist').where({
      bookCategory: typeId
    }).get().then((res) => {
      console.log(res)
      return res
    }) //从集合中第几个索
  })
  app.router('addMy', async(ctx, next) => {
    var mybookid = parseInt(event.id)
    var openid = event.openid

    ctx.body = await db.collection('myBooklist').add({
      data: {
        myBookid: mybookid,
        openid: openid
      }

    }).then((res) => {
      return {
        code: 200
      }
    })
  })

  app.router('getMybook', async(ctx, next) => {
    var openid = event.openid
    ctx.body = await db.collection('myBooklist').where({
      _openid: openid
    }).get().then((res) => {
      return res
    }) //获取关注列表
  })

  app.router('getmybooklist', async(ctx, next) => {

    var a = parseInt(event.id)
    console.log(a)
    ctx.body = await db.collection('booklist').where({
      id: a
    }).get().then((res) => {
      return {
        res,
        code: event.id
      }
    }) //从集合中第几个索
  })
  app.router('delate', async(ctx, next) => {

    //var id=parseInt(event.name)
    ctx.body = await db.collection('myBooklist').where({
     name:event.name
    }).remove().then((res) => {
      return {

        code: 200
      }
    }) //从集合中第几个索
  }) 

  app.router('delateBook', async (ctx, next) => {
    //var id=parseInt(event.name)
    var id=parseInt(event.id)
    ctx.body = await db.collection('booklist').where({
      id:id
    }).remove().then((res) => {
      return {
        code: 200
      }
      }) //根据书的id删除对应的小说
  }) 
  app.router('addBook', async (ctx, next) => {
    console.log(event.book)
    //var id=parseInt(event.name)
    let book = event.book
    ctx.body = await db.collection('booklist').add({
      data:book
    }).then((res) => {
      return {
        code: 200
      }
    }) //根据书的id删除对应的小说
  }) 
  app.router('addMl', async (ctx, next) => {
    console.log(event.bookId)
    //var id=parseInt(event.name)
    let bookId = event.bookId
    let book = event.result
    book.result=
    ctx.body = await db.collection('books').add({
      data:{
        book:book,
        bookId:bookId
      }
    }).then((res) => {
      return {
         res:bookId,
        code: 200
      }
    }) //添加书籍
  }) 

  app.router('delatebooklist', async (ctx, next) => {
    //var id=parseInt(event.name)
    var id = parseInt(event.id)
    ctx.body = await db.collection('booklist').where({
      id: id
    }).remove().then((res) => {
      return {
        code: 200
      }
    }) //根据书的id删除对应的小说
  }) 


  app.router('delatesay', async (ctx, next) => {
    //var id=parseInt(event.name)
    var id = event.id
    db.collection('say').where({_id:id}).remove().then((res) => {
      console.log(res)
      return {
        code: 200
      }
    }) //根据id删除对应的评论
  }) 
  return app.serve()
}