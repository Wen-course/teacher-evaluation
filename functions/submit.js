import faunadb from 'faunadb';

// 从环境变量中加载 FaunaDB 的密钥
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

export async function handler(event) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const data = JSON.parse(event.body);
    const { name, studentId, course, teacherFeedback } = data;

    try {
        const result = await client.query(
            faunadb.query.Create(
                faunadb.query.Collection('feedbacks'),
                { data: { name, studentId, course, teacherFeedback } }
            )
        );
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Feedback submitted successfully', result })
        };
    } catch (error) {
        console.error('Error submitting feedback:', error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Failed to submit feedback' }) };
    }
}
