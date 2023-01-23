import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

const app = express();
 
//Conectar db
db.authenticate()
    .then(() => console.log('BD CONECTADA'))
    .catch(error => console.log(error))

const port = process.env.port || 4000;


 //Habilitar PUG
app.set("view engine","pug")

//Obtener el año actual
app.use((req,res,next) => {  //permite ir a otro middelware
    const year = new Date().getFullYear();
    res.locals.actualYear = year;                     //variables locales
    res.locals.nombreSitio = "Agencia de Viajes"
    return next();
})

//Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

//Definir la carpeta public
app.use(express.static('public'));

 //Agregar router
 app.use("/",router); //use soporta PUT,POST,PATCH,DELETE.

app.listen(port,()=>{
        console.log(`El servidor esta corriendo en ${port}`)
})
 