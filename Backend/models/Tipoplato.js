const pool = require('../db'); // Asumiendo que tienes una conexión a la base de datos

class TipoPlato {
  static async getAll() {
    const result = await pool.query('SELECT * FROM tipoPlato');
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM tipoPlato WHERE idtipoPlato = $1', [id]);
    return result.rows[0];
  }

  static async create(nombre, descripcion) {
    const result = await pool.query('INSERT INTO tipoPlato (nombre, descripcion) VALUES ($1, $2) RETURNING *', [nombre, descripcion]);
    return result.rows[0];
  }

  static async update(id, nombre, descripcion) {
    const result = await pool.query('UPDATE tipoPlato SET nombre = $2, descripcion = $3 WHERE idtipoPlato = $1 RETURNING *', [id, nombre, descripcion]);
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM tipoPlato WHERE idtipoPlato = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = TipoPlato;
