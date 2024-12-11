const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'No autorizado, token fallido' });
        }
    }
    if (!token) {
        res.status(401).json({ message: 'No autorizado, no hay token' });
    }
};

// Verificar si el usuario es administrador
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'administrador') {
        next();
    } else {
        res.status(403).json({ message: 'Acceso denegado: No eres administrador' });
    }
};

// Verificar si el usuario es supervisor
const isSupervisor = (req, res, next) => {
    if (req.user && (req.user.role === 'supervisor' || req.user.role === 'administrador')) {
        next();
    } else {
        res.status(403).json({ message: 'Acceso denegado: No eres supervisor' });
    }
};

module.exports = { protect, isAdmin, isSupervisor };