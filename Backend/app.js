const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Importar las rutas
const tipoPlatoRoutes = require('./routes/tipoplato');
const platoRoutes = require('./routes/plato');
const productoRoutes = require('./routes/productos');
const usuarioRoutes = require('./routes/usuarios');
const servicioRoutes = require('./routes/servicio');
const servicioPlatoRoutes = require('./routes/servicioplato');
const reservaRoutes = require('./routes/reservas');
const consumoRoutes = require('./routes/consumos');
const consumoDetalleRoutes = require('./routes/consumoDetalle');

const app = express();

// Configuraciones básicas
app.use(bodyParser.json());
app.use(cors());

// Configurar las rutas
app.use('/tipoPlato', tipoPlatoRoutes);
app.use('/plato', platoRoutes);
app.use('/producto', productoRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/servicio', servicioRoutes);
app.use('/servicioPlato', servicioPlatoRoutes);
app.use('/reserva', reservaRoutes);
app.use('/consumo', consumoRoutes);
app.use('/consumoDetalle', consumoDetalleRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
