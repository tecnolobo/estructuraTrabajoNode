const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJwt = async(req=request,resp=response,next)=>{
  const token = req.header('x_token');

  if(!token){
    return resp.status(401).json({
    msg:'Falta el token en la peticion'
    });
  }
  
  try {
   
    const {uid} =jwt.verify(token,process.env.SECRETPUBLICKEY); // si noi es valido genera un trwoerrro
    
    const usuariAutenticado = await Usuario.findById(id=uid);

    if(!usuariAutenticado){
      return resp.status(401).json({
        msg:'Token no valido -- usuario no existe en DB'
      })
    }
    //validar usuario activo
    if(!usuariAutenticado.estado){
      return resp.status(401).json({
        msg:'Token no valido -- usuario con estado false'
      })
    }

    req.usaurioAutenticado=usuariAutenticado;

    next();
    

  } catch (error) {
    console.log(error);
    return resp.status(401).json({
      msg:'token no valido'
      });
  }



}

module.exports = {validarJwt}