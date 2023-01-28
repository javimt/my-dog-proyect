const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routerDog = require('./dogRouter');
const routerTemperament = require('./temperamentRoute');

const router = Router();

router.use('/dogs', routerDog);
router.use('/tempers', routerTemperament);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
