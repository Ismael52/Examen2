const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaControllers');

router.get('/', reservaController.getAll);
router.get('/:id', reservaController.getById);
router.post('/', reservaController.create);
router.put('/:id', reservaController.update);
router.delete('/:id', reservaController.delete);

module.exports = router;
