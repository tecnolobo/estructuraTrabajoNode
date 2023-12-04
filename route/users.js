const {Router} = require('express');
const {check} = require('express-validator');
const { usuarioGet, usuarioPost, usuarioPut, usuarioDelete } = require('../controllers/users');
const {validarCampos, existeEmail, existeUsuarioById} = require('../midelware/validar-campos');
const { isRolevalid } = require('../helpers/db-validators');

const route = Router();

route.get('/',usuarioGet)
route.post('/',[
  check('nombre','El nombre es obligatorio ').not().isEmpty(),
  check('password','La contraseña debe tener como minimo 6 caracteres y un maximo de 20').isLength({min:6,max:20}),
  check('correo','El correo no es valido ').isEmail(),
  check('correo').custom(correo=>existeEmail(correo)),
  check('role').custom((role)=>isRolevalid(role)),
  validarCampos
],usuarioPost);
route.put('/:id',[
  check('id','No es un Id valido').isMongoId(),
  check('id').custom((id)=>existeUsuarioById(id)),  
  check('role').custom((role)=>isRolevalid(role)),
  validarCampos
],usuarioPut);
route.delete('/:id',[
  check('id','No es un Id valido').isMongoId(),
  check('id').custom((id)=>existeUsuarioById(id)), 
  validarCampos
],usuarioDelete);


module.exports = route;