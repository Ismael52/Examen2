const Usuario = require('../models/Usuario');

const usuarioController = {
  getAll: async (req, res) => {
    try {
      const usuarios = await Usuario.getAll();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const usuario = await Usuario.getById(id);
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { nombres, apellidos, correo, contraseña, telefono, estado, foto, esAdmin, esAnfitrion } = req.body;
      const nuevoUsuario = await Usuario.create(nombres, apellidos, correo, contraseña, telefono, estado, esAdmin, esAnfitrion, foto);
      res.json(nuevoUsuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      const { nombres, apellidos, correo, contraseña, telefono, estado, esAdmin, esAnfitrion, foto } = req.body;
      const usuarioActualizado = await Usuario.update(id, nombres, apellidos, correo, contraseña, telefono, estado, esAdmin, esAnfitrion, foto);
      res.json(usuarioActualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const usuarioEliminado = await Usuario.delete(id);
      res.json(usuarioEliminado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { correo, contraseña } = req.body;
      const usuario = await Usuario.getByCorreoContraseña(correo, contraseña);
      if (usuario) {
        res.json({ usuario }); // Envía la información del usuario al frontend
      } else {
        res.status(401).json({ error: 'Credenciales inválidas' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = usuarioController;
