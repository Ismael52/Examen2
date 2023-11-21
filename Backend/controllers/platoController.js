const Plato = require('../models/Plato');

const platoController = {
  getAll: async (req, res) => {
    try {
      const platos = await Plato.getAll();
      res.json(platos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const plato = await Plato.getById(id);
      res.json(plato);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { nombre, descripcion, foto, estado, idTipoPlato } = req.body;
      const nuevoPlato = await Plato.create(nombre, descripcion, foto, estado, idTipoPlato);
      res.json(nuevoPlato);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      const { nombre, descripcion, foto, estado, idTipoPlato } = req.body;
      const platoActualizado = await Plato.update(id, nombre, descripcion, foto, estado, idTipoPlato);
      res.json(platoActualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const platoEliminado = await Plato.delete(id);
      res.json(platoEliminado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = platoController;
