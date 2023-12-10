const Role = require('../models/role');

const isRolevalid = async (role='')=>{

  if (role){

    const existeRole = await Role.findOne({role});
    if (!existeRole){
      throw new Error('El role no existe ');
    }

  }
  
}


module.exports = {
  isRolevalid
}