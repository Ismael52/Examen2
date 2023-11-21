const ServicioPlato = require('../models/ServicioPlato');

const servicioPlatoController = {
  getAll: async (req, res) => {
    try {
      const serviciosPlato = await ServicioPlato.getAll();
      res.json(serviciosPlato);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const servicioPlato = await ServicioPlato.getById(id);
      res.json(servicioPlato);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { idServicio, idPlato } = req.body;
      const nuevoServicioPlato = await ServicioPlato.create(idServicio, idPlato);
      res.json(nuevoServicioPlato);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const servicioPlatoEliminado = await ServicioPlato.delete(id);
      res.json(servicioPlatoEliminado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = servicioPlatoController;
