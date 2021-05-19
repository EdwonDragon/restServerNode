const { Categoria,role,Usuario, Producto } = require('../models');


const validarRol=async(rol='')=>{
    const existe= await role.findOne({rol});
    if(!existe){
         throw new Error(`El rol ${rol} no es valido`);
    }
}

const existeEm= async(correo='')=>{
    const existeEmail=await Usuario.findOne({correo});

    if(existeEmail){
      throw new Error(`El email ${correo} ya está registrado`);
    }
}

const existeUsuarioID= async(id='')=>{
    const existeUser=await Usuario.findById(id);

    if(!existeUser){
      throw new Error(`El usuario con el id ${id} no existe`);
    }
}
const existeCategoriaID= async(id='')=>{
  
  const existeCategoria=await Categoria.findById(id)

  if(!existeCategoria){
    throw new Error(`La categoria con el id ${id} no existe`);
  }
  // if(!existeCategoria.estado){
  //   throw new Error(`La categoria con el id ${id} no está activa
  //   `);
  // }
}

const existeProducto= async(id='')=>{
  
  const existeProducto=await Producto.findById(id)

  if(!existeProducto){
    throw new Error(`El producto con el id ${id} no existe`);
  }
  // if(!existeProducto.estado){
  //   throw new Error(`El producto con el id ${id} no está activa
  //   `);
  // }
}





module.exports={validarRol,existeEm,existeUsuarioID,existeCategoriaID,existeProducto}