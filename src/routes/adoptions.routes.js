const { Router } = require('express');
const AdoptionsController = require('../controllers/adoptions.controller');

const router = Router();
const controller = new AdoptionsController();

module.exports = router;