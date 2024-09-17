const operations = require('../operations');

// Array para almacenar el historial
let historial = [];

// Función para agregar una entrada al historial
const agregarAlHistorial = (operacion, datos, resultado) => {
  historial.push({
    timestamp: new Date(),
    operacion,
    datos,
    resultado
  });
  
  // Limitar el historial a las últimas 100 entradas para evitar un crecimiento indefinido
  if (historial.length > 100) {
    historial = historial.slice(-100);
  }
};

exports.sumar = (req, res) => {
  const { number1, number2 } = req.body;
  const resultado = operations.sumar(Number(number1), Number(number2));
  agregarAlHistorial('suma', { number1, number2 }, resultado);
  res.json({ resultado, historial: historial.slice(-5) });
};

exports.restar = (req, res) => {
  const { number1, number2 } = req.body;
  const resultado = operations.restar(Number(number1), Number(number2));
  agregarAlHistorial('resta', { number1, number2 }, resultado);
  res.json({ resultado, historial: historial.slice(-5) });
};

exports.multiplicar = (req, res) => {
  const { number1, number2 } = req.body;
  const resultado = operations.multiplicar(Number(number1), Number(number2));
  agregarAlHistorial('multiplicación', { number1, number2 }, resultado);
  res.json({ resultado, historial: historial.slice(-5) });
};

exports.dividir = (req, res) => {
  const { number1, number2 } = req.body;
  const resultado = operations.dividir(Number(number1), Number(number2));
  agregarAlHistorial('división', { number1, number2 }, resultado);
  res.json({ resultado, historial: historial.slice(-5) });
};

exports.evaluarEcuacion = (req, res) => {
  const { ecuacion } = req.body;
  const resultado = operations.evaluarEcuacion(ecuacion);
  agregarAlHistorial('ecuación', { ecuacion }, resultado);
  res.json({ resultado, historial: historial.slice(-5) });
};

// Nuevo endpoint para obtener el historial completo
exports.obtenerHistorial = (req, res) => {
  res.json({ historial });
};