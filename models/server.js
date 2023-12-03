const express = require('express')
require('dotenv').config();
const cors = require('cors')

class Server {


  constructor(app){
    this.app = express();
    this.port = process.env.PORT;
    this.usuarioPath = '/api/usuarios';

    //midelware
    this.middelware();
    this.route();
  }

  route(){

    this.app.use(this.usuarioPath,require('../route/users')); //cargamos las rutas de usuarios

  }

  middelware(){

    this.app.use(cors());
    this.app.use(express.json()); // le decimos que express va recibir y devolver objetos json en peticiones http
    this.app.use(express.static('public')); //directorio publico

  }


  lister(){
    this.app.listen(this.port,()=>{
      console.log('Servidro corriendo en el puerto '+this.port);
    });

  }

}

module.exports=Server;