//Requiero express: >npm i express
//Requiero hbs: >npm i hbs}
//Requiero body-parser: >npm i body-parser
const express = require('express');
const app = express();
const path = require('path');
//Manejo de hbs
const hbs = require('hbs');
//Manejo de body Parser
const bodyParser = require('body-parser');
//Manejo de las funciones
const funciones = require('./funciones');
//Manejo de helpers
require('./helpers');

//Directorios
const directorioPublico = path.join(__dirname, '../public');
const directorioPartials = path.join(__dirname, '../template/partials');
//Manejo de node_modules
const dirNode_modules = path.join(__dirname , '../node_modules');

//Agrego la ruta de directorio público
app.use(express.static(directorioPublico));
//registro los partials (código que repetiré)
hbs.registerPartials(directorioPartials);
//Manejo de Body-Parser
app.use(bodyParser.urlencoded({extended: false}));

//Manejo de bootstrap
app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));

app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'));

//Manejo de vistas
app.set('views', path.join(__dirname, '../template/views'));

//Activo el manejo de hbs
app.set('view engine', 'hbs');

// Página al index
app.get('/',(req, res) => {
	res.render('index', {
		titulo: 'Inicio'
	});
});

// Página para crear
app.get('/crear',(req, res) => {
	res.render('crear', {
		titulo: 'Creación de cursos'
	});
});

// Página creacioncurso via helper post
app.post('/crear',(req, res) => {
	
	let curso = {
			nombre: req.body.nombre,
			id: parseInt(req.body.id),
			descripcion: req.body.descripcion,
			valor: parseInt(req.body.valor),
			modalidad: req.body.modalidad,
			intensidad: parseInt(req.body.intensidad),
			estado:"Disponible"
		};

	let respuesta = funciones.crear(curso);

	res.render('creacion', {
		respuesta: respuesta,
		titulo: 'Resultado creación de cursos'
	});
});

// Página diferente al index
app.get('*',(req, res) => {
	res.render('error', {
		titulo: 'Error!'
	});
});

//Ejecuto el express por el puerto 3000
app.listen(3000, () => {
	console.log('Escuchando en el puerto 3000');
});