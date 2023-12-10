const validandoCampos = require('./validar-campos');
const validandoJwt  = require('./validar-jwt');
const validandoRoles  = require('./valida-roles');
const validandoCategorias  = require('./validar-categoria');
const validandoProductos  = require('./validar-producto');

module.exports ={
  ...validandoCampos,
  ...validandoJwt,
  ...validandoRoles,
  ...validandoCategorias,
  ...validandoProductos
}