const { Schema, model } = require('mongoose') // métodos de la Libreria configuración mongoDB, 

// Crear modelo/ estructura/ Esquema de la base de datos, Esquema(Es una clase)

const BookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true },
    imagePath: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

// Esportar un modelo (Puede ser este modelo u otro que creemos)
module.exports = model('Book', BookSchema); // Primer parametro nombre del esquema a usar, y segundo el esquema a exportar