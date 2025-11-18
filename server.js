// server.js
import express from 'express';
import cors from 'cors';
import client from './src/common/db.js'; // Cliente de DB [cite: 1526]
import peliculaRoutes from './src/pelicula/routes.js'; // Rutas Pelicula 
import ActorRoutes from './src/actor/routes.js'; // Rutas Actor 

// Puerto 3000 o 4000 [cite: 1519]
const PORT = process.env.PORT || 3000;
const app = express();

// Middlewares [cite: 1520]
app.use(cors()); // Configuración de CORS [cite: 1520]
app.use(express.json()); // Para parsear JSON
app.use(express.urlencoded({ extended: true })); // Para parsear cuerpos URL-encoded

// Ruta por defecto GET [cite: 1521]
app.get('/', (req, res) => {
    return res.status(200).send('Bienvenido al cine Iplacex');
});

// Rutas personalizadas como middleware con prefijo /api [cite: 1522]
app.use('/api', peliculaRoutes);
app.use('/api', ActorRoutes);

// Función para iniciar el servidor
const startServer = async () => {
    try {
        // CONECTAR A ATLAS [cite: 1523]
        await client.connect();
        // Mensaje de éxito conexión Atlas [cite: 1524]
        console.log('✅ Conexión a MongoDB Atlas exitosa.');

        // LEVANTAR SERVIDOR EXPRESS (SOLO SI LA CONEXIÓN FUE EXITOSA) [cite: 1523]
        app.listen(PORT, () => {
            // Mensaje de éxito servidor Express [cite: 1524]
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });

    } catch (e) {
        // Mensaje de error conexión Atlas [cite: 1524]
        console.error('❌ Error al conectar a MongoDB Atlas:', e);
        process.exit(1); // Termina el proceso si no se puede conectar
    }
};

// Ejecutamos la función de inicio
startServer();