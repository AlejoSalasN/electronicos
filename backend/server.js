require('dotenv').config(); // Cargar las variables de entorno desde .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors()); // Permitir solicitudes de diferentes dominios
app.use(morgan('dev')); // Mostrar logs HTTP en la consola
app.use(express.json()); // Permitir recibir JSON en el cuerpo de la solicitud

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Conexión a la base de datos
const { connectDB } = require('./config/database');
connectDB();

// Puerto de servidor
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

module.exports = {app, server};