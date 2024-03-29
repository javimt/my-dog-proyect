const axios = require('axios');
const { Router } = require('express');
const { /* getAllApiData */ getAllDogs, getDogsId, createDog, deleteDog, updateDog } = require('../controllers/dogController.js');

const router = Router();

router.get('/', getAllDogs);
router.get('/:id', getDogsId);
router.post('/', createDog); 
router.delete('/:id', deleteDog);
router.put('/:id', updateDog);

module.exports = router