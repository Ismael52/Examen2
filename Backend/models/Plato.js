const pool = require('../db'); // Asumiendo que tienes una conexión a la base de datos

class Plato {
  static async getAll() {
    const result = await pool.query('SELECT * FROM plato');
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM plato WHERE idPlato = $1', [id]);
    return result.rows[0];
  }

  static async create(nombre, descripcion, foto, estado, idTipoPlato) {
    const result = await pool.query('INSERT INTO plato (nombre, descripcion, foto, estado, idTipoPlato) VALUES ($1, $2, $3, $4, $5) RETURNING *', [nombre, descripcion, foto, estado, idTipoPlato]);
    return result.rows[0];
  }

  static async update(id, nombre, descripcion, foto, estado, idTipoPlato) {
    const result = await pool.query('UPDATE plato SET nombre = $2, descripcion = $3, foto = $4, estado = $5, idTipoPlato = $6 WHERE idPlato = $1 RETURNING *', [id, nombre, descripcion, foto, estado, idTipoPlato]);
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM plato WHERE idPlato = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = Plato;
