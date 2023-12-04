const mongoose = require('mongoose');

const dbConection = async ()=>{

  try {
    await mongoose.connect(process.env.MONGO_BD_ATLAS);
    console.log('Se conecto a la base de datos en el puerto');
  } catch (error) {
    console.log(error);
    throw new ' Error al conectarse a la base de datos ';
  }

}

module.exports = {
  dbConection
};