const express = require('express');
require('dotenv').config();
const cors = require('cors')


class Server{
   
    constructor(){
        this.app = express();
        this.port=process.env.PORT;
        this.usuariosPath='/api/usuarios'

        //Midelwares
        this.midddelwares();
        //Rutas
        this.routes();
  
    }

    midddelwares(){
        //cors
        this.app.use(cors())

        //Lectura y parse del body

        this.app.use(express.json())
        
        //Directorio publico
        this.app.use(express.static('public'));
         
    }
    
    routes(){
       this.app.use(this.usuariosPath,require('../routes/usuarios'))    
       
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidro corriendo en puerto',this.port)
        });
    }
}

module.exports=Server;