const sumar = (a, b) => a + b;
const restar = (a, b) => a - b;
const multiplicar = (a, b) => a * b;
const dividir = (a, b) => b !== 0 ? a / b : 'Error: División por cero';

const evaluarEcuacion = (ecuacion) => {
  try {
    // Usa una función segura para evaluar la ecuación
    // Esto es solo un ejemplo y no es seguro para producción
    return Function(`'use strict'; return (${ecuacion})`)();
  } catch (error) {
    return 'Error en la ecuación';
  }
};

module.exports = {
  sumar,
  restar,
  multiplicar,
  dividir,
  evaluarEcuacion
};