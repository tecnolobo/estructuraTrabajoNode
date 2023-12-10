const {Router} = require('express');
const {check} = require('express-validator');
const { login, googleSingin } = require('../controllers/auth');
const { 
  crearProducto,
  obtenerProductos,
  actualizarProductoById,
  obtenerProducto,
  borrarProducto
} = require('../controllers/productos');
const 
{ 
  validarJwt,
  validarCampos,
  existeEmail,
  existeUsuarioById,
  validarProdById, 
  validarCateById
} = require('../midelware');


const route = Router();

/**
 * {{usrl}}/api/categorias
 */
route.get('/',obtenerProductos);

/**
 * obtener categoria por id
 */
route.get('/:id',[
  check('id','No es un Id valido').isMongoId(),
  check('id').custom((id)=>validarProdById(id)),
  validarCampos
],obtenerProducto);

/**
 * privado crear categoria
 */
route.post('/',[
  validarJwt,
  check('nombre','El nombre es obligatorio').not().isEmpty(),
  check('categoria','No es un id de mongo valido').isMongoId(),
  check('categoria').custom((categoria)=>validarCateById(categoria)),
  validarCampos
],crearProducto);

/**
 * privado actualziar categoria
 */
route.put('/:id',[
  validarJwt,
  check('id','El id de la categoria es obligatorio').not().isEmpty(),
  check('id','No es un Id valido').isMongoId(),
  check('id').custom((id)=>validarProdById(id)),
  validarCampos
],actualizarProductoById);

/**
 * Borrar categetogoria por administradpor
 */
route.delete('/:id',[
  validarJwt,
  check('id','El id de la categoria es obligatorio').not().isEmpty(),
  check('id','No es un Id valido').isMongoId(),
  check('id').custom((id)=>validarProdById(id)),
  validarCampos
],borrarProducto);




module.exports = route;