const express = require('express');
const router = express.Router();
const servicioPlatoController = require('../controllers/servicioPlatoController');

router.get('/', servicioPlatoController.getAll);
router.get('/:id', servicioPlatoController.getById);
router.post('/', servicioPlatoController.create);
router.delete('/:id', servicioPlatoController.delete);

module.exports = router;
