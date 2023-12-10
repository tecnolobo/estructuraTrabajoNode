const { response,request } = require('express');
const {Categoria} = require('../models');


//obtenerCategorias - paginado -total
const obtenerCategorias = async (req=request,resp=response)=>{

  const {limite=5,desde=0} = req.query;
  const query = {estado:true}

  const categorias =  Categoria.find(query)
  .skip(Number(desde))
  .limit(Number(limite))
  .populate('usuario','nombre').
  exec();

  const total = Categoria.countDocuments(query);

  const [cate,tot] = await Promise.all([
    categorias,
    total
  ]);

  console.log('Termino',total);

  return resp.status(200).json({
    total:tot,
    categorias:cate
  });

}

//obtenerCategoria -populate
const obtenerCategoria= async (req=request,resp=response)=>{


  //const query = {estado:true,}
  const {id} = req.params;

  const categoria =  await Categoria.findById(id)
  .populate('usuario','nombre').
  exec();


  return resp.status(200).json({
    categoria
  });

}


const crearCategoria = async (req=request,resp=response)=>{

  const nombre = req.body.nombre.toUpperCase();
  console.log('categoria',nombre);

  const categoriaDB = await Categoria.findOne({nombre});
  if(categoriaDB){
    return resp.status(400).json({
      msg:`La categoria ${categoriaDB.nombre} ya existe`
    });
  }

  //Generar datos a guardar
  const datos = {
    nombre,
    usuario:req.usaurioAutenticado._id
  }

  const categoria= new Categoria(datos);
  await categoria.save();


  resp.status(201).json({
    categoria
  });


}

//actualizarcategoria
const actualizarCategoriaById = async (req=request,resp=response)=>{

  const {id} = req.params;
  const {estado,usuario,...datos} = req.body;
  const nombre =datos.nombre.toUpperCase();

  datos.nombre= datos.nombre.toUpperCase();
  //console.log('actul',req.usaurioAutenticado._id);
  datos.usuario = req.usaurioAutenticado._id;
  //console.log('id_usua',datos.usuario);

  const BusCatByNombre = await Categoria.findOne({nombre});


  if (BusCatByNombre){
    return resp.status(401).json({
      msg:`La categoria con el nombre ${nombre} ya existe en la base de datos`
    });
  }

  consulta ={_id:id,estado:true};
  const categoeriaEncontrada= await Categoria.findByIdAndUpdate(id,datos,{new:true});


  return resp.status(200).json({
    categoeriaEncontrada
  }); 

}

//borrarCategoria estado:false
const borrarCategoria =  async (req=request,resp=response)=>{

  const {id} = req.params;
  const datos ={estado:false};
  const categoriaActualizada= await Categoria.findByIdAndUpdate(id,datos,{new:true});
  return resp.status(200).json({
    categria:categoriaActualizada
  }); 


}

module.exports = {
  crearCategoria,obtenerCategorias,obtenerCategoria,actualizarCategoriaById,borrarCategoria
}

