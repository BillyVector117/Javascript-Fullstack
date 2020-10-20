import "./styles/app.css";
//require('./styles/app.css'); // Requerimos el css para que Webpack lo compile

//const UI = require('./UI.js');
import UI from './UI.js';

// Apenas cargue la aplicación ejecuta esta función
document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI(); // Instanciamos nuevo objeto de UI (Asi podremos usar sus métodos)
    ui.renderBooks(); // Ejecutamos su método para mostrar/renderizar libros (El método enlista los libros capturados)
})
document.getElementById('book-form')
    .addEventListener('submit', function (e) {
        // Capturar valor de cada imput 
        let title = document.getElementById('title').value;
        let author = document.getElementById('author').value;
        let isbn = document.getElementById('isbn').value;
        let image = document.getElementById('image').files;

        // Creación de formulario virtual para pasarle TODOS los datos al BookServices por su método POST (Sera un solo objeto)
        let formData = new FormData(); // Instancia de formulario virtual
        // Agregar al formulario virtual propiedades clave-valor
        formData.append('image', image[0]);
        formData.append('title', title);
        formData.append('author', author);
        formData.append('isbn', isbn);

        let ui =  new UI(); //  Instanciamos un nuevo objeto de la clase UI, contiene métodos para el DOM
        ui.addANewBook(formData); // Usa el método para agregar un nuevo libro en UI (addANewBook) pasandole por parametro los datos agrupados del formulario virtual
        console.log('succefully added');
        // Una vez guardado el libro, ejecuta el método para mostrar alerta de guardado
        ui.renderMessage('new Book Added', 'success', 3000);
        e.preventDefault();
    });

    document.getElementById('books-cards') // Selecciona el elemento HTML con id books-cards (lado derecho)
        .addEventListener('click', e => { // Agrega un evento al dar click...
            // Ejecuta una validación, si el elemento clickeado contiene la clase 'delete', (botón eliminar)
            if ( e.target.classList.contains('delete')) {
                let ui =  new UI(); // Instanciamos un nuevo objeto de la clase UI, para usar su método de eliminar
                ui.deleteBook(e.target.getAttribute('_id')); // Se elimina el libro
                console.log( 'Eliminando elementos de: ', e.target.getAttribute('_id')) // Obtenemos el id del libro (el botón tiene como propiedad el mismo id del libro)
                // Una vez guardado el libro, ejecuta el método para mostrar alerta de eliminado
                ui.renderMessage('Book Removed', 'danger', 3000);
            }
            e.preventDefault();
        });