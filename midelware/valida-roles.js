const { request, response } = require("express")

const esAdminRol = (req=request,resp=response,next)=>{

  const usuario = req.usaurioAutenticado;
  if (!usuario){
    return resp.status(500).json({
      msg:'Se requiere verificar el role sin validar el token primero'
    })
  }

  const {role,nombre} = usuario;

  if (role!=='ADMIN_ROLE'){
    return resp.status(404).json({
      msg:`El ${nombre} no es un adminstrador`
    })
  }

  next();

}

const tieneRole = ( ...roles)=>{
  
  return (req=request,resp=response,next)=>{

    const usuario= req.usaurioAutenticado;

    if(!usuario){
      return resp.status(500).json({
        msg:`Se esta intenatndo llamar la funcion Tiene rol antes de validar el token`
      });
    }


    if (!roles.includes(usuario.role)){
      return resp.status(404).json({
          msg:`El ${usuario.nombre} no tiene un role permitido ${roles}`
        });
    }

    next();

  }

}

module.exports = {
  esAdminRol,tieneRole
}