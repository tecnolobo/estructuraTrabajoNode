const {response,request} = require('express');
const Usuario = require('../models/usuario');
const encriptar = require('bcryptjs');
const { existeEmail } = require('../midelware/validar-campos');
const { Generajwt } = require('../helpers/generearJsonWebToken');

const  login= async(req=request, resp=response)=>{
  
  const {correo,password} = req.body;

  try {

    //verifdicar si usaurio existe

    const usuario = await Usuario.findOne({correo});

    if(!usuario){
      return resp.status(400).json({
        msg:'Usuario/Password no es correcto - correo'
      });
    }


    //Si el usuario esta activo
    if(!usuario.estado){
      return resp.status(400).json({
        msg:'Usuario/Password no es correcto - estado:false'
      });
    }

    //verificar contraseña
    const validPassword = encriptar.compareSync(password,usuario.password);
    if(!validPassword){
      return resp.status(400).json({
        msg:'Usuario/Password no es correcto - paswwor:false'
      });
    }

    //Genear JWT
    const token = await Generajwt(usuario.id);

    resp.json({
      usuario,
      token
    });

  } catch (error) {
    console.log(error);
    return resp.status(500).json({
      msg:'Habla con el administrador'
    });
  }

  
}



module.exports ={login
  
}