const TipoPlato = require('../models/Tipoplato');

const tipoPlatoController = {
  getAll: async (req, res) => {
    try {
      const tiposPlato = await TipoPlato.getAll();
      res.json(tiposPlato);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const tipoPlato = await TipoPlato.getById(id);
      res.json(tipoPlato);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { nombre, descripcion } = req.body;
      const nuevoTipoPlato = await TipoPlato.create(nombre, descripcion);
      res.json(nuevoTipoPlato);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      const { nombre, descripcion } = req.body;
      const tipoPlatoActualizado = await TipoPlato.update(id, nombre, descripcion);
      res.json(tipoPlatoActualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const tipoPlatoEliminado = await TipoPlato.delete(id);
      res.json(tipoPlatoEliminado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = tipoPlatoController;
