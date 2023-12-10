const {Schema, model} = require('mongoose');

const CategoriaScheme = Schema({
  nombre:{
    type:String,
    required:[true,'El nombre es obligatorio'],
    unique:true
  },
  estado:{
    type:Boolean,
    default:true,
    required:true
  },
  usuario:{
    type:Schema.Types.ObjectId,
    ref:'Usuario',
    required:true
  },
});

CategoriaScheme.methods.toJSON = function(){
  const {__v,_id,...categoria} = this.toObject();
  categoria.uid= _id;
  return categoria;
}

module.exports = model('Categoria',CategoriaScheme); //esto crea una clase llamada role