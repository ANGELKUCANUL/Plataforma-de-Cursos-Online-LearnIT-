import pool from '../config/db.js';
import Course from '../models/Course.js';

class CourseRepository {
  
  async findAll() {
    const result = await pool.query('SELECT * FROM courses');
    return result.rows.map(row => new Course(row.id, row.name, row.description, row.status));
  }

  async findById(id) {
    const result = await pool.query('SELECT * FROM courses WHERE id = $1', [id]);
    const row = result.rows[0];
    return row ? new Course(row.id, row.name, row.description, row.status) : null;
  }

  async create(course) {
    await pool.query(
      'INSERT INTO courses (name, description, status) VALUES ($1, $2, $3)',
      [course.name, course.description, course.status]
    );
  }

  async update(id, course) {
    await pool.query(
      'UPDATE courses SET name = $1, description = $2, status = $3 WHERE id = $4',
      [course.name, course.description, course.status, id]
    );
  }

  async delete(id) {
    await pool.query('DELETE FROM courses WHERE id = $1', [id]);
  }
}

export default new CourseRepository();
