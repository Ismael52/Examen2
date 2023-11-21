const Reserva = require('../models/Reserva');

const reservaController = {
  getAll: async (req, res) => {
    try {
      const reservas = await Reserva.getAll();
      res.json(reservas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const reserva = await Reserva.getById(id);
      res.json(reserva);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { fecha_reserva, fecha_servicio, cupo, observacion, estado, total, idusuario } = req.body;
      const nuevaReserva = await Reserva.create(fecha_reserva, fecha_servicio, cupo, observacion, estado, total, idusuario);
      res.json(nuevaReserva);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      const { fecha_reserva, fecha_servicio, cupo, observacion, estado, total, idusuario } = req.body;
      const reservaActualizada = await Reserva.update(id, fecha_reserva, fecha_servicio, cupo, observacion, estado, total, idusuario);
      res.json(reservaActualizada);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const reservaEliminada = await Reserva.delete(id);
      res.json(reservaEliminada);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = reservaController;
