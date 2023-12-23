const { Socket } = require("socket.io");
const { verifJwtFromSocket } = require("../midelware");
const ChatMensajes = require('../models/chat-mensajes');

const chat = new ChatMensajes();
//Eliminar socket=new Socket para evitar errores
const socketControlador = async(socket = new Socket, io) =>{

  const token = socket.handshake.headers.x_token;
  
  let usuario = await verifJwtFromSocket(token);
  if(!usuario){
    return socket.disconnect();
  }
  
  chat.conectarUsuario(usuario);

  //Conectamos el usuario a una sala independiente
  socket.join(usuario.id);//conectamos al usuario con la sala del id de si mismo. para que aqui reciba mensajes privados


  io.emit('usuario-activos',chat.usuarioArr);
  io.emit('recibir-mensajes',chat.ultimos10);

  //console.log(usuario.id);
  //Limiar cuando alguien se desconecta
  socket.on('disconnect',()=>{
      chat.desconectarUsuario(usuario.id);
      io.emit('usuario-activos',chat.usuarioArr);
  });

  socket.on('enviarMensaje',({uid,mensaje})=>{
    
    if(uid){
      //mensajes privado
      console.log('Enviadno proivado '+uid);
      socket.to(uid).emit('mensaje-privado',{de:usuario.nombre,mensaje});
    }else{
      chat.enviarMensaje(usuario.id,usuario.nombre,mensaje);
      io.emit('recibir-mensajes',chat.ultimos10); 
    }
    
    //io.emit('usuario-activos',chat.usuarioArr);
});

  
  


}

module.exports = {socketControlador};