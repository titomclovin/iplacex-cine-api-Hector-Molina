import { ObjectId } from 'mongodb';

// schema "Pelicula" 
export const Pelicula = {
    _id: ObjectId,
    nombre: String,
    generos: Array,
    anioEstreno: Number
};