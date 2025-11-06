const pool = require('../config/db');
const User = require('../models/User');

class UserRepository {
  async findAll() {
    const result = await pool.query('SELECT * FROM users');
    return result.rows.map(row => new User(row));
  }

  async findById(id) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0] ? new User(result.rows[0]) : null;
  }

  async findByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0] ? new User(result.rows[0]) : null;
  }

  async create(userData) {
    const { email, password, name } = userData;
    const result = await pool.query(
      'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *',
      [email, password, name]
    );
    return new User(result.rows[0]);
  }

  async update(id, userData) {
    const { name, email } = userData;
    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
    );
    return result.rows[0] ? new User(result.rows[0]) : null;
  }

  async delete(id) {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
  }
}

module.exports = new UserRepository();