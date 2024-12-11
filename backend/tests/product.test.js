require('dotenv').config({ path: '.env' }); // Carga el archivo .env.test
const {app, server} = require('../server'); // Importar tu servidor Express
const jwt = require('jsonwebtoken'); // Importar jsonwebtoken
const request = require('supertest');
const { expect } = require('@jest/globals'); // Si usas Jest
const mongoose = require('mongoose');

// Generar un token JWT de prueba
const tokenDePrueba = jwt.sign(
    { id: '675926cc051aa573bc50503c'}, // Datos del payload
    process.env.JWT_SECRET, // Usa la misma clave secreta que en tu backend
    { expiresIn: '1h' } // Token válido por 1 hora
);



describe('API de Productos', () => {
    it('Debería obtener todos los productos', async () => {
        const response = await request(app).get('/api/products');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('Debería crear un nuevo producto', async () => {
        const response = await request(app)
            .post('/api/products')
            .send({
                nombre: 'Producto Prueba',
                descripcion: 'Descripción de prueba',
                precio: 100,
                stock: 10,
            })
            .set('Authorization', `Bearer ${tokenDePrueba}`);
        expect(response.status).toBe(201);
        expect(response.body.nombre).toBe('Producto Prueba');
    });
});

afterAll(async () => {
    await mongoose.connection.close(); // Cierra la conexión a MongoDB
    server.close();
});

