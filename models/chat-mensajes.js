class Mensaje{
  constructor(uid,nombre,mensaje){
    this.uid= uid;
    this.nombre=nombre;
    this.mensaje= mensaje;
  }
}


class ChatMensajes {
  constructor(){
    this.mensajes =[];
    this.usaurios={};
  }
  
  get ultimos10(){
    this.mensajes= this.mensajes.slice(0,10);
    return this.mensajes;
  }

  get usuarioArr(){
    return Object.values(this.usaurios);
  }

  enviarMensaje(uid,nombre,mensaje){
    this.mensajes.unshift(
      new Mensaje(uid,nombre,mensaje)
    );
  }


  conectarUsuario(usuario){
    this.usaurios[usuario.id] = usuario;
  }

  desconectarUsuario(id){
    delete this.usaurios[id];
  }

}

module.exports=ChatMensajes;