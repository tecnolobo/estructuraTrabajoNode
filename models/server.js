const express = require('express')
require('dotenv').config();
const cors = require('cors');
const { dbConection } = require('../DB/config');
const {socketControlador} = require('../sockets/socketControlador');


class Server {


  constructor(app){
    this.app = express();
    this.server = require('http').createServer(this.app);
    this.io = require('socket.io')(this.server);

    this.port = process.env.PORT|| 3000;
    this.usuarioPath = '/api/usuarios';
    this.authPath = '/api/auth';

    //Conectar a la Base de datos
    this.conectarBatabase();

    //midelware
    this.middelware();
    this.route();

    //sockets
    this.sockects();

  }

  async conectarBatabase (){
    await dbConection();
  }

  route(){

    this.app.use(this.usuarioPath,require('../route/users')); //cargamos las rutas de usuarios
    this.app.use(this.authPath,require('../route/auth')); //cargamos las rutas de usuarios

  }

  middelware(){

    this.app.use(cors());
    this.app.use(express.json()); // le decimos que express va recibir y devolver objetos json en peticiones http
    this.app.use(express.static('public')); //directorio publico

  }


  lister(){
    this.server.listen(this.port,()=>{
      console.log('Servidro corriendo en el puerto '+this.port);
    });

  }

  sockects(){
    this.io.on('connection', (socket)=>socketControlador(socket,this.io));
  }

}

module.exports=Server;