const pool = require('../db'); // Asumiendo que tienes una conexión a la base de datos

class Producto {
  static async getAll() {
    const result = await pool.query('SELECT * FROM producto');
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM producto WHERE idProducto = $1', [id]);
    return result.rows[0];
  }

  static async create(nombre, descripcion, foto, precio, stock, estado) {
    const result = await pool.query('INSERT INTO producto (nombre, descripcion, foto, precio, stock, estado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [nombre, descripcion, foto, precio, stock, estado]);
    return result.rows[0];
  }

  static async update(id, nombre, descripcion, foto, precio, stock, estado) {
    const result = await pool.query('UPDATE producto SET nombre = $2, descripcion = $3, foto = $4, precio = $5, stock = $6, estado = $7 WHERE idProducto = $1 RETURNING *', [id, nombre, descripcion, foto, precio, stock, estado]);
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM producto WHERE idProducto = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = Producto;
