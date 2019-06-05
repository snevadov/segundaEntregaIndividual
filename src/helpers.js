// Manejo de hbs
const hbs = require('hbs');
//Manejo de las funciones
const funciones = require('./funciones');

//Helper para crear curso
hbs.registerHelper('crearCurso', (curso) => {
	return funciones.crear(curso);
})