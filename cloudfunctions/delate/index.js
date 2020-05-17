// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const wxContext = cloud.getWXContext()
  console.log(event)
  const str = await db.collection('say').where({ _id: event.id }).remove().then((res) => {}) //根据id删除对应的

  return {
   code:200
  }
}