const {Router} = require('express');
const { usuarioGet, usuarioPost, usuarioPut, usuarioDelete } = require('../controllers/users');

const route = Router();

route.get('/',usuarioGet)
route.post('/:id',usuarioPost);
route.put('/',usuarioPut);
route.delete('/',usuarioDelete);


module.exports = route;