const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'RestauranteUdi',
  password: 'aramayo',
  port: 5432, // El puerto por defecto de PostgreSQL es 5432
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
