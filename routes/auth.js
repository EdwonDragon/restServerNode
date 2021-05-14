const {Router}=require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCapos } = require('../middlewares/validar-campos');


const router=Router();

router.post('/login', [
check('correo','El correo es obligatorio y no es valido').isEmail(),
check('password','La contraseña  es obligatorio').not().isEmpty(),

validarCapos
],login );  


module.exports=router;