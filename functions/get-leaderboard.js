import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.NETLIFY_DATABASE_URL
});

export async function handler() {
  try {
    const result = await pool.query(
      'SELECT name, score FROM scores ORDER BY score DESC, created_at ASC LIMIT 10'
    );
    return {
      statusCode: 200,
      body: JSON.stringify(result.rows)
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
