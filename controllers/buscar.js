const {
    response
} = require('express');
const {
    ObjectId
} = require('mongoose').Types

const {
    Usuario, Categoria, Producto
} = require('../models')

const colecionesPermitidas = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
]

const buscarUsuarios = async (termino = '', res = response) => {
    const mongoId = ObjectId.isValid(termino)
    if (mongoId) {
        const usuario = await Usuario.findById(termino)
        return res.json({
            results: (usuario) ? [usuario] : []
        })
    }

    const regex = new RegExp(termino, 'i');
    const usuarios = await Usuario.find({
        $or: [{
            nombre: regex
        }, {
            correo: regex
        }],
        $and: [{
            estado: true
        }]
    })

    res.json({
        results: (usuarios) ? [usuarios] : []
    })


}

const buscarCategoria = async (termino = '', res = response) => {
    const mongoId = ObjectId.isValid(termino)
    if (mongoId) {
        const categoria = await Categoria.findById(termino)
        return res.json({
            results: (categoria) ? [categoria] : []
        })
    }

    const regex = new RegExp(termino, 'i');
    const categoria = await Categoria.find({
        $or: [{
            nombre: regex
        }],
        $and: [{
            estado: true
        }]
    })

    res.json({
        results: (categoria) ? [categoria] : []
    })


}

const buscarProductos = async (termino = '', res = response) => {
    const mongoId = ObjectId.isValid(termino)
    if (mongoId) {
        const productos = await Producto.findById(termino).populate('categoria','nombre').populate('usuario','nombre')
        return res.json({
            results: (productos) ? [productos] : []
        })
    }

    const regex = new RegExp(termino, 'i');
    const productos = await Producto.find({
        $or: [{
            nombre: regex
        }],
        $and: [{
            estado: true
        }]
    }).populate('categoria','nombre').populate('usuario','nombre')

    res.json({
        results: (productos) ? [productos] : []
    })


}


const buscar = async (req, res = response) => {
    const {
        coleccion,
        termino
    } = req.params;

    if (!colecionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones validas son: ${colecionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'categoria':
            buscarCategoria(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;

        default:
            res.status(500).json({
                msg: "Se me olvido hacer esta busqueda"
            })
    }


}




module.exports = {
    buscar

}