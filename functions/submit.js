const faunadb = require("faunadb");

const q = faunadb.query;
const client = new faunadb.Client({ secret: "your-fauna-secret" });

exports.handler = async function(event, context) {
  if (event.httpMethod === 'POST') {
    try {
      const data = JSON.parse(event.body);
      const { studentId, ratings } = data;

      // 保存数据到 FaunaDB 或其他数据库
      await client.query(
        q.Create(q.Collection("feedbacks"), {
          data: { studentId, ratings }
        });

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Feedback submitted successfully' })
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Unable to submit feedback' })
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Method Not Allowed' })
  };
};
