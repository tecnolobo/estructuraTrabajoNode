const express = require('express')
require('dotenv').config();
const cors = require('cors');
const { dbConection } = require('../DB/config');

class Server {


  constructor(app){
    this.app = express();
    this.port = process.env.PORT|| 3000;

    this.paths = {
      usaurio:'/api/usuarios',
      auth:'/api/auth',
      categorias:'/api/categorias',
      productos:'/api/productos',
      buscar:'/api/buscar'
    };

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

    this.app.use(this.paths.usaurio,require('../route/users')); //cargamos las rutas de usuarios
    this.app.use(this.paths.auth,require('../route/auth')); //cargamos las rutas de usuarios
    this.app.use(this.paths.categorias,require('../route/categorias')); //cargamos las rutas de usuarios
    this.app.use(this.paths.productos,require('../route/productos'));
    this.app.use(this.paths.buscar,require('../route/buscar')); 

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