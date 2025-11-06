const userRepo = require('../repositories/UserRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Faltan campos: email, password y name son requeridos' });
  }

  try {
    // verificar si ya existe
    const existing = await userRepo.findByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'Email ya existe' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await userRepo.create({ email, password: hashed, name });
    res.status(201).json({ id: user.id, email: user.email, name: user.name });
  } catch (err) {
    // Loguear para debugging y devolver error genérico + detalle en desarrollo
    console.error('Error en registro de usuario:', err);
    // Si la BD devuelve un código de violación de unicidad (Postgres 23505), mapear a 409
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Email ya existe' });
    }
    res.status(500).json({ error: 'Error interno del servidor', details: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Faltan campos: email y password son requeridos' });
  }

  try {
    const user = await userRepo.findByEmail(email);
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ error: 'Error interno del servidor', details: err.message });
  }
};

module.exports = { register, login };