const pool = require('../db');

class ServicioPlato {
  static async getAll() {
    const result = await pool.query('SELECT * FROM servicioPlato');
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM servicioPlato WHERE idServicioPlato = $1', [id]);
    return result.rows[0];
  }

  static async create(idServicio, idPlato) {
    const result = await pool.query('INSERT INTO servicioPlato (idServicio, idPlato) VALUES ($1, $2) RETURNING *', [idServicio, idPlato]);
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM servicioPlato WHERE idServicioPlato = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = ServicioPlato;
