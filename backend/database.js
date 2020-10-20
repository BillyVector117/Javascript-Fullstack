require('dotenv').config();
const mongoose = require('mongoose') // Libreria para conectar a MongoDB
// Acceder a variables de entorno
process.env.MONGODB_URI

// Conexión a mongoDB, a través del protocolo de mongoDB, conectate al localhost y conecta al nombre de la db colocada
mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true // Objeto para que no de alertas en terminal
})
    .then(db => console.log('DB connected')) // Exito al conectarse
    .catch( err => console.error(err)) // Error al conectarse