const pool = require('../db');

class ConsumoDetalle {
  static async getAll() {
    const result = await pool.query('SELECT * FROM consumoDetalle');
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM consumoDetalle WHERE idConsumoDetalle = $1', [id]);
    return result.rows[0];
  }

  static async create(cantidad, subtotal, idConsumo, idProducto) {
    const result = await pool.query('INSERT INTO consumoDetalle (cantidad, subtotal, idConsumo, idProducto) VALUES ($1, $2, $3, $4) RETURNING *', [cantidad, subtotal, idConsumo, idProducto]);
    return result.rows[0];
  }

  static async update(id, cantidad, subtotal, idConsumo, idProducto) {
    const result = await pool.query('UPDATE consumoDetalle SET cantidad = $2, subtotal = $3, idConsumo = $4, idProducto = $5 WHERE idConsumoDetalle = $1 RETURNING *', [id, cantidad, subtotal, idConsumo, idProducto]);
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM consumoDetalle WHERE idConsumoDetalle = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = ConsumoDetalle;
