const {
    Router
} = require('express');
const {
    check
} = require('express-validator');
const {
    validarJWT, adminRole
} = require('../middlewares');

const {
    validarCapos
} = require('../middlewares/validar-campos');

const {
    existeCategoriaID,
   
} = require('../helpers/db-validators');
const {
    crearCategoria,
    categoriasGet,
    categoriaGet,
    actualizarCategoria,
    borrarCategoria
} = require('../controllers/categorias');

const router = Router();


//1 Obtener todas las categorias-publico

router.get('/', categoriasGet);


//2Get obtener una categoria por id -puvlic

router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeCategoriaID),
    validarCapos
], categoriaGet);



//3Crear una categoria -privado con un token valido POST
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCapos,
], crearCategoria);


//Actualizar una categoria por id con token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeCategoriaID),
    validarCapos
], actualizarCategoria);

//Borrar una categoriaq
router.delete('/:id', [
    validarJWT,
    adminRole,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeCategoriaID),
    
    validarCapos
],borrarCategoria);





module.exports = router;