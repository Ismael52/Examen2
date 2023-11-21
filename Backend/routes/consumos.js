const express = require('express');
const router = express.Router();
const consumoController = require('../controllers/consumoController');

router.get('/', consumoController.getAll);
router.get('/:id', consumoController.getById);
router.post('/', consumoController.create);
router.put('/:id', consumoController.update);
router.delete('/:id', consumoController.delete);

module.exports = router;
