const path = require('path'); // Requerir modulo path
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Libreria de Webpack para minificar archivos Html
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Verificar en que entorno estamos: Dev / Prod
const devMode = process.env.NODE_ENV !== 'production'; // Es una especie de pregunta, devuelve true si estamos en dev y false si es prod
console.log(devMode)

// Configuración de Webpack
module.exports = { 
    // Configuración compilar el código JAVASCRIPT
    entry: './frontend/app.js', // Selecciona archivo de entrada principal
    mode: 'production',
    output: { // Objeto para colocar el archivo convertido
        path: path.join(__dirname, 'backend/public'), // Desde el directorio actual, entra al directorio backend/public y coloca el archivo minificado 
        filename: 'js/bundle.js' // Nombre del archivo generado
    },

    // Objeto para configurar la compilación de CSS
    module: {
        rules: [
            {
                test: /\.css/, // Testea todos los archivos con extensión css
                use: [ // Una vez testeados los css, usa el modulo style-loader y css-loader
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader, // Si esta en Dev carga el css desde el archivo JavaScript,si esta en Prod, carga sus propios archivos de css 
                    'css-loader'
                ]   
            }
        ]
    },

    // Generamos un arreglo de objetos para configurar la compilación de HTML
    plugins: [
        new HtmlWebpackPlugin({
            template: './frontend/index.html', // La entrada, directorio de archivo Html a compilar...
            minify: { // Configuración de minificado
                collapseWhitespace: true, // Elimina espacios en blanco del Html
                removeComments: true, // Elimina los comentarios en el archivo de producción
                removeRedundantAttributes: true, // Elimina atributos redundantes en el Html
                removeScriptTypeAttributes: true, // Elimina los scripts de los atributos del Html
                removeStyleLinkTypeAttributes: true,  // Elimina los link atributes del Html
                useShortDoctype: true // Remplaza el doctype con el doctype minificado de Html5      
            }
        }),
        new MiniCssExtractPlugin({ // Configuración para generar el archivo css
            filename: 'css/bundle.css' // Nombre del archivo css compilado
        })
    ],
    devtool: 'source-map' // Propiedad para que muestre en terminal si hay errores
};