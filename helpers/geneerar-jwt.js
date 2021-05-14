const jwt=require('jsonwebtoken');

const generarJWT=(uid='')=>{
    return new Promise((resolve,reject)=>{

        const payload={uid};
        jwt.sign(payload,process.env.SECRETPUBLICKEY,{
            expiresIn:'200d'

        },(err,token)=>{
            if(err){
                reject('No se pudo generar');
            }else{
                resolve(token);
            }
        })

    })
}


module.exports={generarJWT}