
const { request } = require('express');
const Usuario=require('../models/usuario');
const jwt=require('jsonwebtoken');

const validarJWT=async(req=request,res,next)=>{
    const token=req.header('x-token')
    console.log(token)
    if(!token){
        return res.status(401).json({
            msg:"No hay token en la peticion"
        })
    }

    try {
        const {uid}=jwt.verify(token,process.env.SECRETPUBLICKEY)
    
        const usuario=await Usuario.findById(uid);
        //Verificar el estadp
        if(!usuario){
            return res.status(401).json({
                msg:"Usuario no existe" 
            })
        }

        if (!usuario.estado){
           return res.status(401).json({
                msg:"Usuario no activo" 
            })
        }

        req.usuario=usuario;
       
        next();
    } catch (error) {
        res.status(401).json({
            msg:"Token no valido" 
        })
    }


}


module.exports={
    validarJWT
}