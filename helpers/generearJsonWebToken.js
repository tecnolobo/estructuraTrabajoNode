const jwt= require('jsonwebtoken');

const Generajwt = async(uid='')=>{


  return await new Promise((resolve,reject)=>{

    const payload= {uid};

    jwt.sign(payload,process.env.SECRETPUBLICKEY,{
      expiresIn:'4h'
    },(error,token)=>{
      if(error){
        console.log(error);
        reject('No se pudo generar el jwt')
      }else{
        resolve(token)
      }
    });


  });

}


module.exports ={
  Generajwt
}