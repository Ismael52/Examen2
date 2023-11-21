const Consumo = require('../models/Consumo');

const consumoController = {
  getAll: async (req, res) => {
    try {
      const consumos = await Consumo.getAll();
      res.json(consumos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const consumo = await Consumo.getById(id);
      res.json(consumo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { fecha, estado, total, idReserva } = req.body;
      const nuevoConsumo = await Consumo.create(fecha, estado, total, idReserva);
      res.json(nuevoConsumo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      const { fecha, estado, total, idReserva } = req.body;
      const consumoActualizado = await Consumo.update(id, fecha, estado, total, idReserva);
      res.json(consumoActualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const consumoEliminado = await Consumo.delete(id);
      res.json(consumoEliminado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = consumoController;
