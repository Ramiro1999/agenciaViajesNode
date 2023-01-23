import { Viaje } from "../models/Viaje.js"
import {Testimoniales} from "../models/Testimoniales.js"

const guardarTestimonial = async (req,res) => {
    const testimoniales = await Testimoniales.findAll();
    //Validar
    const errores = []
    const {nombre,correo,mensaje} = req.body
    if(nombre.trim() === ''){
        errores.push({mensaje: "El nombre esta vacio"})
    }
    if(correo.trim() === ''){
        errores.push({mensaje: "El correo esta vacio"})

    }else if(await Testimoniales.findOne({where: {correo}})){
        errores.push({mensaje: "El correo ingresado ya esta registrado, ingrese otro"})
    }
    if(mensaje.trim() === ''){
        errores.push({mensaje: "El mensaje esta vacio"})
    }
    if(errores.length>0){
        res.render('testimoniales',{
            pagina: "Testimoniales",
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    }else{
        //Almacenar en base de datos

        try {
            await Testimoniales.create({
                nombre,
                correo,
                mensaje
            })

            res.redirect('/testimoniales')
        } catch (error) {
            console.log(error)
        }
    }
}




export {
    guardarTestimonial
}