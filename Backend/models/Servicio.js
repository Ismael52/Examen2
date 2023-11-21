const pool = require('../db');

class Servicio {
  static async getAll() {
    const result = await pool.query('SELECT idServicio, nombre, descripcion, TO_CHAR(fechaINI, \'DD/MM/YYYY\') AS fechaINI, TO_CHAR(fechaFIN, \'DD/MM/YYYY\') AS fechaFIN, cupo, precio, foto, idusuario FROM servicio');
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM servicio WHERE idServicio = $1', [id]);
    return result.rows[0];
  }

  static async create(nombre, descripcion, fechaINI, fechaFIN, cupo, precio, foto, idusuario) {
    const result = await pool.query('INSERT INTO servicio (nombre, descripcion, fechaINI, fechaFIN, cupo, precio, foto, idusuario) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [nombre, descripcion, fechaINI, fechaFIN, cupo, precio, foto, idusuario]);
    return result.rows[0];
  }

  static async update(id, nombre, descripcion, fechaINI, fechaFIN, cupo, precio, foto, idusuario) {
    const result = await pool.query('UPDATE servicio SET nombre = $2, descripcion = $3, fechaINI = $4, fechaFIN = $5, cupo = $6, precio = $7, foto = $8, idusuario = $9 WHERE idServicio = $1 RETURNING *', [id, nombre, descripcion, fechaINI, fechaFIN, cupo, precio, foto, idusuario]);
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM servicio WHERE idServicio = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = Servicio;
