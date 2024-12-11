const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json({ message: 'Usuario registrado exitosamente' });
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // Excluir contraseñas
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Buscar al usuario por email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Validar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Generar el token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Responder con el token y los datos del usuario
        res.json({
            token,
            user: {
                _id: user._id,
                nombre: user.nombre,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Actualizar usuario
const updateUser = async (req, res) => {
    const { nombre, email, role } = req.body;
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        user.nombre = nombre || user.nombre;
        user.email = email || user.email;
        user.role = role || user.role;

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
};

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
};

const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json(user);
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id, '-password'); // Excluir contraseña
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
};

module.exports = { getAllUsers, getUserById, updateUser, deleteUser, registerUser, loginUser };