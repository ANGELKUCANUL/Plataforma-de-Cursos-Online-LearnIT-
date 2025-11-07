import pool from '../config/db.js';
import Enrollment from '../models/Enrollment.js';

class EnrollmentRepository {

  async findAll() {
    const result = await pool.query('SELECT * FROM enrollments');
    return result.rows.map(row => new Enrollment(row.id, row.user_id, row.course_id));
  }

  async create(enrollment) {
    await pool.query(
      'INSERT INTO enrollments (user_id, course_id) VALUES ($1, $2)',
      [enrollment.user_id, enrollment.course_id]
    );
  }
}

export default new EnrollmentRepository();
