import CourseRepository from '../repositories/CourseRepository.js';
import Course from '../models/Course.js';

export const getCourses = async (req, res) => {
  res.json(await CourseRepository.findAll());
};

export const getCourse = async (req, res) => {
  const course = await CourseRepository.findById(req.params.id);
  course ? res.json(course) : res.status(404).json({ message: 'Curso no encontrado' });
};

export const createCourse = async (req, res) => {
  const { name, description, status } = req.body;
  await CourseRepository.create(new Course(null, name, description, status));
  res.json({ message: 'Curso creado' });
};

export const updateCourse = async (req, res) => {
  const { name, description, status } = req.body;
  await CourseRepository.update(req.params.id, new Course(null, name, description, status));
  res.json({ message: 'Curso actualizado' });
};

export const deleteCourse = async (req, res) => {
  await CourseRepository.delete(req.params.id);
  res.json({ message: 'Curso eliminado' });
};
