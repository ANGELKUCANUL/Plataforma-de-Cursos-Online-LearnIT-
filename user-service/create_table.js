const pool = require('./src/config/db');

(async () => {
  try {
    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await pool.query(sql);
    console.log('Tabla users creada o ya existía.');
  } catch (err) {
    console.error('Error creando tabla users:', err);
  } finally {
    await pool.end?.();
    process.exit(0);
  }
})();
