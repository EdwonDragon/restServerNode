const {Router}=require('express');
const { check } = require('express-validator');

const { usuariosGet, 
        usuariosPut ,
        usuariosPost,
        usuariosPatch,
        usuariosDelete} = require('../controllers/usuarios');


const { validarRol, existeEm,existeUsuarioID} = require('../helpers/db-validators');
const { validarCapos } = require('../middlewares/validar-campos');
const { validate } = require('../models/usuario');

const router=Router();

router.get('/', [

  check('limite').isInt(),
  check('desde').isInt(),
  validarCapos
],usuariosGet );  

    
  router.put('/:id',[

    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioID ),
    check('rol').custom(validarRol),
    validarCapos


  ] ,usuariosPut);

  router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe ser mas de 6 letras').isLength({min:6}),
    check('correo','El correo no es válido').isEmail().custom(existeEm),
    // check('rol','No es un rol valido').isIn('ADMIN_ROLE','USER_ROLE'),
    check('rol').custom(validarRol),


    validarCapos
    
  ], usuariosPost);

  router.delete('/:id', [
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioID ),
    validarCapos
  ] ,usuariosDelete);

  router.patch('/', usuariosPatch);





module.exports=router;