const {response,request} = require('express');
const Usuario = require('../models/usuario');
const encriptar = require('bcryptjs');
const { existeEmail } = require('../midelware/validar-campos');

const  usuarioGet= async(req=request, resp=response)=>{
  const {limite=5,desde=0} = req.query;
  const query = {estado:true};

  const usuarios=  Usuario.find(query)
  .skip(Number(desde))
  .limit(Number(limite));

  const total =   Usuario.countDocuments(query);

  const [usu,tot] =await Promise.all([
    usuarios,
    total
  ]);

  resp.json({
    total:tot,
    usaurios:usu
  });
}

const usuarioPost = async (req,resp=response)=>{

  const {nombre,correo,password,role} = req.body;
  const usuario = new Usuario({nombre,correo,password,role});// lo unico que vamos a guardar en la base de datos

  //encriptar passwors
  const sal = encriptar.genSaltSync();//por defecto regresa 10 numero de vueltas para encriptar
  usuario.password= encriptar.hashSync(usuario.password,sal);

  await usuario.save();

  resp.json({
    usuario
  });

}
const usuarioPut =  async(req,resp=response)=>{
  const {id} = req.params;

  const {_id,password,google,...restoParam} = req.body; 

  if(password){
    const sal = encriptar.genSaltSync();//por defecto regresa 10 numero de vueltas para encriptar
    restoParam.password= encriptar.hashSync(password,sal);
  }

  const usuario = await Usuario.findByIdAndUpdate(id,restoParam);

  resp.json({
    usuario
  });

}
const usuarioDelete = async (req,resp=response)=>{
  
  const {id} = req.params;
  const usaurioAutenticado= req.usaurioAutenticado;
  // const usuario =await Usuario.findByIdAndDelete(id);
  const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});

  resp.json({
    usuario,usaurioAutenticado
  });

}


module.exports ={
  usuarioGet,usuarioPost,usuarioPut,usuarioDelete
}