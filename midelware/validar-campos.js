
const {validationResult} = require('express-validator');
const Usuario = require('../models/usuario');

const validarCampos = (req,resp, next)=>{

  const errores = validationResult(req);

  if(!errores.isEmpty()){
    return resp.status(400).json(errores);
  }

  next();

}

const existeEmail = async(correo)=>{

  const exitCorreo = await Usuario.findOne({correo});
  if (exitCorreo){
    throw new Error('El correo ya esta registrado');
  }

}

const existeUsuarioById= async(id)=>{

  const usuarioExiste = await Usuario.findById(id);
  if (!usuarioExiste){
    throw new Error('El Usuario No existe');
  }

}

module.exports = {validarCampos,existeEmail,existeUsuarioById};