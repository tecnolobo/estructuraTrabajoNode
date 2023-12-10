const {Router} = require('express');
const {check} = require('express-validator');
const {buscando} = require('../controllers/buscar');
const 
{ 
  validarJwt,
  validarCampos,
  existeEmail,
  existeUsuarioById,
  validarCateById 
} = require('../midelware');


const route = Router();

route.get('/:colection/:termino',buscando);



module.exports = route;