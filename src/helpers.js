// Manejo de hbs
const hbs = require('hbs');
//Manejo de las funciones
const funciones = require('./funciones');

//Helper para listar curso
hbs.registerHelper('listar', () => {
	listaCursos = funciones.getListado();
	let texto = '<table class="table"> \
					<thead> \
						<th>ID</th> \
						<th>Nombre</th> \
						<th>Descripcion</th> \
						<th>Valor</th> \
						<th>Modalidad</th> \
						<th>Intensidad</th> \
						<th>Estado</th> \
					</thead> \
					<tbody>';

	listaCursos.forEach(curso => {
		texto = texto + 
		'<tr>' + 
			'<td>' + curso.id + '</td>' +
			'<td>' + curso.nombre + '</td>' +
			'<td>' + curso.descripcion + '</td>' +
			'<td>' + curso.valor + '</td>' +
			'<td>' + ((curso.modalidad)? curso.modalidad : "") + '</td>' +
			'<td>' + ((curso.intensidad)? curso.intensidad : "") + '</td>' +
			'<td>' + curso.estado + '</td> \
		</tr>';
	})
	texto = texto + '</tbody> \
		</table>'
	console.log("EJECUTADO");
	return texto;
});