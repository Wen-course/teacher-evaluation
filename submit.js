// netlify-functions/submit.js

const fetch = require('node-fetch'); // 用于处理外部API请求

exports.handler = async (event, context) => {
  if (event.httpMethod === 'POST') {
    const { studentId, ratings } = JSON.parse(event.body);

    // 模拟保存到数据库或者第三方存储
    // 这里我们可以将数据保存到 Google Sheets、Firebase 或其他数据库
    
    console.log(`学生 ${studentId} 提交了以下评价：`);
    console.log(ratings);

    // 返回成功的响应
    return {
      statusCode: 200,
      body: JSON.stringify({ message: '评价提交成功' }),
    };
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }
};
