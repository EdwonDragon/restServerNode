const {Router}=require('express');
const { check } = require('express-validator');
const { login, googleSingin } = require('../controllers/auth');
const { validarCapos } = require('../middlewares/validar-campos');


const router=Router();

router.post('/login', [
check('correo','El correo es obligatorio y no es valido').isEmail(),
check('password','La contraseña  es obligatorio').not().isEmpty(),

validarCapos
],login );  

router.post('/google', [
    check('id_token','El id es necesario').not().isEmpty(),
    validarCapos
    ],googleSingin );  


module.exports=router;