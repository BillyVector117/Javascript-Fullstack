const {Router} = require('express'); // Requerir el método Router de express
const router = Router(); // Guardamos el método Router
const {unlink} = require('fs-extra'); // Modulo de NodeJS para remplazar su otro modulo fs, solo que este SI soporta promesas (gestiona, actualiza, edita, elimina, etc), solo usamos su método unlink, no tdodo el modulo (fs)
const path = require('path'); // Requerir modulo path para trabajar con ficheros y directorios

// Requerir y guardar el modelo de los libros de la base de datos
const Book = require('../models/Book');

// Primer ruta (Obtiene documento / datos de la base de datos)
router.get('/', async (req, res) => { // Se puede usar Promises, Callbacks o Async/ Await
    const books = await Book.find(); // Traera de la base de datos los libros que encuentre (Consulta a libros/SELECT)
    res.json(books); // La respuesta sera en formato json
});

// Segunda ruta (Simulación del envio de un formulario / Crea un documento en la base de datos)
router.post('/', async (req, res) => { // Se puede usar Promises, Callbacks o Async/ Await
    const { title, author, isbn } = req.body; // Guarda los datos de esas propiedades de la base de datos (enviadas por el formulario)
    console.log(req.body); // Simulación del cuerpo del formulario enviado
    const imagePath = '/uploads/' + req.file.filename; // Captura el nombre de la IMAGEN seleccionada dentro del formulario y luego la guarda en esa ruta
    const newBook = new Book({title, author, isbn, imagePath}); // Crea un nuevo libro con los datos recien extraidos del formulario
    await newBook.save(); // Guarda en la base de datos el libro que recien se creó
    console.log(newBook) // Muestra en terminal el libro creado
    res.json({'message': 'Book Saved'}); // Mensaje recibido de exito al guardar
});

// Tercer ruta (Elimina un libro / Elimina un documento de la base de datos)
router.delete('/:id', async (req, res) => { // Se puede usar Promises, Callbacks o Async/ Await (Obtiene el id del libro, parte final del URL)
    console.log(req.params.id); // Muestra el id del libro a eliminar (parte final del URL)
    const book = await Book.findByIdAndDelete(req.params.id); // Elimina el documento / libro buscando en la base de datos el id (Es un evento asincrono)
    // Usa el método unlink para eliminar la imagen del libro seleccionado
    unlink(path.resolve('./backend/public' + book.imagePath)) // con path.resolve llegamos a la ruta absoluta de la imagen del libro y asi eliminar solo ese archivo
    console.log('Libro e imagen eliminados: ', book);
    res.json({'message': 'Book deleted'}); // Mensaje Libro eliminado
});

module.exports = router;