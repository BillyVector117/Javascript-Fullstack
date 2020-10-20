// Archivo principal de configuración de rutas y servidor

// Si estamos en desarrollo, usa dotenv, (en producción marcara error ya que las variables de entorno no las encontrara)
if (process.env.NODE_ENV !== 'production') {
    require ('dotenv').config(); // Libreria para poder leer archivos .env
    console.log('Entrando en modo de: ', process.env.NODE_ENV)
}


const express = require('express');
const morgan = require('morgan') // Libreria, permite ver por consola lo que la aplicación en el cliente requiere.
const cors = require('cors'); // Permite el arranque de dos o mas servidores a la vez
const multer = require('multer'); // Libreria, procesar imágenes
const path = require('path'); // Usar __dirname
// INICIALIZAR EXPRESS
const app = express();

//Define conexión a la base de datos (path del archivo configurable)
require('./database');

// CONFIGURACIÓN EXPRESS
app.set('port', process.env.PORT || 4000); // Toma el puerto dinamico de Heroku, si no, el 3000

// MIDDLEWARES (Todos los middleware de express son funciones)
app.use(morgan('dev')); // Inicializar morgan
// Uso de dos o mas servidores a la vez
app.use(cors());

// Configuración multer
const storage = multer.diskStorage({
    // Obtenemos la ruta raiz a través del modulo 'path', y Node creara el directorio public/upload
    destination: path.join(__dirname, 'public/uploads'),

    filename(req, file, cb) { // Solicitud, el archivo, callback
        // El nombre del archivo sera la fecha modificada concatenada con la extensión (23582357231.ext)
        cb(null, new Date().getTime() + path.extname(file.originalname)); // null (No habra errores), crea una fecha, en formato tiempo, mas la extracción del nombre del archivo (Extensión)
    } 
})

// Usar multer, pasandole como parametro su Configuración, single por que solo supervisa un archivo ala vez, del input con el id 'image'
app.use(multer({storage}).single('image'));

// Interpreta los datos de cualquier formulario del frontend como tipo JSON, para extraer su información mas facil
app.use(express.urlencoded({extended: false}));

// Enviar peticiones JSON, interpreta las peticiones AJAX que haga al servidor
app.use(express.json());

// ROUTES
app.use('/api/books', require('./routes/books')); // Todas las rutas de books tendran ../api/books/...

// ARCHIVOS ESTATICOS
// Usa los archivos estaticos del directorio 'public' (html,css,js minificados)
app.use(express.static(path.join(__dirname, 'public')));

// ARRANQUE SERVER
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});