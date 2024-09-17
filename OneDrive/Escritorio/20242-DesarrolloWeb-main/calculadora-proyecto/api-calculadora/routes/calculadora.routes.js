const express = require('express');
const router = express.Router();
const calculadoraController = require('./controllers/calculadoraController');

router.post('/v1/calculadora/sumar', calculadoraController.sumar);
router.post('/v1/calculadora/restar', calculadoraController.restar);
router.post('/v1/calculadora/multiplicar', calculadoraController.multiplicar);
router.post('/v1/calculadora/dividir', calculadoraController.dividir);
router.post('/v1/calculadora/evaluar', calculadoraController.evaluarEcuacion);
router.get('/v1/calculadora/historial', calculadoraController.obtenerHistorial);

module.exports = router;