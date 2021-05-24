const validaCampos = require('../middlewares/validar-campos');
const validaRoles = require('../middlewares/validar-roles');
const validarJWT = require('../middlewares/validar.jwt');
const validarCat = require('../middlewares/validar-categoria');
const validarArchivo=require('../middlewares/validar-archivo')
module.exports={... validaCampos,
                ... validaRoles,
                ... validarJWT,
                ... validarCat,
                ... validarArchivo
                }