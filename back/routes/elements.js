const express = require('express');
const router = express.Router();

// Middlewares
// Controllers
const ctrlElements = require('../controllers/elements');

router.get('/', ctrlElements.getElements);
router.get('/:id', ctrlElements.getElements);

module.exports = router;
