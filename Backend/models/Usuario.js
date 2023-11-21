const pool = require('../db'); // Asumiendo que tienes una conexión a la base de datos

class Usuario {
  static async getAll() {
    const result = await pool.query('SELECT * FROM usuario');
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM usuario WHERE idUsuario = $1', [id]);
    return result.rows[0];
  }

  static async create(nombres, apellidos, correo, contraseña, telefono, estado, foto) {
    let esAdmin = false;
    let esAnfitrion = false;
  
    const adminCount = await pool.query('SELECT COUNT(*) FROM usuario WHERE esAdmin = true');
    if (adminCount.rows[0].count === '0') {
      esAdmin = true;
    }
  
    const result = await pool.query('INSERT INTO usuario (nombres, apellidos, correo, contraseña, telefono, estado, esAdmin, esAnfitrion, foto) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [nombres, apellidos, correo, contraseña, telefono, estado, esAdmin, esAnfitrion, foto]);
    return result.rows[0];
  }
  
  

  static async update(id, nombres, apellidos, correo, contraseña, telefono, estado, esAdmin, esAnfitrion, foto) {
    const result = await pool.query('UPDATE usuario SET nombres = $2, apellidos = $3, correo = $4, contraseña = $5, telefono = $6, estado = $7, esAdmin = $8, esAnfitrion = $9, foto = $10 WHERE idUsuario = $1 RETURNING *', [id, nombres, apellidos, correo, contraseña, telefono, estado, esAdmin, esAnfitrion, foto]);
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM usuario WHERE idUsuario = $1 RETURNING *', [id]);
    return result.rows[0];
  }

  static async getByCorreoContraseña(correo, contraseña) {
    const result = await pool.query('SELECT * FROM usuario WHERE correo = $1 AND contraseña = $2', [correo, contraseña]);
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null; // Si no se encuentra el usuario, devuelve null
    }
  }
  
}

module.exports = Usuario;
