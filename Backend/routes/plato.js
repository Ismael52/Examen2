const express = require('express');
const router = express.Router();
const platoController = require('../controllers/platoController');

router.get('/', platoController.getAll);
router.get('/:id', platoController.getById);
router.post('/', platoController.create);
router.put('/:id', platoController.update);
router.delete('/:id', platoController.delete);

module.exports = router;
