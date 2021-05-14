const role=require('../models/rol')
const Usuario=require('../models/usuario');

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




module.exports={validarRol,existeEm,existeUsuarioID}