const Servicio = require('../models/Servicio');

const servicioController = {
  getAll: async (req, res) => {
    try {
      const servicios = await Servicio.getAll();
      res.json(servicios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const servicio = await Servicio.getById(id);
      res.json(servicio);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { nombre, descripcion, fechaINI, fechaFIN, cupo, precio, foto, idusuario } = req.body;
      const nuevoServicio = await Servicio.create(nombre, descripcion, fechaINI, fechaFIN, cupo, precio, foto, idusuario);
      res.json(nuevoServicio);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      const { nombre, descripcion, fechaINI, fechaFIN, cupo, precio, foto, idusuario } = req.body;
      const servicioActualizado = await Servicio.update(id, nombre, descripcion, fechaINI, fechaFIN, cupo, precio, foto, idusuario);
      res.json(servicioActualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const servicioEliminado = await Servicio.delete(id);
      res.json(servicioEliminado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = servicioController;
