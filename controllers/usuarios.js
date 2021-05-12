const{response}=require('express')

const usuariosGet=(req, res=response)=> {
    const {id,nombre="noName",appkey,page=1,limit=10}=req.query;
     res.json({
       msg:'Get API-Controlador',
       id,
       nombre,
       appkey,
       page,
       limit
    })
  }

const usuariosPut= (req, res=response)=> {
    const id=req.params.id;
    res.json({
       msg:'Put API-Controlador',
       id
    })
  }

  const usuariosPost= (req, res=response)=> {
    const {nombre,edad}=req.body;
    res.json({
       msg:'Post API-Controlador',
       nombre,
       edad
    })
  }

  const usuariosDelete= (req, res=response)=> {
    res.json({
       msg:'Delete API-Controlador'
    })
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