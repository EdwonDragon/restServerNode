const {
    response
} = require('express');
const {
    Categoria,
    Producto
} = require('../models');


//Obtener categorias paginado -total -populate
const ProductosGet = async (req, res = response) => {
    const {
        limite = 5, desde = 0
    } = req.body;
    const query = {
        estado: true
    };
    //Colección de awaits con promesos estas no dependen de otras
    //Se ejecutan las dos al mimo tiempo
    const [total, producto] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')

    ]);
    res.status(200).json({

        total,
        producto
    })
}

//Obtener categoria populate
const productoGet = async (req, res = response) => {

    const {
        id
    } = req.params;
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
       
    res.status(200).json({
        producto
    })

}



const crearProducto = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    const {
        descripcion,
        precio
    } = req.body;

    const nombreProducto = await Producto.findOne({
        nombre
    });

    if (nombreProducto) {
        res.status(400).json({
            msg: `El producto  ${nombreProducto.nombre} ya existe`
        })
    }
    //Generar los datos a guardar
    const data = {
        nombre,
        descripcion,
        precio,
        categoria: req.categoria.id,
        usuario: req.usuario._id

    }
    const producto = new Producto(data);
    await producto.save();
    res.status(201).json(producto)
}


//Actualizar categoria solo con el nombre

const actualizarProducto = async (req, res = response) => {
    const {
        id
    } = req.params;
    const {
        estado,
        usuario,
        categoria,
        ...data
    } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;
    data.categoria = req.categoria.id;

    const producto = await Producto.findByIdAndUpdate(id, data, {
        new: true
    })

    res.status(201).json({
        // msg:'Put API-Controlador',
        producto
    })
}
//Borrar categoria 
const borrarProducto = async (req, res = response) => {

    const {
        id
    } = req.params;
    // const usuario=await Usuario.findByIdAndDelete(id);
    //Cambiar estado
    const producto = await Producto.findByIdAndUpdate(id, {
        estado: false
    });

    res.status(200).json({
        producto
    })
}


module.exports = {
    crearProducto,
    ProductosGet,
    productoGet,
    actualizarProducto,
    borrarProducto

}