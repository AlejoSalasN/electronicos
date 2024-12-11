const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
};

const createProduct = async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock } = req.body;

        const product = new Product({
            nombre,
            descripcion,
            precio,
            stock,
            imagen: req.file?.path || '', // Usar el URL proporcionado por Cloudinary
        });

        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto' });
    }
};

const updateProduct = async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
};

const deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Producto eliminado' });
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };