const {Schema, model} = require('mongoose');

const roleScheme = Schema({
  role:{
    type:String,
    require:[true,'El rol es obligatorio']
  },
});
module.exports = model('Role',roleScheme); //esto crea una clase llamada role