const { response,request } = require('express');
const Productos   = require('../models/producto');
const  Categorias = require('../models/categoria');
const Usuario     = require('../models/usuario');
const {ObjectId} =require('mongoose').Types;
const colectionesPermitidas = [
  'usuarios',
  'categorias',
  'productos',
  'roles'
];


const buscarUsuarios= async(termino='',resp=response)=>{

  const isMongoid = ObjectId.isValid(termino);

  if (isMongoid){

    const usuario = await Usuario.findById(termino);
    return resp.json({
      results:(usuario)?[usuario]:[]
    });

  }
  const regexp = RegExp(termino,'i');

  const usuario = await Usuario.find({
    $or:[{nombre:regexp},{correo:regexp}],
    $and:[{estado:true}]
  });

  return resp.json({
    results:(usuario)?[usuario]:[]
  });


}

const buscarCategorias= async(termino='',resp=response)=>{

  const isMongoid = ObjectId.isValid(termino);
  if (isMongoid){
    const categorias = await Categorias.find({id:termino,estado:true});
    return resp.json({
      results:(categorias)?[categorias]:[]
    });
  }

  const regexp = RegExp(termino,'i');
  const categoria = await Categorias.find({nombre:regexp,estado:true});

  return resp.json({
    results:(categoria)?categoria:[]
  });

}

const buscarProductos= async(termino='',resp=response)=>{

  const isMongoid = ObjectId.isValid(termino);
  if (isMongoid){
    const productos = await Productos.find({id:termino,estado:true}).populate('categoria','nombre');
    return resp.json({
      results:(productos)?[productos]:[]
    });
  }

  const regexp = RegExp(termino,'i');
  const productos = await Productos.find({nombre:regexp,estado:true}).populate('categoria','nombre');

  return resp.json({
    results:(productos)?productos:[]
  });

}

//obtenerCategorias - paginado -total
const buscando = async (req=request,resp=response)=>{

  const {colection,termino} = req.params;

  if (!colectionesPermitidas.includes(colection)) {
    return resp.status(400).json({
      msg:`La Nombre del a coleccion ${colection} no existe`
    });
  }


  switch (colection) {
    case 'usuarios':
      buscarUsuarios(termino,resp);
    break;
    case 'categorias':
      buscarCategorias(termino,resp);
    break;
    case 'productos':
      buscarProductos(termino,resp);
    break;
    default:
      return resp.status(500).json({
        msg:`Aun no se a implementado`
      });
  }


}

module.exports = {
  buscando
}