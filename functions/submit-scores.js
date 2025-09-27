import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export async function handler(event) {
  if(event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' };

  const { name, score } = JSON.parse(event.body || '{}');
  if(!name || score == null) return { statusCode: 400, body: 'Invalid data' };

  try {
    await pool.query(
      'INSERT INTO scores(name, score, created_at) VALUES($1,$2,NOW())',
      [name.trim(), Number(score)]
    );
    return { statusCode: 200, body: JSON.stringify({success:true}) };
  } catch(e) {
    return { statusCode: 500, body: e.message };
  }
}
