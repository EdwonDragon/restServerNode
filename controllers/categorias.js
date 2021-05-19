const {
    response
} = require('express');
const {
    Categoria
} = require('../models');


//Obtener categorias paginado -total -populate
const categoriasGet = async (req, res = response) => {
    const {limite = 5, desde = 0} = req.body;
    const query = {estado: true};
    //Colección de awaits con promesos estas no dependen de otras
    //Se ejecutan las dos al mimo tiempo
    const [total, categoria] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
        .populate('usuario','nombre')
        
    ]);
    res.status(200).json({
        
        total,
        categoria
    })
}

//Obtener categoria populate
const categoriaGet = async (req, res = response) => {

    const {id} = req.params;

    const categoria = await Categoria.findById(id)
        .populate('usuario','nombre')
        

    res.status(200).json({
       
        categoria
    })

}



const crearCategoria = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    const nombreCategoria = await Categoria.findOne({
        nombre
    });

    if (nombreCategoria) {
        res.status(400).json({
            msg: `La categoria ${nombreCategoria.nombre} ya existe`
        })
    }
    //Generar los datos a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    const categoria = new Categoria(data);
    await categoria.save();
    res.status(201).json(categoria)
}


//Actualizar categoria solo con el nombre

const actualizarCategoria = async (req, res = response) => {
    const {id} = req.params;
    const {estado,usuario,...data} = req.body;

    data.nombre=data.nombre.toUpperCase();
    data.usuario=req.usuario._id;
    
    const categoria = await Categoria.findByIdAndUpdate(id, data,{new:true})

    res.status(201).json({
        // msg:'Put API-Controlador',
        categoria
    })
}
//Borrar categoria 
const borrarCategoria = async (req, res = response) => {
   
     const {id}=req.params;
    // const usuario=await Usuario.findByIdAndDelete(id);
  
    //Cambiar estado
    const categoria=await Categoria.findByIdAndUpdate(id,{estado:false});
    
    res.status(200).json({categoria})
}


module.exports = {
    crearCategoria,
    categoriasGet,
    categoriaGet,
    actualizarCategoria,
    borrarCategoria

}