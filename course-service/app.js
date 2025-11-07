import express from 'express';
import dotenv from 'dotenv';
import courseRoutes from './src/routes/courseRoutes.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/courses', courseRoutes);

const PORT = process.env.COURSE_PORT || 4001;
app.listen(PORT, () => console.log(`Course Service running on port ${PORT}`));
