import express from 'express';
import dotenv from 'dotenv';
import enrollmentRoutes from './src/routes/enrollmentRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/enrollments', enrollmentRoutes);

const PORT = process.env.ENROLL_PORT || 4002;
app.listen(PORT, () => console.log(`Enrollment Service running on port ${PORT}`));
