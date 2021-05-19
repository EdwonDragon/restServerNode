
const { request } = require('express');
const Categoria=require('../models/categoria');


const validarCat=async(req=request,res,next)=>{
    const categoria_id=req.header('categoria_id')
    console.log(categoria_id)
    if(!categoria_id){
        return res.status(401).json({
            msg:"No hay categoria en la petición"
        })
    }

    try {
        const _id=categoria_id;
    
        const categoria=await Categoria.findById(_id);
        //Verificar el estadp
        if(!categoria){
            return res.status(401).json({
                msg:"Categoria no existe" 
            })
        }

        if (!categoria.estado){
           return res.status(401).json({
                msg:"Categoria no activo" 
            })
        }

        req.categoria=categoria;
       
        next();
    } catch (error) {
        res.status(401).json({
            msg:"Categoria no valida" 
        })
    }


}


module.exports={
    validarCat
}