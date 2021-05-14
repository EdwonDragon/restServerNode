const {response}=require('express');
const bcrypt=require('bcryptjs')
const Usuario=require('../models/usuario');
const { generarJWT } = require('../helpers/geneerar-jwt');



const login=async(req,res=response)=>{

    const{correo,password}=req.body;
    try {
        //Verificar si el email existe
        const usuario=await Usuario.findOne({correo});

        if(!usuario){
            return res.status(400).json({
                msg:`Usuario /Password no existe`
            });
        }

        
        //Verificar esta activo
        const validarPasswrod=bcrypt.compareSync(password,usuario.password)
        if(!validarPasswrod){
            return res.status(400).json({
                msg:`Password no es correcto`
            });
        }
        //Verificar la contraseña
        if(!usuario.estado){
            return res.status(400).json({
                msg:`El usuario no existe`
            });
        }

        //Generar el JWT
        const token=await generarJWT(usuario.id);

        

        res.json({
            usuario,
            token
        })


    } catch (error) {
        res.status(500).json({
            msg:"Hable con el administrador"
        })
    }
    
}

module.exports={
    login
}

