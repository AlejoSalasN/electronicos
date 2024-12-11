import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true, // Habilita variables globales como `describe`, `it`, etc.
        environment: 'jsdom', // Simula un entorno del navegador
        setupFiles: './src/setupTests.js', // Configuración inicial de pruebas
    },
});