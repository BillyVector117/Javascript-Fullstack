// Modulo que interactua con el DOM

import BookService from './services/BookService';
// const BookService = require('./services/BookService');
const bookService = new BookService(); // Instanciar un nuevo objeto de la clase BookService (contiene métodos para crud)

import { format } from 'timeago.js'; // Importa el método format de la libreria timeago (modifica los timestamp a tiempo transcurrido actual)
class UI {

    // Método que se ejecutara apenas inicia la aplicación (Muestra/renderiza libros obtenidos)
    async renderBooks() {
        const books = await bookService.getBooks(); // Captura de libros asincrona
        console.log(books); // Muestra los libros capturados desde el backend

        // Renderiza los libros en el elemento HTML
        const booksCardContainer = document.getElementById('books-cards'); // Captura el elemento HTML con dicho id
        booksCardContainer.innerHTML = ''; // Garantizar que el espacio este vacio (Asi no se duplicaran elementos)
        // Iteración, por cada libro capturado desde el backend realiza...
        books.forEach(book => {
            // Crea una tarjeta en donde colocaremos cada libro iterado
            const div = document.createElement('div'); // Crea un elemento 'div' HTML
            div.className = ''; // Agrega una clase al div creadó
            // Dento del div, inserta esta porción de estuctura HTML ( Para cada iteración de libro)
            div.innerHTML = `
                <div class="card m-2" id="card">
                    <div class="row">
                        <div class="col-md-4 gh">
                            <img src="${book.imagePath}" alt="" class="img-fluid" />
                        </div>
                            <div class="col-md-8">
                                <div class="card-block px-2">
                                <h4 class="card-title">${book.title}</h4>
                                <p class="card-text">${book.author}</p>
                                <a href="#" class="btn btn-danger delete" _id="${book._id}">X</a>
                            </div>
                        </div>
                    </div>
                        <div class="card-footer">
                        ${format(book.created_at)}
                        </div>
                    </div>
                 `;
    // Agregamos la estructura HTML recien creada a este elemento HTML seleccionadó
        booksCardContainer.appendChild(div);
        })
    }
 
    // Método que se ejecuta al dar Submit en el formulario
    async addANewBook(book) { // Recibe por parametro un objeto libro
        await bookService.postBook(book); // De los métodos crud de BookService, usar el POST (postBook) y pasarle por parametro los datos del formulario virtual
        //Una vez finalize de agregar el libro, limpia los inputs del formulario
        this.clearBookForm();
        // Al dar submit a un nuevo libro, este se mostrara sin recargar la página por el metodo de renderBooks
        this.renderBooks(); // Ejecuta el método para renderizar, mostrar los libros capturados (tiene la lógica para mostrar todos los libros creados)
    }

    // Método para limpiar los datos del formulario al ingresar un nuevo libro
    async clearBookForm() {
        document.getElementById('book-form').reset(); // Captura el id del formulario y resetea sus datos 
    }

    // Método para crear un elemento (div) y mostrar un mensaje al eliminar o agregar un libro
    async renderMessage(message, colorMessage, secondsToRemove) { // Mensaje que se mostrara, color del mensaje y el tiempo para removerlo
        const div = document.createElement('div'); // Crea un elemento HTML de tipo 'div'
        div.className = `alert alert-${colorMessage} message `; // En base a agregar o eliminar un libro la alerta sera verde / roja
        div.appendChild(document.createTextNode(message)); // Inserta dentro del div recien creado el mensaje (parametro)
        const container = document.querySelector('.col-md-4') // Selecciona el elemento HTML con la clase col-md-4 ( el contenedor de todo el formulario, ya que el mensaje se mostrara sobre esté)
        const bookForm = document.querySelector('#book-form') // Selecciona el elemento HTML con id book-form (formulario)
        container.insertBefore(div, bookForm) // Desde el contenedor seleccionado, inserta el div (mensaje) antes del bookForm
        setTimeout(() => {
          document.querySelector('.message').remove(); // Selecciona el elemento con la clase message (Alerta) y eliminalo...
        }, secondsToRemove); // Solo dura cierto tiempo ( tiempo pasado como parametro al método)
    }

    async deleteBook(bookId) {
        await bookService.deleteBook(bookId); // Elimina el libro, el bookId es el parametro pasado al darle click en delete, 
        this.renderBooks(); // // Ejecuta el método para renderizar, mostrar los libros capturados (tiene la lógica para mostrar todos los libros creados), Asi se recarga la página sola
    }
}

export default UI;
//module.exports = UI;