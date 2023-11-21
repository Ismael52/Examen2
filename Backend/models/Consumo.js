const pool = require('../db');

class Consumo {
  static async getAll() {
    const result = await pool.query('SELECT idConsumo, TO_CHAR(fecha, \'DD/MM/YYYY\') AS fecha_formateada, estado, total, idReserva FROM consumo');
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM consumo WHERE idConsumo = $1', [id]);
    return result.rows[0];
  }

  static async create(fecha, estado, total, idReserva) {
    const result = await pool.query('INSERT INTO consumo (fecha, estado, total, idReserva) VALUES ($1, $2, $3, $4) RETURNING *', [fecha, estado, total, idReserva]);
    return result.rows[0];
  }

  static async update(id, fecha, estado, total, idReserva) {
    const result = await pool.query('UPDATE consumo SET fecha = $2, estado = $3, total = $4, idReserva = $5 WHERE idConsumo = $1 RETURNING *', [id, fecha, estado, total, idReserva]);
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM consumo WHERE idConsumo = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = Consumo;
