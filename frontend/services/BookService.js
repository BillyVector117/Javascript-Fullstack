class BookService {

    constructor() {
        this.URI = '/api/books';
    }
    // Método para obtener libros
    async getBooks() {
        // Petición GET, hacer una petición a this.URI
        const response = await fetch(this.URI);
        // la respuesta es un String, por lo que se tendra que convertir a JSON
        const books = response.json(); // Conversión de datos
        console.log(books)
        return books;
    }

    // Método para guardar un libro
    async postBook(book) {
        let res = await fetch(this.URI, { // Petición fetch a this.URI con cabeceras
            method:'POST', // Se usara método POST
            body: book // El cuerpo sera el dato que se envira al backend (book)
        })
        .then(res => res.json())
        .then(data => {console.log(data)})
        .catch(err=> console.log(err))
        //let data = await res.json(); // Guarda la respuesta en formato JSON
        /* console.log('book added: ', data); */
        
        // return data;
    }
 
    // Método para eliminar un libro ( Se hara una petición delete al URL del libro en especifico)
    async deleteBook(bookId) { // Ej. (http://localhost:4000/api/books/${Id del libro a eliminar}), se concatena el url con el id del libro
        const response = await fetch(`${this.URI}/${bookId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'Delete' // Usa el método delete
        });
        const data = await response.json();
        console.log(data);
    }
}
export default BookService;
//module.exports = BookService;