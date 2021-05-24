const path = require('path')
const fs = require('fs')

const cloudinary = require('cloudinary').v2

cloudinary.config(process.env.CLOUDINARY_URL)

const {
    response
} = require("express");
const {
    subirArchivo
} = require("../helpers/subir-archivo");
const {
    Usuario,
    Producto
} = require("../models");

const cargarArchivos = async (req, res = response) => {

    try {
        const pathCompleto = await subirArchivo(req.files, undefined, 'imgs');
        res.json({
            nombre: pathCompleto
        })
    } catch (error) {
        res.status(400).json({
            error

        })
    }
}

const cargarImagen = async (req, res = response) => {

    const {
        id,
        coleccion
    } = req.params;
    let modelo;
    const pathImagenDefault = path.join(__dirname, '../assets/no-image.jpg')

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `El path esta mal ${coleccion} no existe`
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: "No existe producto con el id "
                })
            }
            break;

        default:
            return res.status(500).json({
                msg: `NO eciste esa validacion`
            })
            break;
    }


    //Limpiar imagenes antiguas
    if (modelo.img) {

        const pathImagen = path.join(__dirname, '../uploads/', coleccion, modelo.img);

        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen);
        }


    }

    res.sendFile(
        pathImagenDefault
    );
}


const actualizarImagen = async (req, res = response) => {


    const {
        id,
        coleccion
    } = req.params;
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: "No existe usuario con el id"
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: "No existe producto con el id"
                })
            }
            break;

        default:
            return res.status(500).json({
                msg: `NO eciste esa validacion`
            })
            break;
    }


    //Limpiar imagenes antiguas
    if (modelo.img) {

        const pathImagen = path.join(__dirname, '../uploads/', coleccion, modelo.img);

        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen);
        }


    }

    //Crear nuevas imagenes 
    const nombre = await subirArchivo(req.files, undefined, coleccion);

    modelo.img = nombre;
    await modelo.save();


    res.json({
        modelo
    })
}




const actualizarImagenCloudinary = async (req, res = response) => {


    const {
        id,
        coleccion
    } = req.params;
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: "No existe usuario con el id"
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: "No existe producto con el id"
                })
            }
            break;

        default:
            return res.status(500).json({
                msg: `NO eciste esa validacion`
            })
            break;
    }


    //Limpiar imagenes antiguas
    if (modelo.img) {
        const nombreArr=modelo.img.split('/');
        const nombre=nombreArr[nombreArr.length -1];
        const [public_id]=nombre.split('.');

        await cloudinary.uploader.destroy(public_id);
    }

    const {tempFilePath}=req.files.archivo;
    const {secure_url}= await cloudinary.uploader.upload(tempFilePath);

    // //Crear nuevas imagenes 
    // const nombre = await subirArchivo(req.files, undefined, coleccion);
    
    modelo.img = secure_url;
    await modelo.save();


    res.json({
        modelo
    })
}











module.exports = {
    cargarArchivos,
    actualizarImagenCloudinary,
    cargarImagen
}