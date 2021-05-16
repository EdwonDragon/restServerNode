const {response}=require('express');
const bcrypt=require('bcryptjs')
const Usuario=require('../models/usuario');
const { generarJWT } = require('../helpers/geneerar-jwt');
const { googleVerify } = require('../helpers/google-verify');



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

const googleSingin=async(req,res=response)=>{
    
    const {id_token}=req.body;

    try {
    const {correo,nombre,img}= await googleVerify(id_token)
    
    //Su existe

    let usuario=await Usuario.findOne({correo});

    if(!usuario){
        //Crearlo
        const data={
            nombre,
            correo,
            password:':P',
            img,
            google:true
        };

        usuario=new Usuario(data);
        await usuario.save();
    }

    //Si el usuario BD
    if(!usuario.estado){
        res.status(400).json({
            msg:"Hable con el admon usuario bloqueado"
        });
    }

    //generarJWT
    const token=await generarJWT(usuario.id);

        res.json({
            msg:"Todo bien",
            usuario,
            token
    
        })
        
    } catch (error) {
        res.status(400).json({
            msg:"Google token no es valido"
        })
    }
}

module.exports={
    login,
    googleSingin
}

