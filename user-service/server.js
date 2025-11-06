const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const setupSwagger = require('./src/swagger');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
setupSwagger(app);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`User Service en puerto ${PORT}`);
  console.log(`Swagger: http://localhost:${PORT}/api-docs`);
});