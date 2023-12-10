const {Router} = require('express');
const {check} = require('express-validator');
const { login, googleSingin } = require('../controllers/auth');
const { 
  crearCategoria,
  obtenerCategorias,
  actualizarCategoriaById,
  obtenerCategoria, 
  borrarCategoria
} = require('../controllers/categorias');
const 
{ 
  validarJwt,
  validarCampos,
  existeEmail,
  existeUsuarioById,
  validarCateById 
} = require('../midelware');


const route = Router();

/**
 * {{usrl}}/api/categorias
 */
route.get('/',obtenerCategorias);

/**
 * obtener categoria por id
 */
route.get('/:id',[
  check('id','No es un Id valido').isMongoId(),
  check('id').custom((id)=>validarCateById(id)),
  validarCampos
],obtenerCategoria);

/**
 * privado crear categoria
 */
route.post('/',[
  validarJwt,
  check('nombre','El nombre es obligatorio').not().isEmpty(),
  validarCampos
],crearCategoria);

/**
 * privado actualziar categoria
 */
route.put('/:id',[
  validarJwt,
  check('id','El id de la categoria es obligatorio').not().isEmpty(),
  check('id','No es un Id valido').isMongoId(),
  check('id').custom((id)=>validarCateById(id)),
  check('nombre','El campo nombre es obligatorio').not().isEmpty(),
  validarCampos
],actualizarCategoriaById);

/**
 * Borrar categetogoria por administradpor
 */
route.delete('/:id',[
  validarJwt,
  check('id','El id de la categoria es obligatorio').not().isEmpty(),
  check('id','No es un Id valido').isMongoId(),
  check('id').custom((id)=>validarCateById(id)),
  validarCampos
],borrarCategoria);




module.exports = route;