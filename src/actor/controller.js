
import { ObjectId } from 'mongodb';
import client from '../common/db.js';
import { Actor } from './actor.js';

// Constante global
const actorCollection = client.db('cine-db').collection('actores');
// Necesitamos la colección de películas para validar
const peliculaCollection = client.db('cine-db').collection('peliculas');

// Controlador para insertar un actor
export const handleInsertActorRequest = async (req, res) => {
    let data = req.body;
    let peliculaOid;

    // "validar que el _id de la película... exista"
    // El schema de Actor define idPelicula como "sstring"
    try {
        peliculaOid = new ObjectId(data.idPelicula);
    } catch (e) {
        return res.status(400).send('Id de película (idPelicula) mal formado');
    }

    // Buscamos si la película
    const peliculaExiste = await peliculaCollection.findOne({ _id: peliculaOid });
    
    if (!peliculaExiste) {
        // Si no existe, retornamos un error 404
        return res.status(404).send({ message: "La película asignada (idPelicula) no existe." });
    }

    // Si la película existe, procedemos a crear el actor
    let actor = Actor;
    actor.idPelicula = data.idPelicula;
    actor.nombre = data.nombre;
    actor.edad = data.edad;
    actor.estaRetirado = data.estaRetirado;
    actor.premios = data.premios;

    await actorCollection.insertOne(actor)
        .then((data) => {
            // Retorna código 201: creado
            return res.status(201).send(data);
        })
        .catch((e) => {
            // Retorna código 500: error genérico
            console.log(e);
            return res.status(500).send({ code: e });
        });
};

// Controlador para obtener TODOS los actores
export const handleGetActoresRequest = async (req, res) => {
    await actorCollection.find({}).toArray()
        .then((data) => {
            return res.status(200).send(data); // 200 OK 
        })
        .catch((e) => {
            console.log(e);
            return res.status(500).send({ code: e.code }); // 500 error 
        });
};

// Controlador para obtener UN actor por ID
export const handleGetActorByIdRequest = async (req, res) => {
    let id = req.params.id;
    let oid;

    try {
        oid = new ObjectId(id);
    } catch (e) {
        return res.status(400).send('Id mal formado'); // 400 bad request
    }

    await actorCollection.findOne({ _id: oid })
        .then((data) => {
            if (data === null) {
                return res.status(404).send(data); // 404 not found 
            }
            return res.status(200).send(data); // 200 OK 
        })
        .catch((e) => {
            console.log(e);
            return res.status(500).send({ code: e.code }); // 500 error 
        });
};

// Controlador para obtener actores por ID de película
export const handleGetActoresByPeliculaRequest = async (req, res) => {
    // El ID de la película viene como 'string'
    let idPelicula = req.params.pelicula; 

    // No necesitamos convertir a ObjectId si lo guardamos como string
    await actorCollection.find({ idPelicula: idPelicula }).toArray()
        .then((data) => {
            if (data === null || data.length === 0) {
                 // 404 si no hay actores para esa película
                return res.status(404).send([]);
            }
            return res.status(200).send(data); // 200 OK 
        })
        .catch((e) => {
            console.log(e);
            return res.status(500).send({ code: e.code }); // 500 error 
        });
};