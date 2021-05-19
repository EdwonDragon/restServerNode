const express = require('express');
require('dotenv').config();
const cors = require('cors');
const {
    dbConexion
} = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            usuariosPath: '/api/usuarios',
            authPath: '/api/auth',
            categoriasPath: '/api/categorias',
            productosPath: '/api/productos',
            buscarPath: '/api/buscar'
        }

        //Conexion a BD
        this.conexion();
        //Midelwares
        this.midddelwares();
        //Rutas
        this.routes();

    }

    async conexion() {
        await dbConexion();
    }

    midddelwares() {
        //cors
        this.app.use(cors())

        //Lectura y parse del body

        this.app.use(express.json())

        //Directorio publico
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.paths.usuariosPath, require('../routes/usuarios'));
        this.app.use(this.paths.authPath, require('../routes/auth'));
        this.app.use(this.paths.categoriasPath, require('../routes/categorias'));
        this.app.use(this.paths.productosPath, require('../routes/productos'));
        this.app.use(this.paths.buscarPath, require('../routes/buscar'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        });
    }
}

module.exports = Server;