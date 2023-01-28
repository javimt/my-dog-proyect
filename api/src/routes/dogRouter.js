const axios = require('axios');
const { Router } = require('express');
const { /* getAllApiData */ getAllDogs, getDogsId, createDog } = require('../controllers');

const router = Router();

router.get('/', getAllDogs);
router.get('/:id', getDogsId);
router.get('/', createDog);

module.exports = router