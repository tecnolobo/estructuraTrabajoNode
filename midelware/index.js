const validandoCampos = require('./validar-campos');
const validandoJwt  = require('./validar-jwt');
const validandoRoles  = require('./valida-roles');

module.exports ={
  ...validandoCampos,
  ...validandoJwt,
  ...validandoRoles
}