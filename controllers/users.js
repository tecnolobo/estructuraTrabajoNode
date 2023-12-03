const {response,request} = require('express');


const  usuarioGet=(req=request, resp=response)=>{

  const body = req.body;
  const query = req.query;

  resp.json({
    msg:"Datos desde Controlador",
    query
  });
}

const usuarioPost = (req,resp=response)=>{
  const {id} = req.params;
  resp.json({
    msg:" dato desde usuarioPost",
    body,
    id
  });

}
const usuarioPut = (req,resp=response)=>{
  
  resp.json({
    msg:" dato desde usuarioPut"
  });

}
const usuarioDelete = (req,resp=response)=>{
  
  resp.json({
    msg:" dato desde usuarioDelete"
  });

}


module.exports ={
  usuarioGet,usuarioPost,usuarioPut,usuarioDelete
}