const pool = require('./src/config/db');

(async () => {
  try {
    const res = await pool.query('SELECT id, email, name, created_at FROM users');
    console.log('Rows:', JSON.stringify(res.rows, null, 2));
  } catch (err) {
    console.error('DB error:', err);
  } finally {
    await pool.end?.();
    process.exit(0);
  }
})();
