import express from 'express';
// controladores
import {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaRequest
} from './controller.js';

// Instancia de router
const ActorRoutes = express.Router();

// Definición de las rutas
ActorRoutes.post('/actor', handleInsertActorRequest);
ActorRoutes.get('/actores', handleGetActoresRequest);
ActorRoutes.get('/actor/:id', handleGetActorByIdRequest);
ActorRoutes.get('/actor/pelicula/:pelicula', handleGetActoresByPeliculaRequest);

export default ActorRoutes;