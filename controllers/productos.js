const { response,request } = require('express');
const {Producto} = require('../models');


//obtenerCategorias - paginado -total
const obtenerProductos = async (req=request,resp=response)=>{

  const {limite=5,desde=0} = req.query;
  const query = {estado:true}

  const Productos =  Producto.find(query)
  .skip(Number(desde))
  .limit(Number(limite))
  .populate('usuario','nombre')
  .populate('categoria','nombre')
  .exec()

  const total = Producto.countDocuments(query);

  const [cate,tot] = await Promise.all([
    Productos,
    total
  ]);

  return resp.status(200).json({
    total:tot,
    Productos:cate
  });

}

//obtenerCategoria -populate
const obtenerProducto= async (req=request,resp=response)=>{
  //const query = {estado:true,}
  const {id} = req.params;

  const Producto =  await Producto.findById(id)
  .populate('usuario','nombre').
  exec();

  return resp.status(200).json({
    Producto
  });

}


const crearProducto = async (req=request,resp=response)=>{

  const {estado,usuario,...body} = req.body;

  const nombre = req.body.nombre.toUpperCase();

  const ProductoDB = await Producto.findOne({nombre});
  if(ProductoDB){
    return resp.status(400).json({
      msg:`La Producto ${ProductoDB.nombre} ya existe`
    });
  }

  //Generar datos a guardar
  const datos = {
    ...body,
    nombre,
    usuario:req.usaurioAutenticado._id
  }

  const producto= new Producto(datos);
  
  await producto.save();

  resp.status(200).json({
    producto
  });

}

//actualizarProductoById
const actualizarProductoById = async (req=request,resp=response)=>{

  const {id} = req.params;
  const {estado,usuario,...datos} = req.body;
  datos.usuario = req.usaurioAutenticado._id;
  
  if (datos.nombre){
    const nombre =datos.nombre.toUpperCase();
    datos.nombre= nombre;
    const BusProdByNombre = await Producto.findOne({nombre});


    if (BusProdByNombre){
      return resp.status(401).json({
        msg:`La Producto con el nombre ${nombre} ya existe en la base de datos`
      });
    }
  }

  
  consulta ={_id:id,estado:true};
  const productoEncontrado= await Producto.findByIdAndUpdate(id,datos,{new:true});


  return resp.status(200).json({
    productoEncontrado
  }); 

}

//borrarCategoria estado:false
const borrarProducto =  async (req=request,resp=response)=>{

  const {id} = req.params;
  const datos ={estado:false};
  const productoActualizada= await Producto.findByIdAndUpdate(id,datos,{new:true});
  return resp.status(200).json({
    producto:productoActualizada
  }); 


}

module.exports = {
  crearProducto,obtenerProductos,obtenerProducto,actualizarProductoById,borrarProducto
}

