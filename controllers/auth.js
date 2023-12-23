const {response,request, json} = require('express');
const Usuario = require('../models/usuario');
const encriptar = require('bcryptjs');
const { existeEmail } = require('../midelware/validar-campos');
const { Generajwt } = require('../helpers/generearJsonWebToken');
const { gogoleVerify } = require('../helpers/google-verity');
const { usuarioPut } = require('./users');

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

const googleSingin= async(req=request,resp=response)=>{

  const {id_token} = req.body;


  try {
    
    const {nombre,correo,img} = await gogoleVerify(id_token);
    
    let usuario = await Usuario.findOne({correo});

    if(!usuario){
      //Creeamoa el usuarrio
      const data={
        nombre,
        correo,
        password:':P',
        google:true
      }

      usuario = new Usuario(data);
      await usuario.save();

    }

    //Si el usuario en base de datos
    if(!usuario.estado){
      return resp.status(401).json({
        msg:'Hable con el administrador El usuario bloqueado'
      });
    }

    //Generar mi jwt
    const token = await Generajwt(usuario.id);

    return resp.json({
      usuario,
      token
    });


  } catch (error) {
    return resp.status(400).json({
      ok:false,
      msg:'El token no se pudo verificar'+error
    });
  }

}

const renovarToken = async(req=request,resp=response)=>{
  const {usaurioAutenticado} = req;

  //Renovamos el JWT
  const token = await Generajwt(usaurioAutenticado.id);

  return resp.json({usaurioAutenticado,token});
}



module.exports ={login,googleSingin,renovarToken}