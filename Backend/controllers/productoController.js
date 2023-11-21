const Producto = require('../models/Producto');

const productoController = {
  getAll: async (req, res) => {
    try {
      const productos = await Producto.getAll();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const producto = await Producto.getById(id);
      res.json(producto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { nombre, descripcion, foto, precio, stock, estado } = req.body;
      const nuevoProducto = await Producto.create(nombre, descripcion, foto, precio, stock, estado);
      res.json(nuevoProducto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      const { nombre, descripcion, foto, precio, stock, estado } = req.body;
      const productoActualizado = await Producto.update(id, nombre, descripcion, foto, precio, stock, estado);
      res.json(productoActualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const productoEliminado = await Producto.delete(id);
      res.json(productoEliminado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = productoController;
