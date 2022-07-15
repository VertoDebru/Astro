const express = require('express');
const router = express.Router();

// Middlewares
// Controllers
const ctrlSigns = require('../controllers/signs');

router.get('/setyears', ctrlSigns.setChineseYears); // ADMIN
router.get('/years', ctrlSigns.getChineseYears);
router.get('/:type/', ctrlSigns.getSigns);
router.get('/:type/:id', ctrlSigns.getSigns);

module.exports = router;
