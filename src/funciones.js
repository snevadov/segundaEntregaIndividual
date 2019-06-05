//requiero filesystem
const fs = require('fs');

//Defino lista de cursos
listaCursos = [];

//Función para crear el curso
const crear = (curso) => {
	
	//Creo mensajes por defecto
	let mensaje = 'No se pudo crear el curso';
	let exito = false;
	let respuesta = {};

	//Listo los cursos
	listar();

	//Armo el objeto de curso
	let nuevoCurso = {
		nombre: curso.nombre,
		id: curso.id,
		descripcion: curso.descripcion,
		valor: curso.valor,
		modalidad: curso.modalidad,
		intensidad: curso.intensidad,
		estado: curso.estado
	};

	//Valido que no permita guardar duplicados
	let duplicado = listaCursos.find(cur => cur.id === curso.id);
	if(!duplicado)
	{
		listaCursos.push(nuevoCurso);
		guardar();
		mensaje = "El curso fue creado de manera exitosa";
		exito = true;
	}
	else
	{
		mensaje = "Ya existe otro curso con ese id";
		exito = false;
	}

	//Edito el objeto de la respuesta
	respuesta = {
		exito:exito, 
		mensaje:mensaje
	};

	return respuesta;

}

//Función con la que obtengo el listado de cursos
const listar = () => {
	try{
		//Se puede usar require o JSON.parse

		//Require trae la variable y permanece más en el tiempo
		listaCursos = [];
		listaCursos = require('../listado.json');

		//JSON.parse para manera asincrónica
		//listaCursos = JSON.parse(fs.readFileSync('listado.json'));
	} 
	catch(error){
		//Si no hay nada, inicia vacía
		listaCursos = [];
	}
}

//Función para almacenar en archivo
const guardar = () => {
	let datos = JSON.stringify(listaCursos);
	fs.writeFile('listado.json', datos, (err)=>{
		if(err) throw (err);
		console.log('Archivo creado con éxito');
	})
}

//Función con la que obtengo el listado de cursos
const getListado = () => {
	listar();
	return listaCursos;
}


module.exports = {
	crear,
	getListado
}