// src/pelicula/routes.js
import express from 'express';
// Importamos todos los controladores
import {
    handleInsertPeliculaRequest,
    handleGetPeliculasRequest,
    handleGetPeliculaByIdRequest,
    handleUpdatePeliculaByIdRequest,
    handleDeletePeliculaByIdRequest
} from './controller.js';

// Instancia de Router con nombre "peliculaRoutes"
const peliculaRoutes = express.Router();

// Definición de las rutas
peliculaRoutes.post('/pelicula', handleInsertPeliculaRequest);
peliculaRoutes.get('/peliculas', handleGetPeliculasRequest);
peliculaRoutes.get('/pelicula/:id', handleGetPeliculaByIdRequest);
// El documento dice "UPDATE" pero el verbo HTTP correcto es PUT
peliculaRoutes.put('/pelicula/:id', handleUpdatePeliculaByIdRequest);
peliculaRoutes.delete('/pelicula/:id', handleDeletePeliculaByIdRequest);

export default peliculaRoutes;