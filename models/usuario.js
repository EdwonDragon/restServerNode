const{Schema,model}=require('mongoose');


const UsuarioSchema=Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio']
    },
    correo:{
        type:String,
        required:[true,'El correo es obligatorio'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'La cotraseña es obligatorio'],
     
    },
    img:{
        type:String,
    
    },
    rol:{
        type:String,
        required:true,
        default:'USER_ROLE',
        emun:['ADMIN_ROLE', 'USER_ROLE']
    
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:true
    }


})

UsuarioSchema.methods.toJSON= function(){
    const{__v,password,_id,...usuairo}=this.toObject();
    usuairo.uid=_id;
    return usuairo;
}


module.exports=model('Usuario',UsuarioSchema);