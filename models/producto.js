const {Schema, model} = require('mongoose');

const ProductoScheme = Schema({
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
  precio:{
    type:Number,
    default:0
  },
  usuario:{
    type:Schema.Types.ObjectId,
    ref:'Usuario',
    required:true
  },
  categoria:{
    type:Schema.Types.ObjectId,
    ref:'Categoria',
    required:true
  },
  descipcion:{type:String},
  disponible:{type:Boolean,default:true},
});

ProductoScheme.methods.toJSON = function(){
  const {__v,_id,...Producto} = this.toObject();
  Producto.uid= _id;
  return Producto;
}

module.exports = model('Producto',ProductoScheme); //esto crea una clase llamada role