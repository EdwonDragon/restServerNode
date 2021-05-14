const {request, response } = require("express")

const adminRole=(req,res=response,next)=>{
    if(!req.usuario){
        return res.status(500).json({
            msg:"El rol no esta chido"
        });
    }

    const{rol,nombre}=req.usuario;
    if(rol!='ADMIN_ROL'){
        return res.status(401).json({
            msg:`El ${nombre} no es administrador`
        })
    }

    next();
}

const tieneRol=(... roles)=>{

    return (req,res=response,next)=>{
       const rol= req.usuario.rol;
        
        if(!roles.includes(rol)){
            return res.status(401).json({
                msg:`Ro, no permitido en: ${roles} rol no esya permitido`
            })
        }

        next();
    }


}


module.exports={
    adminRole,tieneRol
}