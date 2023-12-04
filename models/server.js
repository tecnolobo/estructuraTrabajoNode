const express = require('express')
require('dotenv').config();
const cors = require('cors');
const { dbConection } = require('../DB/config');

class Server {


  constructor(app){
    this.app = express();
    this.port = process.env.PORT|| 3000;
    this.usuarioPath = '/api/usuarios';

    //Conectar a la Base de datos
    this.conectarBatabase();

    //midelware
    this.middelware();
    this.route();
  }

  async conectarBatabase (){
    await dbConection();
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