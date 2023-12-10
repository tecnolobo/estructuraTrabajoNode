const { response, request } = require("express");
const { Producto } = require("../models");

const validarProdById= async(id)=>{

  const consulta= {_id:id,estado:true};

  const producto = await Producto.findOne(consulta);


  if(!producto ){  
    throw new Error(`El producto con el id ${id} no existe en la DB`);
  }

}

module.exports = {
  validarProdById
}