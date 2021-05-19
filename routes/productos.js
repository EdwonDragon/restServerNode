const {
    Router
} = require('express');

const {
    check
} = require('express-validator');

const {
    validarJWT,
    adminRole,
    validarCat
} = require('../middlewares');

const {
    validarCapos
} = require('../middlewares/validar-campos');

const {
    existeProducto,
} = require('../helpers/db-validators');

const {
    crearProducto,
    ProductosGet,
    productoGet,
    actualizarProducto,
    borrarProducto
} = require('../controllers/productos');

const router = Router();

//1 Obtener todas las productos-publico
router.get('/', ProductosGet);

//2Get obtener una producto por id -puvlic
router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCapos
], productoGet);

//3Crear una producto -privado con un token valido POST
router.post('/', [
    validarJWT,
    validarCat,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCapos,
], crearProducto);

//Actualizar una producto por id con token valido
router.put('/:id', [
    validarJWT,
    // validarCat,
    // check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCapos
], actualizarProducto);

//Borrar una productoq
router.delete('/:id', [
    validarJWT,
    adminRole,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCapos
], borrarProducto);

module.exports = router;