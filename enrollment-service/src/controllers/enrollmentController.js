import EnrollmentRepository from '../repositories/EnrollmentRepository.js';
import Enrollment from '../models/Enrollment.js';

export const getEnrollments = async (req, res) => {
  res.json(await EnrollmentRepository.findAll());
};

export const createEnrollment = async (req, res) => {
  const { user_id, course_id } = req.body;
  await EnrollmentRepository.create(new Enrollment(null, user_id, course_id));
  res.json({ message: 'Inscripción registrada' });
};
