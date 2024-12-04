
# Proyecto-Check

Este proyecto en Node.js tiene como objetivo desarrollar un sistema de control de entradas y salidas para gestionar la asistencia de usuarios en una institución educativa. La aplicación valida a los usuarios, diferenciando entre profesores y alumnos, y verifica su existencia en la base de datos del sistema.
Funcionalidades Principales:

  1.  Autenticación de Usuarios: Los usuarios deben iniciar sesión con credenciales válidas. El sistema identifica si el usuario es un profesor o un alumno.

  2.  Registro de Entradas y Salidas: Una vez autenticados, los usuarios pueden registrar su entrada y salida. Esto se almacena en la base de datos para llevar un control de la asistencia.

  3.  Validación de Datos: El sistema verifica que los usuarios existan en la base de datos antes de permitir el acceso, garantizando que solo los usuarios autorizados puedan registrar su asistencia.

  4.  Interfaz Amigable: La aplicación cuenta con una interfaz intuitiva que facilita la navegación y la interacción del usuario, mejorando la experiencia general. 


## Authors

- [@Edquinta03](https://www.github.com/Edquinta03)
- Gustavo Ham Gomez

## FAQ

#### ¿Cómo se asegura el sistema de que solo los usuarios autorizados puedan registrar su entrada y salida?

El sistema implementa un proceso de autenticación que requiere que los usuarios inicien sesión con sus credenciales (id del usuario). Antes de permitir el registro de entrada o salida, se valida la existencia del usuario en la base de datos y se determina su rol (profesor o alumno). Y asi garantizar que solo los usuarios autorizados puedan acceder a la funcionalidad de registro.

#### ¿Qué tecnología se utiliza para el almacenamiento de datos en el proyecto?

En el proyecto, se utiliza una base de datos como SQLite para almacenar la información de los usuarios y sus registros de asistencia. Node.js se conecta a esta base de datos mediante un ORM (Object-Relational Mapping) o un cliente de base de datos, lo que permite realizar operaciones de creación, lectura, actualización y eliminación (CRUD) de manera eficiente. Esto asegura que la información esté organizada y sea fácilmente accesible cuando se necesite.


## Installation

Install proyecto-check with npm

```bash
  npm install 
  cd proyecto-check
```
    
## Run Locally

Go to the project directory

```bash
  cd proyecto-check
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node app.js
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`port=3000;`

## Tech Stack

**Client:** Ejs, Html5, Css, Boostrap 5, JavaScript.

**Server:** Node, Express, SQLite.

## Lessons Learned

What did you learn while building this project? What challenges did you face and how did you overcome them?

Desde lo personal, trabajar en un proyecto como el control de entradas y salidas ofrece varias lecciones valiosas:
1. Importancia de la Planificación:

    Aprender a definir claramente los objetivos y funcionalidades del proyecto ayuda a mantener el enfoque y la organización a lo largo del desarrollo.

2. Gestión del Tiempo:

    Desarrollar un proyecto completo enseña a establecer plazos y gestionar el tiempo de manera efectiva, equilibrando las tareas de programación, pruebas y documentación.

3. Resolución de Problemas:

    Enfrentar desafíos técnicos durante el desarrollo fomenta el pensamiento crítico y la capacidad de resolver problemas, habilidades esenciales en cualquier campo.

4. Colaboración y Comunicación:

    Si se trabaja en equipo, se aprende a comunicar ideas y colaborar con otros, lo cual es fundamental en entornos profesionales.

5. Adaptabilidad:

    Aprender a ajustar el proyecto en respuesta a retroalimentación o problemas inesperados mejora la capacidad de adaptación y flexibilidad ante cambios.

6. Conocimiento Técnico:

    Profundizar en tecnologías como Node.js y bases de datos refuerza habilidades técnicas y proporciona una base sólida para futuros proyectos.

7. Responsabilidad Social:

    Al desarrollar un sistema que impacta a una comunidad (como una institución educativa), se toma conciencia de la responsabilidad que conlleva crear soluciones útiles y éticas.

## Used By

This project is used by the following companies:

- Universidad Autónoma del Carmen.

