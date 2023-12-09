const {Schema, model} = require('mongoose');

const usuarioScheme = Schema({
  nombre:{
    type:String,
    required:[true, 'El nombre es obligatorio']
  },
  correo:{
    type:String,
    required:[true, 'El correo es obligatorio'],
    unique:true
  },
  password:{
    type:String,
    required:[true, 'La contraseña es obligatorio']
  },
  imagen:{
    type:String
  },
  role:{
    type:String
  },
  estado:{
    type:Boolean,
    default:true
  },
  google:{
    type:Boolean,
    default:false
  },
  
});

usuarioScheme.methods.toJSON = function(){
  const {__v,password,_id,...usuario} = this.toObject();
  usuario.uid= _id;
  return usuario;
}


module.exports = model('Usuario',usuarioScheme); //esto crea una clase llamada Usuario