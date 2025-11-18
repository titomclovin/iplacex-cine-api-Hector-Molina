import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://Hector_Molina:Molinax32@eva-u3-express.li8pct8.mongodb.net/?appName=eva-u3-express";

// Crea un cliente de MongoClient con las opciones necesarias
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Exportamos el cliente para usarlo en otros archivos
export default client;