const { response, request } = require("express");
const { Categoria } = require("../models");

const validarCateById= async(id)=>{

  const consulta= {_id:id,estado:true};

  const categoria = await Categoria.findOne(consulta);

  if(!categoria ){  
    throw new Error(`El Categoria con el id ${id} no existe en la DB`);
  }

}

module.exports = {
  validarCateById
}