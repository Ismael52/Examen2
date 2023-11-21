const express = require('express');
const router = express.Router();
const consumoDetalleController = require('../controllers/consumoDetalleController');

router.get('/', consumoDetalleController.getAll);
router.get('/:id', consumoDetalleController.getById);
router.post('/', consumoDetalleController.create);
router.put('/:id', consumoDetalleController.update);
router.delete('/:id', consumoDetalleController.delete);

module.exports = router;
