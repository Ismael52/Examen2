const pool = require('../db');

class Reserva {
  static async getAll() {
    const result = await pool.query('SELECT * FROM reserva');
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM reserva WHERE idReserva = $1', [id]);
    return result.rows[0];
  }

  static async create(fecha_reserva, fecha_servicio, cupo, observacion, estado, total, idusuario) {
    const result = await pool.query('INSERT INTO reserva (fecha_reserva, fecha_servicio, cupo, observacion, estado, total, idusuario) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [fecha_reserva, fecha_servicio, cupo, observacion, estado, total, idusuario]);
    return result.rows[0];
  }

  static async update(id, fecha_reserva, fecha_servicio, cupo, observacion, estado, total, idusuario) {
    const result = await pool.query('UPDATE reserva SET fecha_reserva = $2, fecha_servicio = $3, cupo = $4, observacion = $5, estado = $6, total = $7, idusuario = $8 WHERE idReserva = $1 RETURNING *', [id, fecha_reserva, fecha_servicio, cupo, observacion, estado, total, idusuario]);
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM reserva WHERE idReserva = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = Reserva;
