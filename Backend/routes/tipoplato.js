const express = require('express');
const router = express.Router();
const tipoPlatoController = require('../controllers/tipoplatoController');

router.get('/', tipoPlatoController.getAll);
router.get('/:id', tipoPlatoController.getById);
router.post('/', tipoPlatoController.create);
router.put('/:id', tipoPlatoController.update);
router.delete('/:id', tipoPlatoController.delete);

module.exports = router;
