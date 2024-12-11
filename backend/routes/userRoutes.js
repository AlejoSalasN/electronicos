const express = require('express');
const {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require('../controllers/userController');
const { protect, isAdmin, isSupervisor } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', protect, isAdmin, getAllUsers); // Solo administradores pueden ver todos los usuarios
router.get('/:id', protect, isAdmin, getUserById); // Obtener un usuario específico
router.put('/:id', protect, isAdmin, updateUser); // Solo administradores pueden editar usuarios
router.delete('/:id', protect, isAdmin, deleteUser); // Solo administradores pueden eliminar usuarios
router.post('/register', registerUser);
router.post('/login', loginUser);
//router.get('/profile', protect, getUserProfile);

module.exports = router;