const path = require('path')
const {v4:uuidv4}=require('uuid')
const subirArchivo=(files,extencionesValidas=['png','jpg','jpeg'],carpeta='')=>{
    

    return new Promise( (resolve,reject)=>{
       
        const {
            archivo
        } = files;
     
        const nombreCortado=archivo.name.split('.')
    
        const extencion=nombreCortado[nombreCortado.length-1]
        // console.log(nombreCortado)

        //Validar extenciones
    
      
        if(!extencionesValidas.includes(extencion)){
            return reject(`La extencion  ${extencion} no es permitida, ${extencionesValidas}`)
        }
    
    
        const nombreTemporalArchivo=uuidv4()+'.'+extencion;
        const uploadPath = path.join(__dirname , '../uploads/', carpeta, nombreTemporalArchivo);
     
        // Use the mv() method to place the file somewhere on your server
        archivo.mv(uploadPath, (err) => {
                if (err){
                    return  reject(err);
                }
    
                return   resolve(nombreTemporalArchivo)
        });


    })

}

module.exports={
    subirArchivo
}