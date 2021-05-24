const {Router}=require('express');

const { check } = require('express-validator');
const { cargarArchivos, actualizarImagenCloudinary,cargarImagen } = require('../controllers/uploads');
const { colecionesPermitidas, existeUsuarioID } = require('../helpers/db-validators');
const { ValidarArchivo } = require('../middlewares');

const { validarCapos } = require('../middlewares/validar-campos');


const router=Router();


router.post('/',ValidarArchivo,cargarArchivos)

router.put('/:coleccion/:id',[
    check('id','Id no es un IDD VALIDO DE MONGO').isMongoId(),
    check('coleccion').custom(c=>colecionesPermitidas(c,['usuarios','productos'])),
    ValidarArchivo,
    validarCapos

],actualizarImagenCloudinary)



router.get('/:coleccion/:id',[
    check('id','Id no es un IDD VALIDO DE MONGO').isMongoId(),
    check('coleccion').custom(c=>colecionesPermitidas(c,['usuarios','productos'])),
   
    validarCapos

],cargarImagen)




module.exports=router;