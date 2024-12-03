import dotenv from "dotenv" //instalar (npm install dotenv)
import express, { request, response } from "express" //intalar (npm install espress)
import path from "path";
import { fileURLToPath } from "url";
// instalar motor de plantillas EJS (npm install ejs)
// instalar manejador de base de datos SqLite (npm install better-sqlite3)

//usar Dao
import AppDaoBetterSQLite from './Queries/DaoBetterSqlite3.js';
import ModelAlumno from "./Models/model.alumno.js";
import ModelProfesor from "./Models/model.profesor.js";
import ModelFacultad from './Models/model.facultad.js';
import ModelStatus from './Models/model.status.js';
import ModelCarrera from './Models/model.carrera.js';
import ModelRegistro from './Models/model.registro-entrada-salida.js';


//vinculos con las tablas de base de datos SQLITE
const controllerDB=new AppDaoBetterSQLite('app.db')
const mca=new ModelAlumno(controllerDB)
const mcp=new ModelProfesor(controllerDB)
const mcc=new ModelCarrera(controllerDB)
const mcf=new ModelFacultad(controllerDB)
const mcs=new ModelStatus(controllerDB)
const mcr=new ModelRegistro(controllerDB)

// +-------------------------------------server---------------------------------------+
const server = express();
const port = process.env.port||3000;

dotenv.config();
server.use(express.json());
server.use(express.urlencoded({extended:false}));

// Configurar __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//configuracion del motor de plantillas
server.set("view engine", "ejs");
server.set('views', path.join(__dirname, 'views'));

//Rutas del servidor
server.get("/", (req,res)=>{
    res.render("index", {
        rutaActual: "/",
    });
});
//Ruta de registro de Alumnos
server.get("/RegistroAlumno", async (_, res) => {
    const carreras = await mcc.getAll();
    const status = await mcs.getAll();
    const facultad = await mcf.getAll();
    res.render("pages/insert/RegistroAlumno", {
        rutaActual: "/RegistroAlumno",
        carreras: carreras,
        status: status,
        facultad:facultad,   
    });
});
//Ruta de registro de Profesores
server.get("/RegistroProfesor", async (_, res) => {
    const status = await mcs.getAll();
    const facultad = await mcf.getAll();
    res.render("pages/insert/RegistroProfesor", {
        rutaActual: "/RegistroProfesor",
        status: status,
        facultad:facultad,   
    });
});
//Ruta de registro de Carreras
server.get("/RegistroCarrera", async (_, res) => {
    const facultad = await mcf.getAll();
    res.render("pages/insert/RegistroCarrera", {
        rutaActual: "/RegistroCarrera", 
        facultad:facultad,  
    });
});
//Ruta de registro de Facultades
server.get("/RegistroFacultad", (_, res) => {
    res.render("pages/insert/RegistroFacultad", {
        rutaActual: "/RegistroFacultad",   
    });
});

//Ruta de registro de registros
server.get("/Registro-Entrada-Salida", (_, res) => {
    res.render("pages/insert/Registro-Entrada-Salida", {
        rutaActual: "/Registro-Entrada-Salida",   
    });
});


// Ruta de obtención de todos los alumnos
server.get("/estudiantes", async (req, res) => {
    try {
        const estudiantes = await mca.getAll(); // Método retorna todos los estudiantes
            res.render("pages/Get/estudiantes", {
            rutaActual: "/estudiantes",
            estudiantes: estudiantes, // Enviamos los estudiantes a la vista                 
            });        
    } catch (err) {
        console.error("Error al obtener estudiantes:", err);
        res.status(500).send("Error al obtener estudiantes.");
    }
});

// Ruta de obtención de todos los profesores
server.get("/profesores", async (_, res) => {
    try {
        const profesores = await mcp.getAll(); // Método retorna todos los profesores
        res.render("pages/Get/profesores", {
            rutaActual: "/profesores",
            profesores: profesores, // Enviamos los profesores a la vista
        });
    } catch (err) {
        console.error("Error al obtener profesores:", err);
        res.status(500).send("Error al obtener profesores.");
    }
});

// Ruta de obtención de todas las carreras
server.get("/carrera", async (_, res) => {
    try {
        const carreras = await mcc.getAll(); // Método retorna todas las carreras
        res.render("pages/Get/carrera", {
            rutaActual: "/carrera",
            carreras: carreras, // Enviamos las carreras a la vista
        });
    } catch (err) {
        console.error("Error al obtener carreras:", err);
        res.status(500).send("Error al obtener carreras.");
    }
});


// Ruta de obtención de todos los registros de entrada y salida
server.get("/registros", async (_, res) => {
    try {
        const registros = await mcr.getAll(); // Método retorna todas las carreras
        res.render("pages/Get/registros", {
            rutaActual: "/registros",
            registros: registros, // Enviamos las carreras a la vista
        });
    } catch (err) {
        console.error("Error al obtener registros:", err);
        res.status(500).send("Error al obtener registros.");
    }
});

//Ruta de archivos publicos
server.use(express.static(path.join(__dirname,"Public")));

////////////////////// Rutas para modificar los registros por id //////////////////////

//Ruta para actualizar alumno
server.get("/actualizarAlumno/:id?", async (req, res) => {
    const id = req.params.id;
    try {
        const carreras = await mcc.getAll();
        const status = await mcs.getAll();
        const facultad = await mcf.getAll();
        const alumno = await mca.get(id);
        const carrera = alumno.nombre_carrera;
        const statu =  alumno.status;
        const facu = alumno.facultad_nombre;
        res.render("pages/Update/actualizarAlumno", {
            rutaActual: "/actualizarAlumno",
            alumno: alumno,
            carreras: carreras,    
            status: status,
            facultad:facultad,
            facu: facu,
            statu: statu,
            carrera: carrera,
        });
    } catch (error) {
        
    }
});
//Ruta para actualizar profesor
server.get("/actualizarProfesor/:id?", async (req, res) => {
    const id = req.params.id;
    try {
        const status = await mcs.getAll();
        const facultad = await mcf.getAll();
        const profesor = await mcp.get(id);
        const statu =  profesor.status;
        const facu = profesor.facultad_nombre;
        res.render("pages/Update/actualizarProfesor", {
            rutaActual: "/actualizarProfesor",
            profesor: profesor,
            status: status,
            facultad:facultad,
            facu: facu,
            statu: statu,   
        });
    } catch (error) {
        
    }
});

//Ruta para actualizar carrera
server.get("/actualizarCarrera/:id?", async (req, res) => {
    const id = req.params.id;
    try {
        const facultad = await mcf.getAll();
        const carrera = await mcc.get(id);
        const facu = carrera.facultad_nombre;
        res.render("pages/Update/actualizarCarrera", {
            rutaActual: "/actualizarCarrera",
            carrera: carrera,
            facultad:facultad, 
            facu: facu,  
        });
    } catch (error) {
        
    }
});

////////////////////// Ruta para borrar un estudiante por id //////////////////////
server.get("/deleteA/:id?",(req,res)=>{
    const id = req.params.id;
        console.log(id)
        mca.delete(id)
        res.redirect("/estudiantes")
})

///////////////////// Ruta para borrar un profesor por id //////////////////////
server.get("/deleteP/:id?",(req,res)=>{
    const id = req.params.id;
        console.log(id)
        mcp.delete(id)
        res.redirect("/profesores")
})

///////////////////// Ruta para borrar una carrera por id //////////////////////
server.get("/deleteC/:id?",(req,res)=>{
    const id = req.params.id;
        console.log(id)
        mcc.delete(id)
        res.redirect("/carrera")
})



////////////////////// Recepcion de datos para actualizar de todos los formularios //////////////////////
server.post("/actualizar", async (req, res) => {
    const { formType } = req.body;

    if (formType === 'actualizarAlumno') { 
        try {
            const { id_alumno, nombres, apellidos, facultad_id, status_id, carrera_id } = req.body;

            mca.update(id_alumno, nombres, apellidos, facultad_id, status_id, carrera_id);
            console.log("Alumno actualizado:", { id_alumno, nombres, apellidos, facultad_id, status_id, carrera_id  });
            // Redirige a la página de estudiantes o muestra un mensaje de éxito
            res.redirect("/estudiantes");
        } catch (err) {
            console.error("Error al actualizar estudiante:", err);
            res.status(500).send("Error al actualizar estudiante.");
        }

    } else if (formType === 'actualizarProfesor') {
        try {
            const { id_profesor, nombres, apellidos, facultad_id, status_id } = req.body;

                mcp.update(id_profesor, nombres, apellidos, facultad_id, status_id)
                console.log("Profesor actualizado:", { id_profesor, nombres, apellidos, facultad_id, status_id });
                
                res.redirect("/profesores");

        } catch (err) {
            console.error("Error al actualizar el profesor:", err);
            res.status(500).send("Error al actualizar el profesor.");
        }
    } else if (formType === 'actualizarCarrera') {
        try {
            const { id_carrera, nombre_carrera, facultad_id} = req.body;
            mcc.update(id_carrera, nombre_carrera, facultad_id)

            console.log("Carrera registrada:", { id_carrera, nombre_carrera, facultad_id });
            res.redirect("/carrera")            
      
        } catch (err) {
            console.error("Error al registrar la carrera:", err);
            res.status(500).send("Error al registrar la carrera.");
        }
    }

});


////////////////////// Recepcion de datos de todos los formularios //////////////////////
server.post('/validar', async (req, res) => {
    const { formType } = req.body;
    // Validar que el formulario contenga los campos necesarios
    if (!formType) {
        return res.status(400).send("El tipo de formulario no está especificado.");
    }

    if (formType === 'RegistroProfesor') {
        // Lógica para procesar el formulario de registro de profesor
        const { id_profesor, nombres, apellidos, facultad_id, status_id } = req.body;
        try {
            // Llamamos a la función 'validar' para comprobar si el id_profesor ya existe
            const existeProfesor = await mcp.validar(id_profesor);
            const status = await mcs.getAll();
            const facultad = await mcf.getAll();
            if (existeProfesor) {
                console.error("Ya existe un registro con ese id_profesor");
                res.render("pages/insert/RegistroProfesor", {
                    rutaActual: "/RegistroProfesor",
                    mensaje: "Ya existe un registro con ese id_profesor",
                    facultad: facultad,
                    status: status,   
                });
            } else {
                // Si el id_profesor no existe, insertamos el nuevo registro
                mcp.insert([id_profesor, nombres, apellidos, facultad_id, status_id])
                
                console.log("Profesor registrado:", { id_profesor, nombres, apellidos, facultad_id, status_id });
                res.redirect("/profesores");
            }
        } catch (err) {
            console.error("Error al registrar el profesor:", err);
            res.status(500).send("Error al registrar el profesor.");
        }
    }
    else if (formType === 'RegistroAlumno') {
        // Lógica para procesar el formulario de registro de alumno
        const { id_alumno, nombres, apellidos, facultad_id, status_id, carrera_id } = req.body;
        try {
            // Llamamos a la función 'validar' para comprobar si el id_alumno ya existe
            const existeAlumno = await mca.validar(id_alumno);
            const carreras = await mcc.getAll();
            const status = await mcs.getAll();
            const facultad = await mcf.getAll();
            if (existeAlumno) {
                console.error("Ya existe un registro con ese id_alumno");
                res.render("pages/insert/RegistroAlumno", {
                    rutaActual: "/RegistroAlumno",
                    mensaje: "Ya existe un registro con ese id_alumno", 
                    facultad:facultad,
                    status:status,
                    carreras: carreras,  
                });
            } else {
                // Si el id_alumno no existe, insertamos el nuevo registro
                mca.insert([id_alumno, nombres, apellidos, facultad_id, status_id, carrera_id])
                console.log("Alumno registrado:", { id_alumno, nombres, apellidos, facultad_id, status_id, carrera_id  });
                res.redirect("/estudiantes");                
            }
        } catch (err) {
            console.error("Error al registrar el alumno:", err);
            res.status(500).send("Error al registrar el alumno.");
        }
    }
    else if (formType === 'RegistroCarrera') {
        // Lógica para procesar el formulario de registro de carrera
        const { id_carrera, nombre_carrera, facultad_id} = req.body;
        try {
            // Llamamos a la función 'validar' para comprobar si el id_carrera ya existe
            const existeCarrera = await mcc.validar(id_carrera);
            const facultad = await mcf.getAll();
            if (existeCarrera) {
                console.error("Ya existe un registro con ese id_carrera");
                res.render("pages/insert/RegistroCarrera", {
                    rutaActual: "/RegistroCarrera",
                    mensaje: "Ya existe un registro con ese id_carrera",
                    facultad: facultad,   
                });
            } else {
                // Si el id_carrera no existe, insertamos el nuevo registro
                mcc.insert([id_carrera, nombre_carrera, facultad_id])
                console.log("Carrera registrada:", { id_carrera, nombre_carrera, facultad_id });
                res.redirect("/carrera")            
            }
        } catch (err) {
            console.error("Error al registrar la carrera:", err);
            res.status(500).send("Error al registrar la carrera.");
        }
    } else if (formType === 'Registro-Entrada-Salida') {
        // Lógica para procesar el formulario de registro
        const {usuario_id} = req.body;
        try {
            const resultado = await mcr.conteoEntradaSalida(usuario_id);
            // console.log("Resultado:", resultado); // true = entrada, false = salida

            const esAlumno = await mca.validar(usuario_id);
            const esProfesor = await mcp.validar(usuario_id);

            if (esAlumno) {
                if (resultado) {
                    await mcr.registrarEntradaSalida({usuario_id});
                    res.render("index", {
                        rutaActual: "/",
                        mensaje:"Registro de entrada para alumno.",
                    });
                } else {
                    await mcr.registrarEntradaSalida({usuario_id});
                    res.render("index", {
                        rutaActual: "/",
                        mensaje:"Registro de salida para alumno.",
                    });
                }
            } else if (esProfesor) {
                if (resultado) {
                await mcr.registrarEntradaSalida( {usuario_id} );
                res.render("index", {
                    rutaActual: "/",
                    mensaje:"Registro de entrada para profesor.",
                });
                } else {
                    await mcr.registrarEntradaSalida({usuario_id});
                    res.render("index", {
                        rutaActual: "/",
                        mensaje:"Registro de salida para profesor.",
                    });
                }               
            } else {
                res.render("index", {
                    rutaActual: "/",
                    mensaje: "usuario no valido.",
                });
            }
        } catch (error) {
            console.error("Error en el registro:", error);
            return res.status(500).send("Error en el registro.");
        }
    }
    // else if (formType === 'RegistroFacultad') {
    //     const { nombre} = req.body;
        
    //    // Lógica para procesar el formulario de registro de facultad
    //     console.log("Facultad registrada:", { nombre });
    //     res.send("Facultad registrada correctamente.");
    // }
    else {
        res.status(400).send("Formulario no reconocido.");
    }
});



server.listen(port,()=>{

    console.log(`Server corriendo la direccion es: http://localhost:${port}`);

    console.log("\npresione Crtl + C para cerrar el server")
})

//+----------------------------------------------------------------------------+ 

