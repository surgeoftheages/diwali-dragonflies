import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export async function handler() {
  try {
    const result = await pool.query(
      'SELECT name, score FROM scores ORDER BY score DESC, created_at ASC LIMIT 10'
    );
    return { statusCode: 200, body: JSON.stringify(result.rows) };
  } catch(e) {
    return { statusCode: 500, body: e.message };
  }
}
