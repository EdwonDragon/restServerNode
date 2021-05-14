const{response}=require('express')
const Usuario=require('../models/usuario');
const encrypt=require('bcryptjs');

const usuariosGet=async(req, res=response)=> {
   
    const {limite=5,desde=0}=req.query;
    const query={estado:true};

//Colección de awaits con promesos estas no dependen de otras
//Se ejecutan las dos al mimo tiempo
    const [total,usuarios]=await Promise.all([
      Usuario.countDocuments(query),
     
      Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limite))

    ]);
    res.json({
     total,
     usuarios
    })   
    }


  const usuariosPut= async(req, res=response)=> {
      const id=req.params.id;
      const {_id,password,google,correo,...resto}=req.body;
     
      //Todo validar contra bd
      if(password){
        const salt=encrypt.genSaltSync();
        resto.password=encrypt.hashSync(password,salt);
      }
     
     const usuario=await Usuario.findByIdAndUpdate(id,resto)
      
     res.json({
        // msg:'Put API-Controlador',
        usuario
      })
    }


  const usuariosPost= async(req, res=response)=> {

   
    const {nombre,correo,password,rol}=req.body;
    const usuario=new Usuario({nombre,correo,password,rol});

    //Verificar si el correo existe
  
    const salt=encrypt.genSaltSync();

    usuario.password=encrypt.hashSync(password,salt);

    await usuario.save();
    res.json({
       msg:'Post API-Controlador',
       usuario
    })
  }

  const usuariosDelete= async(req, res=response)=> {
    //Fisicamente
    
    const {id}=req.params;
    // const usuario=await Usuario.findByIdAndDelete(id);
  
    //Cambiar estado
    const usuario=await Usuario.findByIdAndUpdate(id,{estado:false});

    res.json(usuario)
  }

  const usuariosPatch= (req, res=response)=> {
    res.json({
       msg:'Patch API-Controlador'
    })
  }


  module.exports={
      usuariosGet,
      usuariosPut,
      usuariosPost,
      usuariosPatch,
      usuariosDelete
  }