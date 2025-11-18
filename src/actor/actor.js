import { ObjectId } from 'mongodb';

// Schema "Actor"
export const Actor = {
    _id: ObjectId,
    idPelicula: String,
    nombre: String,
    edad: Number,
    estaRetirado: Boolean,
    premios: Array
};