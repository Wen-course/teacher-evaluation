require('dotenv').config();
const faunadb = require("faunadb");
const q = faunadb.query;
const client = new faunadb.Client({ secret: process.evn.FAUNADB_SECRET });

exports.handler = async function(event, context) {
  if (event.httpMethod === 'POST') {
    try {
      const data = JSON.parse(event.body); // 解析请求数据
      const { studentId, ratings } = data;

      // 调用 FaunaDB API，将反馈数据存入数据库
      const response = await client.query(
        q.Create(q.Collection("feedbacks"), {
          data: { studentId, ratings }
        })
      );  

      // 返回成功响应
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Feedback submitted successfully', data: response })
      };
    } catch (err) {
      console.error('Error: ', err);  // 打印错误日志
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Unable to submit feedback', details: err.message })
      };
    }
  }

  return {
    statusCode: 405,  // 方法不允许
    body: JSON.stringify({ message: 'Method Not Allowed' })
  };
};
