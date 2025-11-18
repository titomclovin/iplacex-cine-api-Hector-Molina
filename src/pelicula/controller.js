import { ObjectId } from 'mongodb';
import client from '../common/db.js'; 
import { Pelicula } from './pelicula.js'; 

// Constante global para la colección
// Usamos la DB "cine-db"  y una colección "peliculas"
const peliculaCollection = client.db('cine-db').collection('peliculas');

// Controlador para insertar una película
export const handleInsertPeliculaRequest = async (req, res) => {
    let data = req.body;
    
    // Usamos el schema para asignar los campos
    let pelicula = Pelicula;
    pelicula.nombre = data.nombre;
    pelicula.generos = data.generos;
    pelicula.anioEstreno = data.anioEstreno;

    await peliculaCollection.insertOne(pelicula)
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

// Controlador para obtener TODAS las películas
export const handleGetPeliculasRequest = async (req, res) => {
    await peliculaCollection.find({}).toArray()
        .then((data) => {
            // Retorna código 200: exito 
            return res.status(200).send(data);
        })
        .catch((e) => {
            // Retorna código 500: error genérico 
            console.log(e);
            return res.status(500).send({ code: e.code });
        });
};

// Controlador para obtener UNA película por ID
export const handleGetPeliculaByIdRequest = async (req, res) => {
    let id = req.params.id;
    let oid;

    // Implementamos try-catch para la transformación a ObjectId 
    try {
        oid = new ObjectId(id);
    } catch (e) {
        // Si el ID está mal formado, retorna 400
        return res.status(400).send('Id mal formado');
    }

    await peliculaCollection.findOne({ _id: oid })
        .then((data) => {
            if (data === null) {
                // Retorna código 404: recurso no encontrado 
                return res.status(404).send(data);
            }
            // Retorna código 200: exito 
            return res.status(200).send(data);
        })
        .catch((e) => {
            // Retorna código 500: error genérico 
            console.log(e);
            return res.status(500).send({ code: e.code });
        });
};

// Controlador para actualizar 1 película por ID
export const handleUpdatePeliculaByIdRequest = async (req, res) => {
    let id = req.params.id;
    let oid;
    let data = req.body;
    
    // usamos el operador $set
    let query = { $set: data };

    // Implementamos try-catch para la transformación a ObjectId 
    try {
        oid = new ObjectId(id);
    } catch (e) {
        // si el ID está mal formado, retorna 400
        return res.status(400).send('Id mal formado');
    }

    await peliculaCollection.updateOne({ _id: oid }, query)
        .then((data) => {
            if (data === null || data.modifiedCount === 0) {
                // Retorna código 404: recurso no encontrado
                return res.status(404).send(data);
            }
            // retorna código 200: exito 
            return res.status(200).send(data);
        })
        .catch((e) => {
            // retorna código 500: error generico 
            console.log(e);
            return res.status(500).send({ code: e.code });
        });
};

// Controlador para eliminar 1 película por ID
export const handleDeletePeliculaByIdRequest = async (req, res) => {
    let id = req.params.id;
    let oid;

    // Implementamos try-catch para la transformación a ObjectId 
    try {
        oid = new ObjectId(id);
    } catch (e) {
        // Si el ID está mal formado, retorna 400
        return res.status(400).send('Id mal formado');
    }

    await peliculaCollection.deleteOne({ _id: oid })
        .then((data) => {
            if (data === null || data.deletedCount === 0) {
                // Retorna código 404: Recurso no encontrado (o no eliminado) 
                return res.status(404).send(data);
            }
            // Retorna código 200: exito 
            return res.status(200).send(data);
        })
        .catch((e) => {
            // Retorna código 500: error genérico 
            console.log(e);
            return res.status(500).send({ code: e.code });
        });
};