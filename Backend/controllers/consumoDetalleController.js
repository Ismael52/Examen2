const ConsumoDetalle = require('../models/ConsumoDetalle');

const consumoDetalleController = {
  getAll: async (req, res) => {
    try {
      const consumosDetalle = await ConsumoDetalle.getAll();
      res.json(consumosDetalle);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const consumoDetalle = await ConsumoDetalle.getById(id);
      res.json(consumoDetalle);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { cantidad, subtotal, idConsumo, idProducto } = req.body;
      const nuevoConsumoDetalle = await ConsumoDetalle.create(cantidad, subtotal, idConsumo, idProducto);
      res.json(nuevoConsumoDetalle);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      const { cantidad, subtotal, idConsumo, idProducto } = req.body;
      const consumoDetalleActualizado = await ConsumoDetalle.update(id, cantidad, subtotal, idConsumo, idProducto);
      res.json(consumoDetalleActualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const consumoDetalleEliminado = await ConsumoDetalle.delete(id);
      res.json(consumoDetalleEliminado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = consumoDetalleController;
